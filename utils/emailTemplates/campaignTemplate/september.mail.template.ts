export const septemberNewsletterTemplate = (
  userName: string,
  portalLink: string
) => `
<tr>
  <td style="background:linear-gradient(135deg,#0891b2,#0e7490);padding:24px;text-align:center;color:#fff;">
    <h1 style="margin:0;font-size:24px;">Alumni GECWC Portal</h1>
    <p style="margin-top:8px;font-size:14px;opacity:.9;">
      📬 GECWC Letter #09 • Success
    </p>
  </td>
</tr>

<tr>
<td style="padding:32px;">

<h2 style="margin-top:0;color:#111827;">
Hello ${userName}! 🌟
</h2>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">
Success isn't measured by titles...
<br/>
It's measured by the lives we inspire.
<br/><br/>

Every achievement by a GECWC alumnus
is a victory for our entire family.
</p>

<div style="background:#ecfeff;border:1px solid #a5f3fc;border-radius:8px;padding:18px;margin:24px 0;">

<h3 style="margin:0 0 12px;color:#0891b2;">
🏆 This Month We Celebrate You
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">

New Job 💼
<br/>
Promotion 📈
<br/>
Startup 🚀
<br/>
Higher Studies 🎓
<br/>
Awards 🏅
<br/><br/>

Every milestone deserves to be celebrated.

</p>

</div>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">
Don't keep your success to yourself.
<br/><br/>

Share it with the GECWC family.
<br/>

Your story may inspire someone to never give up.

</p>

<table width="100%" style="margin:30px 0;">
<tr>
<td align="center">

<a href="${portalLink}"
style="background:#0891b2;color:#fff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;display:inline-block;">

Share Your Achievement 🌟

</a>

</td>
</tr>
</table>

<div style="background:#f8fafc;border-radius:8px;padding:18px;">

<h3 style="margin-top:0;color:#111827;">
🌟 Alumni Spotlight
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">

<strong>This could be you next month!</strong>
<br/><br/>

Each month we'll feature one inspiring alumnus,
their journey,
and their advice for juniors.

</p>

</div>

<div style="background:#fefce8;border-radius:8px;padding:18px;margin-top:24px;">

<h3 style="margin-top:0;color:#111827;">
📸 Photo of the Month
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">

🏆 <strong>Coming Soon</strong>

<br/><br/>

Your college memories deserve to be remembered.

Share your favorite GECWC photo
and it might be featured in next month's letter.

</p>

</div>

<div style="background:#eff6ff;border-radius:8px;padding:18px;margin-top:24px;">

<h3 style="margin-top:0;color:#111827;">
🌟 Inspiration Corner
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">

Behind every successful alumnus...

there was once a student
who refused to give up.

Keep inspiring.

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

<h2 style="margin:6px 0;color:#0891b2;">
Celebrating Every Success. 🌟
</h2>

<p style="font-size:13px;color:#9ca3af;">
© ${new Date().getFullYear()} Alumni GECWC Portal
</p>

</td>

</tr>
`;