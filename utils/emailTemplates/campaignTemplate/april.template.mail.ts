export const aprilNewsletterTemplate = (
  userName: string,
  portalLink: string
) => `
<tr>
  <td style="background:linear-gradient(135deg,#f59e0b,#d97706);padding:24px;text-align:center;color:#fff;">
    <h1 style="margin:0;font-size:24px;">Alumni GECWC Portal</h1>
    <p style="margin-top:8px;font-size:14px;opacity:.9;">
      📬 GECWC Letter #04 • Mentorship
    </p>
  </td>
</tr>

<tr>
<td style="padding:32px;">

<h2 style="margin-top:0;color:#111827;">
Hello ${userName}! 🤝
</h2>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">
Think back to your college days.
<br/><br/>
Someone helped you...
<br/>
A senior shared notes.
<br/>
A friend solved your doubts.
<br/>
A teacher believed in you.
</p>

<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:18px;margin:24px 0;">

<h3 style="margin:0 0 12px;color:#d97706;">
🌟 Now It's Your Turn
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">
Today, there are hundreds of students walking the same path you once did.
<br/><br/>
Your advice...
<br/>
Your experience...
<br/>
Your journey...
<br/><br/>
could change someone's future.
</p>

</div>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">

A few words from you may become someone's biggest motivation.

Let's build a culture where every alumnus helps the next generation.

</p>

<table width="100%" style="margin:30px 0;">
<tr>
<td align="center">

<a href="${portalLink}"
style="background:#d97706;color:#fff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;display:inline-block;">

Become a Mentor 🤝

</a>

</td>
</tr>
</table>

<div style="background:#f8fafc;border-radius:8px;padding:18px;">

<h3 style="margin-top:0;color:#111827;">
🤝 Mentor Challenge
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">
This month, help just <strong>one student</strong>.
<br/><br/>
Answer a question.
<br/>
Review a resume.
<br/>
Share an opportunity.
<br/><br/>
One small act can shape someone's career.

</p>

</div>

</td>
</tr>

<tr>

<td style="background:#f9fafb;padding:20px;text-align:center;">

<h2 style="margin:0;color:#111827;">
One College.
</h2>

<h2 style="margin:6px 0;color:#d97706;">
Growing by Giving. 🤝
</h2>

<p style="font-size:13px;color:#9ca3af;">
© ${new Date().getFullYear()} Alumni GECWC Portal
</p>

</td>

</tr>
`;