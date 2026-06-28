export const julyNewsletterTemplate = (
  userName: string,
  portalLink: string
) => `
<tr>
  <td style="background:linear-gradient(135deg,#0284c7,#0369a1);padding:24px;text-align:center;color:#fff;">
    <h1 style="margin:0;font-size:24px;">Alumni GECWC Portal</h1>
    <p style="margin-top:8px;font-size:14px;opacity:.9;">
      📬 GECWC Letter #07 • Throwback
    </p>
  </td>
</tr>

<tr>
<td style="padding:32px;">

<h2 style="margin-top:0;color:#111827;">
Hello ${userName}! 📸
</h2>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">
Every picture tells a story.
<br/><br/>
Every story reminds us of the people who made our college life unforgettable.
</p>

<div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:18px;margin:24px 0;">

<h3 style="margin:0 0 12px;color:#0369a1;">
📷 Open Your Gallery...
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">
Scroll back to your college days.
<br/><br/>
Find that one photo...
<br/>
The classroom selfie.
<br/>
The farewell.
<br/>
The fest.
<br/>
The canteen group.
<br/><br/>

You'll probably smile before you even realize it. 😊

</p>

</div>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">
Those moments deserve to be remembered.
<br/><br/>
Share your memories and help keep the GECWC spirit alive.
</p>

<table width="100%" style="margin:30px 0;">
<tr>
<td align="center">

<a href="${portalLink}"
style="background:#0284c7;color:#fff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;display:inline-block;">

Share Your Memories 📸

</a>

</td>
</tr>
</table>

<div style="background:#f8fafc;border-radius:8px;padding:18px;">

<h3 style="margin-top:0;color:#111827;">
📸 Throwback Challenge
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">
Find your favorite GECWC photo.
<br/><br/>
Post it on the Alumni Portal or share it with your batchmates.
<br/><br/>
Every picture keeps our memories alive.

</p>

</div>

</td>
</tr>

<tr>

<td style="background:#f9fafb;padding:20px;text-align:center;">

<h2 style="margin:0;color:#111827;">
One College.
</h2>

<h2 style="margin:6px 0;color:#0284c7;">
A Lifetime of Memories. 📸
</h2>

<p style="font-size:13px;color:#9ca3af;">
© ${new Date().getFullYear()} Alumni GECWC Portal
</p>

</td>

</tr>
`;