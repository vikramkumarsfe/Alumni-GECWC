export const octoberNewsletterTemplate = (
  userName: string,
  portalLink: string
) => `
<tr>
  <td style="background:linear-gradient(135deg,#dc2626,#b91c1c);padding:24px;text-align:center;color:#fff;">
    <h1 style="margin:0;font-size:24px;">Alumni GECWC Portal</h1>
    <p style="margin-top:8px;font-size:14px;opacity:.9;">
      📬 GECWC Letter #10 • Celebration
    </p>
  </td>
</tr>

<tr>
<td style="padding:32px;">

<h2 style="margin-top:0;color:#111827;">
Happy Festive Season, ${userName}! 🎉
</h2>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">
Festivals remind us of one beautiful thing...
<br/><br/>

No matter where life takes us,
we always find our way back home.

</p>

<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:18px;margin:24px 0;">

<h3 style="margin:0 0 12px;color:#dc2626;">
🏡 Home Isn't Just A Place
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">

It's the people.

The memories.

The friendships.

The laughter.

And for all of us...

<strong>GECWC will always feel like home.</strong>

</p>

</div>

<p style="font-size:15px;line-height:1.8;color:#4b5563;">

This festive season,
take a moment to reconnect with someone
you haven't spoken to in years.

Sometimes,
one message is enough to restart a friendship.

</p>

<table width="100%" style="margin:30px 0;">
<tr>
<td align="center">

<a href="${portalLink}"
style="background:#dc2626;color:#fff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;display:inline-block;">

Reconnect This Festival ❤️

</a>

</td>
</tr>
</table>

<div style="background:#fff7ed;border-radius:8px;padding:18px;">

<h3 style="margin-top:0;color:#111827;">
🎉 Festival Challenge
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">

Wish one old classmate this festive season.

Share the Alumni Portal with them.

Who knows...

Your message might bring an old friendship back to life.

</p>

</div>

<div style="background:#ecfeff;border-radius:8px;padding:18px;margin-top:24px;">

<h3 style="margin-top:0;color:#111827;">
📸 Photo of the Month
</h3>

<p style="margin:0;color:#4b5563;line-height:1.8;">

🏆 <strong>This Month's Highlight</strong>

<br/><br/>

Every photo tells a story.

Maybe next month,
your favorite GECWC memory
will inspire the entire community.

</p>

</div>

</td>
</tr>

<tr>

<td style="background:#f9fafb;padding:20px;text-align:center;">

<h2 style="margin:0;color:#111827;">
One College.
</h2>

<h2 style="margin:6px 0;color:#dc2626;">
Forever Family. ❤️
</h2>

<p style="font-size:13px;color:#9ca3af;">
© ${new Date().getFullYear()} Alumni GECWC Portal
</p>

</td>

</tr>
`;