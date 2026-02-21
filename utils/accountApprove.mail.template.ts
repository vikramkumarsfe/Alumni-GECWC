export const accountApprovedTemplate = (
  userName: string,
  loginLink: string
) => `
<tr>
  <td style="background:linear-gradient(135deg,#059669,#10b981); padding:24px; text-align:center; color:#ffffff;"> 
    <h1 style="margin:0; font-size:24px;">Alumni GECWC Portal</h1> 
    <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">Account Verified</p> 
  </td> 
</tr> 
<tr> 
  <td style="padding:32px;"> 
    <h2 style="margin-top:0; color:#111827;">Welcome to the Community!</h2> 
    <p style="color:#4b5563; font-size:15px; line-height:1.6;"> Hello ${userName},
    <br/><br/> Great news! Your registration request has been reviewed and <strong>approved</strong> by the administration. You now have full access to the Alumni GECWC Portal. </p> 
    
    <table cellpadding="0" cellspacing="0" width="100%" style="margin:30px 0;"> 
      <tr> 
        <td align="center"> 
          <a href="${loginLink}" style="background-color:#059669; color:#ffffff; padding:14px 28px; text-decoration:none; font-size:16px; border-radius:6px; display:inline-block; font-weight:bold;"> Login to Your Account </a> 
        </td> 
      </tr> 
    </table> 
    
    <p style="color:#4b5563; font-size:15px; line-height:1.6;"> 
      You can now connect with fellow alumni, view job postings, and stay updated with the latest campus news.
    </p> 
    
    <p style="font-size:13px; color:#9ca3af; margin-top:24px;"> 
      If the button above doesn't work, click the link below: <br/> 
      <a href="${loginLink}" style="color:#059669; word-break:break-all;">${loginLink}</a> 
    </p> 
  </td> 
</tr> 
<tr> 
  <td style="background-color:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
    <p style="margin:0;"> © ${new Date().getFullYear()} Alumni GECWC Portal. All rights reserved. </p> 
    <p style="margin:6px 0 0;"> Questions? Reach out at <a href="mailto:gecwc@gmail.com" style="color:#059669; text-decoration:none;">gecwc@gmail.com</a> </p> 
  </td> 
</tr> 
`;