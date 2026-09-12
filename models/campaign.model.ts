import { Schema, model, models, type Model, type Types } from "mongoose";

export interface CampaignRecipient {
  email: string;
  fullname: string;
  status: "pending" | "processing" | "sent" | "failed" | "skipped";
  attempts: number;
  leaseUntil?: Date;
  leaseToken?: string;
  sentAt?: Date;
  error?: string;
}
export interface Campaign {
  _id: Types.ObjectId;
  name: string;
  subject: string;
  html: string;
  audience: { role: "all" | "alumni" | "student"; batches: number[]; branches: string[] };
  status: "draft" | "queued" | "queue_failed";
  recipients: CampaignRecipient[];
  createdBy: string;
  revision: number;
  queueLockedUntil?: Date;
  queuedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
const recipientSchema = new Schema<CampaignRecipient>({
  email: { type: String, required: true }, fullname: String,
  status: { type: String, enum: ["pending", "processing", "sent", "failed", "skipped"], default: "pending" },
  attempts: { type: Number, default: 0 }, leaseUntil: Date, leaseToken: String,
  sentAt: Date, error: String,
}, { _id: false });
const schema = new Schema<Campaign>({
  name: { type: String, required: true }, subject: { type: String, required: true },
  html: { type: String, required: true },
  audience: {
    role: { type: String, enum: ["all", "alumni", "student"], default: "all" },
    batches: [Number], branches: [String],
  },
  status: { type: String, enum: ["draft", "queued", "queue_failed"], default: "draft" },
  recipients: { type: [recipientSchema], default: [] },
  createdBy: { type: String, required: true }, revision: { type: Number, default: 0 },
  queueLockedUntil: Date, queuedAt: Date,
}, { timestamps: true });
schema.index({ createdAt: -1 });
export default (models.Campaign as Model<Campaign> | undefined) || model<Campaign>("Campaign", schema);
