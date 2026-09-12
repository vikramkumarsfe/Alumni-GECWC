import CampaignModel, { type Campaign } from "@/models/campaign.model";
import { qstash } from "@/utils/qstash";
import { CampaignError } from "./campaign-errors";
import { checkMailConfiguration } from "./campaign-mail";

export const CAMPAIGN_BATCH_SIZE = 10;
export function campaignWorkerUrl() {
  const url = new URL("/api/queue/send-email", process.env.SERVER);
  if (url.protocol !== "https:") throw new Error("SERVER must be the public HTTPS address of this application.");
  return url.toString();
}
export function checkCampaignConfiguration() {
  checkMailConfiguration();
  if (!process.env.QSTASH_TOKEN || !process.env.QSTASH_CURRENT_SIGNING_KEY || !process.env.QSTASH_NEXT_SIGNING_KEY) {
    throw new CampaignError("Configure QSTASH_TOKEN, QSTASH_CURRENT_SIGNING_KEY and QSTASH_NEXT_SIGNING_KEY before sending.", 503);
  }
  try { campaignWorkerUrl(); } catch { throw new CampaignError("Configure SERVER with your public HTTPS application URL.", 503); }
}
export async function queueCampaign(campaign: Campaign) {
  let failed = false;
  const jobs = [];
  for (let offset = 0; offset < campaign.recipients.length; offset += CAMPAIGN_BATCH_SIZE) {
    if (campaign.recipients.slice(offset, offset + CAMPAIGN_BATCH_SIZE).every(r => r.status === "sent" || r.status === "skipped")) continue;
    jobs.push(offset);
  }
  // Bound publication concurrency so a large audience does not overwhelm QStash.
  for (let i = 0; i < jobs.length; i += 10) {
    const results = await Promise.allSettled(jobs.slice(i, i + 10).map(offset => qstash.publishJSON({
      url: campaignWorkerUrl(), body: { campaignId: String(campaign._id), offset }, retries: 5,
      deduplicationId: `${campaign._id}-${campaign.revision}-${offset}`,
      flowControl: { key: "admin-email-campaigns", parallelism: 1, rate: 1, period: "1s" },
    })));
    if (results.some(result => result.status === "rejected")) failed = true;
  }
  await CampaignModel.updateOne({ _id: campaign._id, revision: campaign.revision }, {
    $set: { status: failed ? "queue_failed" : "queued", queueLockedUntil: new Date(0) },
  });
  return { queueFailed: failed, totalRecipients: campaign.recipients.length };
}
