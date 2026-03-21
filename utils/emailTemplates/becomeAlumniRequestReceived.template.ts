export const becomeAlumniRequestReceivedTemplate = (
  userName: string,
  email: string,
  branch: string = "N/A",
  batch: number = 0,
  regNo: string = "N/A",
  mobile : string = "N/A",
  dashboardLink: string
) =>`
<tr>
  <td style="background:linear-gradient(135deg,#2563eb,#3b82f6); padding:24px; text-align:center; color:#ffffff;">
    <h1 style="margin:0; font-size:24px;">Alumni GECWC Portal</h1>
    <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">Alumni Conversion Request</p>
  </td>
</tr>

<tr>
  <td style="padding:32px;">
    <h2 style="margin-top:0; color:#111827;">New Conversion Request</h2>

    <p style="color:#4b5563; font-size:15px; line-height:1.6;">
      A student has requested to convert their account into an alumni profile.
      Please review the details below and take appropriate action.
    </p>

    <table cellpadding="0" cellspacing="0" width="100%" style="margin:24px 0; border-collapse:collapse;">
      
      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold;">Full Name</td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${userName}</td>
      </tr>

      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold;">Email</td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${email}</td>
      </tr>

      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold;">Mobile</td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${mobile}</td>
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

      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold;">Request Type</td>
        <td style="padding:10px; border:1px solid #e5e7eb;">Student → Alumni Conversion</td>
      </tr>

      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold;">Status</td>
        <td style="padding:10px; border:1px solid #e5e7eb; color:#d97706; font-weight:bold;">Pending</td>
      </tr>

    </table>

    <table cellpadding="0" cellspacing="0" width="100%" style="margin:30px 0;">
      <tr>
        <td align="center">
          <a href="${dashboardLink}"
            style="background-color:#2563eb; color:#ffffff; padding:14px 28px; text-decoration:none; font-size:16px; border-radius:6px; display:inline-block; font-weight:bold;">
            Review Request
          </a>
        </td>
      </tr>
    </table>

    <p style="font-size:13px; color:#9ca3af; margin-top:24px;">
      If the button above doesn't work, open the link below:<br/>
      <a href="${dashboardLink}" style="color:#2563eb; word-break:break-all;">
        ${dashboardLink}
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
      Admin Notification • Alumni Conversion Request
    </p>
  </td>
</tr>
`;