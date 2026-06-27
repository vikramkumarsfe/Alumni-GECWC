export const augustNewsletterTemplate = (
  userName: string,
  portalLink: string
) => `
<tr>
  <td style="background:linear-gradient(135deg,#ea580c,#f97316);padding:24px;text-align:center;color:#fff;">
    <h1 style="margin:0;font-size:24px;">Alumni GECWC Portal</h1>
    <p style="margin-top:8px;font-size:14px;opacity:.9;">
      📬 GECWC Letter #08 • Pride
    </p>
  </td>
</tr>

<tr>
<td style="padding:32px;">

<h2 style="margin-top:0;color:#111827;">
Hello ${userName}! 🇮🇳
</h2>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">
Wherever life takes us...
<br/>
One thing never changes.
<br/><br/>

<strong>We will always be GECWC Alumni.</strong>
</p>

<div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:18px;margin:24px 0;">

<h3 style="margin:0 0 12px;color:#ea580c;">
🏛️ Our Identity
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">
Some are Software Engineers.
<br/>
Some are Entrepreneurs.
<br/>
Some are Government Officers.
<br/>
Some are pursuing Higher Studies.
<br/><br/>

Different journeys...
<br/>
One identity.
<br/><br/>

<strong>GECWC.</strong>

</p>

</div>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">
Every achievement by an alumnus makes our community stronger.
<br/><br/>

Let's celebrate every success together.
</p>

<table width="100%" style="margin:30px 0;">
<tr>
<td align="center">

<a href="${portalLink}"
style="background:#ea580c;color:#fff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;display:inline-block;">

Celebrate Together 🇮🇳

</a>

</td>
</tr>
</table>

<div style="background:#ecfeff;border-radius:8px;padding:18px;">

<h3 style="margin-top:0;color:#111827;">
🏆 Alumni Achievement
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">
Have you recently...
<br/><br/>

• Got a new job?
<br/>
• Received a promotion?
<br/>
• Started a business?
<br/>
• Completed higher studies?
<br/><br/>

Share your achievement.
Your story could inspire hundreds of students.

</p>

</div>

<div style="background:#f0f9ff;border-radius:8px;padding:18px;margin-top:24px;">

<h3 style="margin-top:0;color:#111827;">
📸 Photo of the Month
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">

<strong>Coming Soon...</strong>
<br/><br/>

Next month, one memorable GECWC photo shared by an alumnus
will be featured right here.

Maybe it'll be yours. 📷

</p>

</div>

<div style="background:#f8fafc;border-radius:8px;padding:18px;margin-top:24px;">

<h3 style="margin-top:0;color:#111827;">
🇮🇳 Proud Moment
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">

Take a moment today...

Smile...

Because wherever you are in the world,

you're carrying a piece of GECWC with you.

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

<h2 style="margin:6px 0;color:#ea580c;">
Proud Forever. 🇮🇳
</h2>

<p style="font-size:13px;color:#9ca3af;">
© ${new Date().getFullYear()} Alumni GECWC Portal
</p>

</td>

</tr>
`;