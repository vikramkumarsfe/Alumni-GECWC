import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/utils/send-mail";
import { registrationReceivedTemplate } from "@/utils/emailTemplates/registrationReceived.template";
import AdminEmailCampaign from "@/components/admin/AdminEmailCampaign";
import { NewsletterMonth, newsletterTemplates } from "@/utils/newsLetterTemplate";

interface IUser {
  email: string;
  fullname: string;
}

export async function POST(req: NextRequest) {
  try {
    const { users, month } = await req.json();

    console.log(`🚀 Queue Worker Started - ${users.length} users`);

    const results = [];

    const campaign = newsletterTemplates[month as NewsletterMonth];

    for (const user of users as IUser[]) {
      try {
        const data = await sendMail({
          email: `"Alumni Portal" <${process.env.SMTP_SERVER_USERNAME}>`,
          sendTo: user.email,
          subject : campaign.subject,
          text: "",
          html: campaign.template(
            user.fullname,
            process.env.SERVER!
          ),
        });

        console.log(`✅ Email sent to ${user.email}`);

        results.push({
          email: user.email,
          status: "sent",
          messageId: data?.messageId,
        });
      } catch (error) {
        console.error(`❌ Failed to send email to ${user.email}`, error);

        results.push({
          email: user.email,
          status: "failed",
          error,
        });
      }
    }

    return NextResponse.json({
      success: true,
      total: users.length,
      sent: results.filter((r) => r.status === "sent").length,
      failed: results.filter((r) => r.status === "failed").length,
      results,
    });
  } catch (err) {
    console.error("Queue Worker Error:", err);

    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Unknown Error",
      },
      {
        status: 500,
      }
    );
  }
}