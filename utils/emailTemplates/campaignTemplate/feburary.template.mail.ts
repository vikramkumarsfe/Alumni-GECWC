export const februaryNewsletterTemplate = (
  userName: string,
  portalLink: string
) => `
<tr>
  <td style="background:linear-gradient(135deg,#ec4899,#db2777);padding:24px;text-align:center;color:#fff;">
    <h1 style="margin:0;font-size:24px;">Alumni GECWC Portal</h1>
    <p style="margin-top:8px;font-size:14px;opacity:.9;">
      📬 GECWC Letter #02 • Friendship
    </p>
  </td>
</tr>

<tr>
<td style="padding:32px;">

<h2 style="margin-top:0;color:#111827;">
Hey ${userName}! ❤️
</h2>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">
Some friendships begin in college...
<br/>
The best ones never end.
</p>

<div style="background:#fdf2f8;border:1px solid #fbcfe8;border-radius:8px;padding:18px;margin:24px 0;">

<h3 style="margin:0 0 12px;color:#db2777;">
👥 Someone Is Missing...
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">
Our alumni family has crossed
<strong>160+ members.</strong>

<br/><br/>

But your batch still isn't complete.

Maybe your best friend.

Maybe your lab partner.

Maybe your roommate.

Maybe... someone waiting to reconnect.

</p>

</div>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">

Take just one minute today.

Share the Alumni Portal in your batch WhatsApp group.

Let's bring every GECWC alumnus back home. ❤️

</p>

<table width="100%" style="margin:30px 0;">
<tr>
<td align="center">

<a href="${portalLink}"
style="background:#db2777;color:#fff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;display:inline-block;">

Invite Your Batch ❤️

</a>

</td>
</tr>
</table>

<div style="background:#fff7ed;border-radius:8px;padding:18px;">

<h3 style="margin-top:0;color:#111827;">
❤️ Friendship Challenge
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">
Think of your closest college friend.

Forward this email to them.

Who knows...

This might be the message that reunites your batch.

</p>

</div>

</td>
</tr>

<tr>

<td style="background:#f9fafb;padding:20px;text-align:center;">

<h2 style="margin:0;color:#111827;">
One College.
</h2>

<h2 style="margin:6px 0;color:#db2777;">
One Family. ❤️
</h2>

<p style="font-size:13px;color:#9ca3af;">
© ${new Date().getFullYear()} Alumni GECWC Portal
</p>

</td>

</tr>
`;