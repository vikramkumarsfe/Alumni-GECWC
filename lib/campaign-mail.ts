import nodemailer from "nodemailer";
import { plainText, personalize } from "./campaign-content";

export function checkMailConfiguration() {
  if (!process.env.SMTP_SERVER_USERNAME || !process.env.SMTP_SERVER_PASSWORD) {
    throw new Error("Email sending is not configured. Set SMTP_SERVER_USERNAME and SMTP_SERVER_PASSWORD.");
  }
}
export async function sendCampaignMail(to: string, subject: string, template: string, fullname: string) {
  checkMailConfiguration();
  const port = Number(process.env.SMTP_SERVER_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER_HOST || "smtp.gmail.com", port, secure: port === 465,
    auth: { user: process.env.SMTP_SERVER_USERNAME, pass: process.env.SMTP_SERVER_PASSWORD },
    connectionTimeout: 15000, greetingTimeout: 15000, socketTimeout: 20000,
  });
  const html = personalize(template, fullname);
  return transporter.sendMail({
    from: { name: "GECWC Alumni Portal", address: process.env.SMTP_SERVER_USERNAME! },
    to, subject, html, text: plainText(html),
  });
}
