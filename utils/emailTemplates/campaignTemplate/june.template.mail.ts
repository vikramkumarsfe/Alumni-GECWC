export const juneNewsletterTemplate = (
  userName: string,
  portalLink: string
) => `
<tr>
  <td style="background:linear-gradient(135deg,#0f766e,#115e59);padding:24px;text-align:center;color:#fff;">
    <h1 style="margin:0;font-size:24px;">Alumni GECWC Portal</h1>
    <p style="margin-top:8px;font-size:14px;opacity:.9;">
      📬 GECWC Letter #06 • Dreams
    </p>
  </td>
</tr>

<tr>
<td style="padding:32px;">

<h2 style="margin-top:0;color:#111827;">
Hello ${userName}! 🚀
</h2>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">
Every great achievement begins with a dream.
<br/><br/>
Today, we're dreaming of something bigger than ourselves.
</p>

<div style="background:#ecfeff;border:1px solid #99f6e4;border-radius:8px;padding:18px;margin:24px 0;">

<h3 style="margin:0 0 12px;color:#0f766e;">
🚀 Our Biggest Dream
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">
A day when...
<br/><br/>
Every GECWC alumnus is connected.
<br/>
Every student finds a mentor.
<br/>
Every opportunity reaches the right person.
<br/>
Every success is celebrated together.
<br/><br/>

<strong>One College. One Community.</strong>

</p>

</div>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">
Dreams don't become reality overnight.
<br/><br/>
They grow because people believe in them.
<br/><br/>
Thank you for believing in ours.
</p>

<table width="100%" style="margin:30px 0;">
<tr>
<td align="center">

<a href="${portalLink}"
style="background:#0f766e;color:#fff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;display:inline-block;">

Build The Future 🚀

</a>

</td>
</tr>
</table>

<div style="background:#f8fafc;border-radius:8px;padding:18px;">

<h3 style="margin-top:0;color:#111827;">
🚀 Dream Challenge
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">
Imagine GECWC five years from now.
<br/><br/>
What would you love to see?
<br/><br/>
A stronger alumni network?
<br/>
More placements?
<br/>
More startups?
<br/>
More mentorship?
<br/><br/>

Let's build that future together.

</p>

</div>

</td>
</tr>

<tr>

<td style="background:#f9fafb;padding:20px;text-align:center;">

<h2 style="margin:0;color:#111827;">
One College.
</h2>

<h2 style="margin:6px 0;color:#0f766e;">
Building Tomorrow. 🚀
</h2>

<p style="font-size:13px;color:#9ca3af;">
© ${new Date().getFullYear()} Alumni GECWC Portal
</p>

</td>

</tr>
`;