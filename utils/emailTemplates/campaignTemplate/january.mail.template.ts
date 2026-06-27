export const januaryNewsletterTemplate = (
  userName: string,
  portalLink: string
) => `
<tr>
  <td style="background:linear-gradient(135deg,#2563eb,#1d4ed8);padding:24px;text-align:center;color:#fff;">
    <h1 style="margin:0;font-size:24px;">Alumni GECWC Portal</h1>
    <p style="margin-top:8px;font-size:14px;opacity:.9;">
      📬 GECWC Letter #01 • New Beginnings
    </p>
  </td>
</tr>

<tr>
<td style="padding:32px;">

<h2 style="margin-top:0;color:#111827;">
Happy New Year, ${userName}! 🎉
</h2>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">
A new year begins...
<br/><br/>

<strong>New Dreams.</strong><br/>
<strong>New Opportunities.</strong><br/>
<strong>New Connections.</strong>
</p>

<div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:8px;padding:18px;margin:24px 0;">

<h3 style="margin:0 0 12px;color:#2563eb;">
💙 Our Dream
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">
Today our community has grown to
<strong>160+ Alumni.</strong>

<br/><br/>

Our goal isn't 200.

Our goal isn't 500.

<strong>Our goal is Every GECWC Alumnus.</strong>
</p>

</div>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">

Know someone from your batch?

Invite them today.

Every new member makes our family stronger.

</p>

<table width="100%" style="margin:30px 0;">
<tr>
<td align="center">

<a href="${portalLink}"
style="background:#2563eb;color:#fff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;display:inline-block;">

Reconnect Our Family ❤️

</a>

</td>
</tr>
</table>

<div style="background:#f8fafc;border-radius:8px;padding:18px;">

<h3 style="margin-top:0;color:#111827;">
📖 Memory of the Month
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">
Who was your very first friend at GECWC?

Send them this email today.

❤️

</p>

</div>

</td>
</tr>

<tr>

<td style="background:#f9fafb;padding:20px;text-align:center;">

<h2 style="margin:0;color:#111827;">
One College.
</h2>

<h2 style="margin:6px 0;color:#2563eb;">
One Family. ❤️
</h2>

<p style="font-size:13px;color:#9ca3af;">
© ${new Date().getFullYear()} Alumni GECWC Portal
</p>

</td>

</tr>
`;