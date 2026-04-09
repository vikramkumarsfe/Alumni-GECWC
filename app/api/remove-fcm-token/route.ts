import { NextResponse as res } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import UserModel from "@/models/user.model";
import { connectDB } from "@/lib/mongodb";
import ServerCatchError from "@/utils/serverCatchError";

export async function POST() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return res.json({ error: "Unauthorized" }, { status: 401 });
    }

    await UserModel.findByIdAndUpdate(session.user.id, {
      FCM: null,
    });

    return res.json({ success: true })
  } 
  catch (err) 
  {
    return ServerCatchError(err)
  }
}