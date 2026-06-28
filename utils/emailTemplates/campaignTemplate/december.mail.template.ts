export const decemberNewsletterTemplate = (
  userName: string,
  portalLink: string
) => `
<tr>
  <td style="background:linear-gradient(135deg,#1f2937,#111827);padding:24px;text-align:center;color:#fff;">
    <h1 style="margin:0;font-size:24px;">Alumni GECWC Portal</h1>
    <p style="margin-top:8px;font-size:14px;opacity:.9;">
      📬 GECWC Letter #12 • Year in Review
    </p>
  </td>
</tr>

<tr>
<td style="padding:32px;">

<h2 style="margin-top:0;color:#111827;">
Hello ${userName}! 🎊
</h2>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">
Another year comes to an end...
<br/><br/>

But every ending is the beginning of a new chapter.
</p>

<div style="background:#f3f4f6;border:1px solid #d1d5db;border-radius:8px;padding:18px;margin:24px 0;">

<h3 style="margin:0 0 12px;color:#111827;">
📈 This Year Together
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">

❤️ Hundreds of alumni connected.

<br/>
🤝 New friendships were rebuilt.

<br/>
💼 Opportunities were shared.

<br/>
🌟 Success stories inspired juniors.

<br/>
📸 Memories were relived.

<br/><br/>

And this is only the beginning.

</p>

</div>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">

Thank you for being part of this incredible journey.

Every visit, every registration, every shared link has helped build something truly meaningful.

</p>

<table width="100%" style="margin:30px 0;">
<tr>
<td align="center">

<a href="${portalLink}"
style="background:#111827;color:#fff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;display:inline-block;">

See You in the New Year 🎉

</a>

</td>
</tr>
</table>

<div style="background:#ecfeff;border-radius:8px;padding:18px;">

<h3 style="margin-top:0;color:#111827;">
🏆 Community Highlights
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">

🌟 Alumni Spotlight

<br/>
📸 Best Photo of the Year

<br/>
💼 Biggest Career Achievement

<br/>
🤝 Top Community Contributor

<br/>
❤️ Most Inspiring Story

</p>

</div>

<div style="background:#fefce8;border-radius:8px;padding:18px;margin-top:24px;">

<h3 style="margin-top:0;color:#111827;">
🎊 Letter to Your Future Self
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">

When this time comes next year...

What new story will you tell?

What new achievement will you celebrate?

What new friend will you reconnect with?

We can't wait to find out.

Happy New Year! ❤️

</p>

</div>

</td>
</tr>

<tr>

<td style="background:#f9fafb;padding:20px;text-align:center;">

<h2 style="margin:0;color:#111827;">
One College.
</h2>

<h2 style="margin:6px 0;color:#111827;">
A Year of Memories. ❤️
</h2>

<p style="font-size:13px;color:#9ca3af;">
© ${new Date().getFullYear()} Alumni GECWC Portal
</p>

</td>

</tr>
`;