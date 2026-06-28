export const marchNewsletterTemplate = (
  userName: string,
  portalLink: string
) => `
<tr>
  <td style="background:linear-gradient(135deg,#16a34a,#15803d);padding:24px;text-align:center;color:#fff;">
    <h1 style="margin:0;font-size:24px;">Alumni GECWC Portal</h1>
    <p style="margin-top:8px;font-size:14px;opacity:.9;">
      📬 GECWC Letter #03 • Growth
    </p>
  </td>
</tr>

<tr>
<td style="padding:32px;">

<h2 style="margin-top:0;color:#111827;">
Hello ${userName}! 🌱
</h2>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">
Every journey begins with a single step...
<br/><br/>
And for many of us,
that journey began at <strong>GECWC.</strong>
</p>

<div style="background:#ecfdf5;border:1px solid #bbf7d0;border-radius:8px;padding:18px;margin:24px 0;">

<h3 style="margin:0 0 12px;color:#15803d;">
🚀 Look How Far We've Come
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">
Some of us are building products.
<br/>
Some are working in top companies.
<br/>
Some are preparing for government services.
<br/>
Some are pursuing higher studies.
<br/><br/>

But every success story started from the same campus.

</p>

</div>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">

Your journey can inspire someone else.

Update your profile and let juniors see what's possible after GECWC.

</p>

<table width="100%" style="margin:30px 0;">
<tr>
<td align="center">

<a href="${portalLink}"
style="background:#16a34a;color:#fff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;display:inline-block;">

Share Your Journey 🌱

</a>

</td>
</tr>
</table>

<div style="background:#f8fafc;border-radius:8px;padding:18px;">

<h3 style="margin-top:0;color:#111827;">
🌱 Growth Challenge
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">
If your college self could see you today...

What would make them proud?

Now inspire someone else by sharing your story.

</p>

</div>

</td>
</tr>

<tr>

<td style="background:#f9fafb;padding:20px;text-align:center;">

<h2 style="margin:0;color:#111827;">
One College.
</h2>

<h2 style="margin:6px 0;color:#16a34a;">
Growing Together. 🌱
</h2>

<p style="font-size:13px;color:#9ca3af;">
© ${new Date().getFullYear()} Alumni GECWC Portal
</p>

</td>

</tr>
`;