export const roleUpgradedToAlumniTemplate = (
  userName: string,
  loginLink: string
) => `
<tr>
  <td style="background:linear-gradient(135deg,#2563eb,#3b82f6); padding:24px; text-align:center; color:#ffffff;">
    <h1 style="margin:0; font-size:24px;">Alumni GECWC Portal</h1>
    <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">Role Upgraded Successfully</p>
  </td>
</tr>

<tr>
  <td style="padding:32px;">
    <h2 style="margin-top:0; color:#111827;">Congratulations! 🎓</h2>

    <p style="color:#4b5563; font-size:15px; line-height:1.6;">
      Hello ${userName},
      <br/><br/>
      We are pleased to inform you that your account role has been successfully upgraded from
      <strong>Student</strong> to <strong>Alumni</strong> on the Alumni GECWC Portal.
    </p>

    <p style="color:#4b5563; font-size:15px; line-height:1.6;">
      As an Alumni member, you can now:
    </p>

    <ul style="color:#4b5563; font-size:15px; line-height:1.8; padding-left:20px;">
      <li>Connect with fellow alumni and students</li>
      <li>Share career opportunities and experiences</li>
      <li>Participate in alumni events and activities</li>
      <li>Stay updated with college news and announcements</li>
      <li>Contribute to the growing alumni network</li>
    </ul>

    <table cellpadding="0" cellspacing="0" width="100%" style="margin:30px 0;">
      <tr>
        <td align="center">
          <a href="${loginLink}/login"
             style="background-color:#2563eb; color:#ffffff; padding:14px 28px; text-decoration:none; font-size:16px; border-radius:6px; display:inline-block; font-weight:bold;">
            Access Alumni Portal
          </a>
        </td>
      </tr>
    </table>

    <p style="color:#4b5563; font-size:15px; line-height:1.6;">
      Thank you for being a valued part of the GECWC community. We look forward to your continued engagement and contributions as an alumnus/alumna.
    </p>

    <p style="font-size:13px; color:#9ca3af; margin-top:24px;">
      If the button above doesn't work, use the link below:<br/>
      <a href="${loginLink}/login" style="color:#2563eb; word-break:break-all;">
        ${loginLink}/login
      </a>
    </p>
  </td>
</tr>

<tr>
  <td style="background-color:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
    <p style="margin:0;">
      © ${new Date().getFullYear()} Alumni GECWC Portal. All rights reserved.
    </p>
    <p style="margin:6px 0 0;">
      Questions? Reach out at
      <a href="mailto:${process.env.SITE_MAIL_RECIEVER}"
         style="color:#2563eb; text-decoration:none;">
         ${process.env.SITE_MAIL_RECIEVER}
      </a>
    </p>
  </td>
</tr>
`;