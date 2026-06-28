export const alumniCommunityGrowthTemplate = (
  userName: string,
  portalLink: string
) => `
<tr>
  <td style="background:linear-gradient(135deg,#2563eb,#1d4ed8); padding:24px; text-align:center; color:#ffffff;">
    <h1 style="margin:0; font-size:24px;">Alumni GECWC Portal</h1>
    <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">🎉 Growing Our Alumni Family</p>
  </td>
</tr>

<tr>
  <td style="padding:32px;">
    <h2 style="margin-top:0; color:#111827;">
      Hey GECWC Family! 👋
    </h2>

    <p style="color:#4b5563; font-size:15px; line-height:1.7;">
      Hello <strong>${userName}</strong>,
      <br/><br/>
      We are excited to share that our <strong>GECWC Alumni Portal</strong> has now grown to
      <strong>160+ registered alumni</strong>. 🎉
    </p>

    <p style="color:#4b5563; font-size:15px; line-height:1.7;">
      Every new member makes our community stronger. Our vision is to bring
      <strong>every GECWC alumnus together on one platform</strong> where we can reconnect,
      network, share opportunities, celebrate achievements, and support one another.
    </p>

    <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:20px; margin:24px 0;">
      <h3 style="margin:0 0 12px; color:#1d4ed8; font-size:16px;">
        🚀 How You Can Help
      </h3>

      <ul style="margin:0; padding-left:20px; color:#1e3a8a; font-size:14px; line-height:1.8;">
        <li>Share the Alumni Portal in your batch WhatsApp group.</li>
        <li>Invite your classmates and friends to register.</li>
        <li>Help us reconnect every member of the GECWC family.</li>
      </ul>
    </div>

    <table cellpadding="0" cellspacing="0" width="100%" style="margin:30px 0;">
      <tr>
        <td align="center">
          <a href="${portalLink}"
             style="background:#2563eb; color:#ffffff; padding:14px 28px;
             text-decoration:none; border-radius:6px; display:inline-block;
             font-size:16px; font-weight:bold;">
            Join & Share the Alumni Portal
          </a>
        </td>
      </tr>
    </table>

    <p style="color:#4b5563; font-size:15px; line-height:1.7;">
      A simple message from you can help many more alumni reconnect with the GECWC community.
      Together, let's build one strong network for everyone.
    </p>

    <p style="font-size:13px; color:#9ca3af; margin-top:24px;">
      If the button above doesn't work, use the link below:
      <br/>
      <a href="${portalLink}" style="color:#2563eb; word-break:break-all;">
        ${portalLink}
      </a>
    </p>
  </td>
</tr>

<tr>
  <td style="background-color:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
    <p style="margin:0;">
      © ${new Date().getFullYear()} Alumni GECWC Portal. All rights reserved.
    </p>

    <p style="margin:8px 0 0;">
      Thank you for helping us build a stronger GECWC Alumni Community. ❤️
    </p>
  </td>
</tr>
`;