export const roleDowngradedToStudentTemplate = (
  userName: string,
  loginLink: string
) => `
<tr>
  <td style="background:linear-gradient(135deg,#dc2626,#ef4444); padding:24px; text-align:center; color:#ffffff;">
    <h1 style="margin:0; font-size:24px;">Alumni GECWC Portal</h1>
    <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">Role Updated</p>
  </td>
</tr>

<tr>
  <td style="padding:32px;">
    <h2 style="margin-top:0; color:#111827;">Account Role Changed</h2>

    <p style="color:#4b5563; font-size:15px; line-height:1.6;">
      Hello ${userName},
      <br/><br/>
      This is to inform you that your account role on the Alumni GECWC Portal has been changed from
      <strong>Alumni</strong> to <strong>Student</strong>.
    </p>

    <p style="color:#4b5563; font-size:15px; line-height:1.6;">
      As a result of this update, access to certain alumni-specific features may no longer be available. Your account will now have access to the features and resources available to student members.
    </p>

    <table cellpadding="0" cellspacing="0" width="100%" style="margin:30px 0;">
      <tr>
        <td align="center">
          <a href="${loginLink}/login"
             style="background-color:#dc2626; color:#ffffff; padding:14px 28px; text-decoration:none; font-size:16px; border-radius:6px; display:inline-block; font-weight:bold;">
            Login to Your Account
          </a>
        </td>
      </tr>
    </table>

    <p style="color:#4b5563; font-size:15px; line-height:1.6;">
      If you believe this change was made in error or have any questions regarding your account status, please contact the portal administration team.
    </p>

    <p style="font-size:13px; color:#9ca3af; margin-top:24px;">
      If the button above doesn't work, use the link below:<br/>
      <a href="${loginLink}/login" style="color:#dc2626; word-break:break-all;">
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
         style="color:#dc2626; text-decoration:none;">
         ${process.env.SITE_MAIL_RECIEVER}
      </a>
    </p>
  </td>
</tr>
`;
