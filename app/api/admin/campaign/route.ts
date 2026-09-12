import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import CampaignModel from "@/models/campaign.model";
import UserModel from "@/models/user.model";
import { requireCampaignAdmin, CampaignError } from "@/lib/campaign-auth";
import { audienceSchema, audienceFilter, contentSchema, cleanEmailHtml, idSchema, personalize, plainText } from "@/lib/campaign-content";
import { checkCampaignConfiguration, queueCampaign } from "@/lib/campaign-queue";
import { sendCampaignMail } from "@/lib/campaign-mail";

export const runtime = "nodejs";
export const maxDuration = 300;
const requestSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("preview"), html: contentSchema.shape.html }),
  z.object({ action: z.literal("audience"), audience: audienceSchema }),
  z.object({ action: z.literal("save"), id: idSchema.optional(), revision: z.number().int().nonnegative().optional(), content: contentSchema }),
  z.object({ action: z.literal("test"), content: contentSchema }),
  z.object({ action: z.literal("send"), id: idSchema, revision: z.number().int().nonnegative() }),
  z.object({ action: z.literal("retry"), id: idSchema }),
]);
function fail(error: unknown) {
  if (error instanceof z.ZodError) return NextResponse.json({ message: error.issues[0]?.message || "Invalid request" }, { status: 400 });
  if (error instanceof CampaignError) return NextResponse.json({ message: error.message }, { status: error.status });
  if (error instanceof SyntaxError) return NextResponse.json({ message: "Invalid JSON request" }, { status: 400 });
  console.error("Campaign request failed", error);
  return NextResponse.json({ message: "Campaign request failed. Please try again or check the server configuration." }, { status: 500 });
}
function recipientPipeline(audience: z.infer<typeof audienceSchema>) {
  return [
    { $match: audienceFilter(audience) },
    { $project: { email: { $toLower: { $trim: { input: { $ifNull: ["$email", ""] } } } }, fullname: 1 } },
    { $match: { email: { $regex: z.regexes.email } } },
    { $group: { _id: "$email", fullname: { $first: "$fullname" } } },
    { $sort: { _id: 1 as const } },
  ];
}
function checkedHtml(input: string) {
  const html = cleanEmailHtml(input);
  if (Buffer.byteLength(html) > 200_000) throw new CampaignError("The formatted template exceeds 200 KB. Please simplify its styles.");
  if (!plainText(html).trim() && !/<img\b/i.test(html)) throw new CampaignError("Add some email content before continuing.");
  return html;
}
export async function GET(req: NextRequest) {
  try {
    await requireCampaignAdmin(req);
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const campaign = await CampaignModel.findById(idSchema.parse(id)).select("-recipients -queueLockedUntil").lean();
      if (!campaign) throw new CampaignError("Campaign not found", 404);
      return NextResponse.json({ campaign });
    }
    const [campaigns, batches, branches] = await Promise.all([
      CampaignModel.aggregate([
        { $sort: { createdAt: -1 } }, { $limit: 50 },
        { $project: {
          name: 1, subject: 1, audience: 1, status: 1, revision: 1, createdAt: 1, queuedAt: 1,
          total: { $size: "$recipients" },
          sent: { $size: { $filter: { input: "$recipients", as: "r", cond: { $eq: ["$$r.status", "sent"] } } } },
          skipped: { $size: { $filter: { input: "$recipients", as: "r", cond: { $eq: ["$$r.status", "skipped"] } } } },
          failed: { $size: { $filter: { input: "$recipients", as: "r", cond: { $eq: ["$$r.status", "failed"] } } } },
        } },
      ]),
      UserModel.distinct("batch", { isActive: "approved", role: { $in: ["alumni", "student"] } }),
      UserModel.distinct("branch", { isActive: "approved", role: { $in: ["alumni", "student"] } }),
    ]);
    return NextResponse.json({ campaigns, batches: batches.filter(Number.isFinite).sort((a: number, b: number) => b - a), branches: branches.filter(Boolean).sort() });
  } catch (error) { return fail(error); }
}
export async function POST(req: NextRequest) {
  try {
    const admin = await requireCampaignAdmin(req);
    const raw = await req.text();
    if (Buffer.byteLength(raw) > 250_000) throw new CampaignError("Request is too large", 413);
    const input = requestSchema.parse(JSON.parse(raw));
    if (input.action === "preview") {
      const html = checkedHtml(input.html);
      return NextResponse.json({ html, preview: personalize(html, "Alex Kumar") });
    }
    if (input.action === "audience") {
      const [result] = await UserModel.aggregate([...recipientPipeline(input.audience), { $count: "total" }]);
      return NextResponse.json({ total: result?.total || 0 });
    }
    if (input.action === "test") {
      if (!z.email().safeParse(admin.email).success) throw new CampaignError("Your admin account needs a valid email address.");
      await sendCampaignMail(admin.email, `[Test] ${input.content.subject}`, checkedHtml(input.content.html), admin.fullname);
      return NextResponse.json({ message: `Test email sent to ${admin.email}` });
    }
    if (input.action === "save") {
      const content = { ...input.content, html: checkedHtml(input.content.html) };
      if (input.id && input.revision === undefined) throw new CampaignError("Draft revision is required", 409);
      const campaign = input.id
        ? await CampaignModel.findOneAndUpdate({ _id: input.id, status: "draft", revision: input.revision }, { $set: content, $inc: { revision: 1 } }, { new: true })
        : await CampaignModel.create({ ...content, createdBy: admin.id });
      if (!campaign) throw new CampaignError("This draft changed or was already sent. Reload it before editing.", 409);
      return NextResponse.json({ id: String(campaign._id), revision: campaign.revision, html: campaign.html });
    }
    checkCampaignConfiguration();
    if (input.action === "send") {
      const draft = await CampaignModel.findOne({ _id: input.id, status: "draft", revision: input.revision }).lean();
      if (!draft) throw new CampaignError("This draft changed or was already sent. Reload it before sending.", 409);
      const recipients = await UserModel.aggregate<{ _id: string; fullname: string }>([...recipientPipeline(draft.audience), { $limit: 5001 }]);
      if (!recipients.length) throw new CampaignError("No approved members match this audience.");
      if (recipients.length > 5000) throw new CampaignError("Select a smaller audience. A campaign can include up to 5,000 recipients.");
      const campaign = await CampaignModel.findOneAndUpdate({ _id: input.id, status: "draft", revision: input.revision }, {
        $set: { status: "queued", queuedAt: new Date(), queueLockedUntil: new Date(Date.now() + 360_000),
          recipients: recipients.map(r => ({ email: r._id, fullname: r.fullname, status: "pending", attempts: 0 })) },
        $inc: { revision: 1 },
      }, { new: true }).lean();
      if (!campaign) throw new CampaignError("This campaign was already queued or changed.", 409);
      const result = await queueCampaign(campaign);
      return NextResponse.json(result, { status: 202 });
    }
    const campaign = await CampaignModel.findOneAndUpdate({
      _id: input.id, status: { $ne: "draft" },
      $or: [{ queueLockedUntil: { $lt: new Date() } }, { queueLockedUntil: { $exists: false } }],
    }, { $set: { queueLockedUntil: new Date(Date.now() + 360_000) }, $inc: { revision: 1 } }, { new: true }).lean();
    if (!campaign) throw new CampaignError("Campaign not found or queueing is still in progress. Try again shortly.", 409);
    return NextResponse.json(await queueCampaign(campaign), { status: 202 });
  } catch (error) { return fail(error); }
}
