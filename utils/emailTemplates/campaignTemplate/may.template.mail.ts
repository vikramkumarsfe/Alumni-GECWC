export const mayNewsletterTemplate = (
  userName: string,
  portalLink: string
) => `
<tr>
  <td style="background:linear-gradient(135deg,#7c3aed,#6d28d9);padding:24px;text-align:center;color:#fff;">
    <h1 style="margin:0;font-size:24px;">Alumni GECWC Portal</h1>
    <p style="margin-top:8px;font-size:14px;opacity:.9;">
      📬 GECWC Letter #05 • Memories
    </p>
  </td>
</tr>

<tr>
<td style="padding:32px;">

<h2 style="margin-top:0;color:#111827;">
Hello ${userName}! 🎓
</h2>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">
Life moves fast...
<br/><br/>
But some memories never fade.
</p>

<div style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:8px;padding:18px;margin:24px 0;">

<h3 style="margin:0 0 12px;color:#6d28d9;">
💜 Do You Remember?
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">
The classroom laughter.
<br/>
The canteen gossip.
<br/>
The last bench jokes.
<br/>
The assignment deadlines.
<br/>
The exams we thought we'd never pass.
<br/><br/>
Those moments became memories...
that we'll carry forever.
</p>

</div>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">

Maybe it's been years since you spoke to your classmates.

Maybe today is the perfect day to reconnect.

</p>

<table width="100%" style="margin:30px 0;">
<tr>
<td align="center">

<a href="${portalLink}"
style="background:#6d28d9;color:#fff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;display:inline-block;">

Reconnect Today 💜

</a>

</td>
</tr>
</table>

<div style="background:#f8fafc;border-radius:8px;padding:18px;">

<h3 style="margin-top:0;color:#111827;">
🎓 Throwback Challenge
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">
What's your happiest memory at GECWC?
<br/><br/>
A classroom moment?
<br/>
A fest?
<br/>
A farewell?
<br/>
A friendship?
<br/><br/>

Share it with the GECWC family.
</p>

</div>

</td>
</tr>

<tr>

<td style="background:#f9fafb;padding:20px;text-align:center;">

<h2 style="margin:0;color:#111827;">
One College.
</h2>

<h2 style="margin:6px 0;color:#6d28d9;">
Memories Forever. 💜
</h2>

<p style="font-size:13px;color:#9ca3af;">
© ${new Date().getFullYear()} Alumni GECWC Portal
</p>

</td>

</tr>
`;