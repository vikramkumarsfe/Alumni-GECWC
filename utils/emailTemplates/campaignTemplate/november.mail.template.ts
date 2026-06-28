export const novemberNewsletterTemplate = (
  userName: string,
  portalLink: string
) => `
<tr>
  <td style="background:linear-gradient(135deg,#4f46e5,#4338ca);padding:24px;text-align:center;color:#fff;">
    <h1 style="margin:0;font-size:24px;">Alumni GECWC Portal</h1>
    <p style="margin-top:8px;font-size:14px;opacity:.9;">
      📬 GECWC Letter #11 • Gratitude
    </p>
  </td>
</tr>

<tr>
<td style="padding:32px;">

<h2 style="margin-top:0;color:#111827;">
Hello ${userName}! 💙
</h2>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">
Sometimes...
<br/>
the simplest words carry the greatest meaning.
<br/><br/>

<strong>Thank You.</strong>
</p>

<div style="background:#eef2ff;border:1px solid #c7d2fe;border-radius:8px;padding:18px;margin:24px 0;">

<h3 style="margin:0 0 12px;color:#4338ca;">
💙 Because of You...
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">

Every registration.

<br/>
Every shared link.

<br/>
Every memory.

<br/>
Every achievement.

<br/>
Every invitation.

<br/><br/>

Has helped make our alumni community stronger.

</p>

</div>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">

The Alumni Portal isn't growing because of technology.

It's growing because of people like <strong>you.</strong>

</p>

<table width="100%" style="margin:30px 0;">
<tr>
<td align="center">

<a href="${portalLink}"
style="background:#4338ca;color:#fff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;display:inline-block;">

Visit Our Community 💙

</a>

</td>
</tr>
</table>

<div style="background:#f8fafc;border-radius:8px;padding:18px;">

<h3 style="margin-top:0;color:#111827;">
💙 Gratitude Challenge
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">

This month...

Message one person from GECWC.

Thank them.

It could be a classmate.

A senior.

A junior.

Or a teacher.

Sometimes one "Thank You" is enough to make someone's day.

</p>

</div>

<div style="background:#ecfeff;border-radius:8px;padding:18px;margin-top:24px;">

<h3 style="margin-top:0;color:#111827;">
🌟 Community Spotlight
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">

❤️ Thank you to every alumnus who has:

<br/><br/>

• Shared the portal

<br/>
• Invited classmates

<br/>
• Guided juniors

<br/>
• Shared opportunities

<br/>
• Kept the GECWC spirit alive

</p>

</div>

<div style="background:#fff7ed;border-radius:8px;padding:18px;margin-top:24px;">

<h3 style="margin-top:0;color:#111827;">
💌 Thank You Note
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">

Communities aren't built in a day.

They're built by people who care.

Thank you for helping us build the GECWC family.

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

<h2 style="margin:6px 0;color:#4338ca;">
Forever Grateful. 💙
</h2>

<p style="font-size:13px;color:#9ca3af;">
© ${new Date().getFullYear()} Alumni GECWC Portal
</p>

</td>

</tr>
`;