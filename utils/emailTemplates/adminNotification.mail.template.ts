export const adminNewSignupNotification = (
  userName: string,
  userEmail: string,
  userMobile: string,
  regNo: string,
  batch: number,
  branch: string,
  adminDashboardLink: string
) => `
<tr>
  <td style="background:linear-gradient(135deg,#2563eb,#3b82f6); padding:24px; text-align:center; color:#ffffff;">
    <h1 style="margin:0; font-size:24px;">Alumni GECWC Portal</h1>
    <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">New Alumni Registration</p>
  </td>
</tr>

<tr>
  <td style="padding:32px;">
    <h2 style="margin-top:0; color:#111827;">New Registration Request</h2>

    <p style="color:#4b5563; font-size:15px; line-height:1.6;">
      A new alumni has registered on the portal and is waiting for approval.
      Please review the details below and approve or reject the request.
    </p>

    <table cellpadding="0" cellspacing="0" width="100%" style="margin:24px 0; border-collapse:collapse;">
      
      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold;">Full Name</td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${userName}</td>
      </tr>

      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold;">Email</td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${userEmail}</td>
      </tr>

      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold;">Mobile</td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${userMobile}</td>
      </tr>

      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold;">Registration No</td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${regNo}</td>
      </tr>

      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold;">Batch</td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${batch}</td>
      </tr>

      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold;">Branch</td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${branch}</td>
      </tr>

    </table>

    <table cellpadding="0" cellspacing="0" width="100%" style="margin:30px 0;">
      <tr>
        <td align="center">
          <a href="${adminDashboardLink}"
            style="background-color:#2563eb; color:#ffffff; padding:14px 28px; text-decoration:none; font-size:16px; border-radius:6px; display:inline-block; font-weight:bold;">
            Review Registration
          </a>
        </td>
      </tr>
    </table>

    <p style="font-size:13px; color:#9ca3af; margin-top:24px;">
      If the button above doesn't work, open the link below:<br/>
      <a href="${adminDashboardLink}" style="color:#2563eb; word-break:break-all;">
        ${adminDashboardLink}
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
      Admin Notification • New User Signup
    </p>
  </td>
</tr>
`
