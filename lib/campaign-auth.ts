import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserModel from "@/models/user.model";
import { connectDB } from "@/lib/mongodb";

import { CampaignError } from "./campaign-errors";
export { CampaignError } from "./campaign-errors";
export async function requireCampaignAdmin(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new CampaignError("Please sign in", 401);
  await connectDB();
  const user = await UserModel.findById(session.user.id).select("email role isActive fullname").lean<{ email: string; role: string; isActive: string; fullname: string }>();
  if (user?.role !== "admin" || user.isActive !== "approved") throw new CampaignError("Administrator access required", 403);
  if (request.method !== "GET") {
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) throw new CampaignError("Invalid request origin", 403);
  }
  return { ...user, id: session.user.id };
}
