// app/api/send-notification/route.ts
import { sendPushNotification } from "@/utils/sendNotification";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    const result = await sendPushNotification({
      token,
      title: "Alumni GECWC",
      body: "You got a new message",
      data: {
        url: "/alumni/announcements",
      },
    });

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json({ success: true, id: result.messageId });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}