import { NextRequest, NextResponse } from "next/server";
import { Receiver } from "@upstash/qstash";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import CampaignModel from "@/models/campaign.model";
import UserModel from "@/models/user.model";
import { connectDB } from "@/lib/mongodb";
import { idSchema } from "@/lib/campaign-content";
import { sendCampaignMail } from "@/lib/campaign-mail";
import { CAMPAIGN_BATCH_SIZE, campaignWorkerUrl } from "@/lib/campaign-queue";

export const runtime = "nodejs";
export const maxDuration = 300;
export async function POST(req: NextRequest) {
  const signature = req.headers.get("upstash-signature");
  if (!signature) return NextResponse.json({ message: "Missing signature" }, { status: 401 });
  const body = await req.text();
  if (Buffer.byteLength(body) > 4096) return NextResponse.json({ message: "Payload too large" }, { status: 413 });
  try {
    const receiver = new Receiver({ currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY, nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY });
    const valid = await receiver.verify({ signature, body, url: campaignWorkerUrl() });
    if (!valid) throw new Error("Invalid signature");
  } catch {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }
  try {
    const { campaignId, offset } = z.object({ campaignId: idSchema, offset: z.number().int().min(0).max(4999).refine(n => n % CAMPAIGN_BATCH_SIZE === 0) }).parse(JSON.parse(body));
    await connectDB();
    const campaign = await CampaignModel.findById(campaignId).lean();
    if (!campaign || campaign.status === "draft") return NextResponse.json({ message: "Campaign unavailable" }, { status: 404 });
    let retry = false;
    for (const recipient of campaign.recipients.slice(offset, offset + CAMPAIGN_BATCH_SIZE)) {
      if (recipient.status === "sent" || recipient.status === "skipped") continue;
      const token = randomUUID();
      const claimed = await CampaignModel.updateOne({ _id: campaignId, recipients: { $elemMatch: {
        email: recipient.email,
        $or: [{ status: { $in: ["pending", "failed"] } }, { status: "processing", leaseUntil: { $lt: new Date() } }],
      } } }, { $set: { "recipients.$.status": "processing", "recipients.$.leaseToken": token, "recipients.$.leaseUntil": new Date(Date.now() + 360_000) }, $inc: { "recipients.$.attempts": 1 } });
      if (!claimed.modifiedCount) {
        const alreadySent = await CampaignModel.exists({ _id: campaignId, recipients: { $elemMatch: { email: recipient.email, status: { $in: ["sent", "skipped"] } } } });
        if (!alreadySent) retry = true;
        continue;
      }
      try {
        // Recheck approval at delivery time; the original audience remains frozen.
        const eligible = await UserModel.exists({ email: { $regex: `^${recipient.email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" }, isActive: "approved", role: { $in: ["alumni", "student"] } });
        if (!eligible) {
          await CampaignModel.updateOne({ _id: campaignId, recipients: { $elemMatch: { email: recipient.email, leaseToken: token } } }, {
            $set: { "recipients.$.status": "skipped", "recipients.$.error": "Recipient is no longer approved" },
            $unset: { "recipients.$.leaseToken": "", "recipients.$.leaseUntil": "" },
          });
          continue;
        }
        await sendCampaignMail(recipient.email, campaign.subject, campaign.html, recipient.fullname);
        await CampaignModel.updateOne({ _id: campaignId, recipients: { $elemMatch: { email: recipient.email, leaseToken: token } } }, {
          $set: { "recipients.$.status": "sent", "recipients.$.sentAt": new Date() },
          $unset: { "recipients.$.leaseToken": "", "recipients.$.leaseUntil": "", "recipients.$.error": "" },
        });
      } catch (error) {
        console.error("Campaign delivery failed", campaignId, error instanceof Error ? error.message : "Unknown failure");
        await CampaignModel.updateOne({ _id: campaignId, recipients: { $elemMatch: { email: recipient.email, leaseToken: token } } }, {
          $set: { "recipients.$.status": "failed", "recipients.$.error": "Delivery failed. Check SMTP configuration and recipient approval." },
          $unset: { "recipients.$.leaseToken": "", "recipients.$.leaseUntil": "" },
        });
        retry = true;
      }
    }
    return NextResponse.json({ success: !retry }, { status: retry ? 503 : 200 });
  } catch (error) {
    console.error("Campaign worker failed", error);
    return NextResponse.json({ message: "Unable to process campaign batch" }, { status: 500 });
  }
}
