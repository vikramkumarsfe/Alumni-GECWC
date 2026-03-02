export const accountDeactivatedTemplate = (
  userName: string,
  supportEmail: string = "gecwc@gmail.com"
) => `
<tr>
  <td style="background:linear-gradient(135deg,#d97706,#b45309); padding:24px; text-align:center; color:#ffffff;"> 
    <h1 style="margin:0; font-size:24px;">Alumni GECWC Portal</h1> 
    <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">Account Status Update</p> 
  </td> 
</tr> 
<tr> 
  <td style="padding:32px;"> 
    <h2 style="margin-top:0; color:#111827;">Account Deactivated</h2> 
    <p style="color:#4b5563; font-size:15px; line-height:1.6;"> Hello ${userName},
    <br/><br/> This is to inform you that your account on the Alumni GECWC Portal has been <strong>deactivated</strong> by the administration. </p> 
    
    <p style="color:#4b5563; font-size:15px; line-height:1.6;"> 
      While your account is deactivated, you will not be able to log in, access alumni directories, or participate in portal activities. Your data remains secure, but your access has been suspended.
    </p>

    <div style="background-color:#fffbeb; border-left:4px solid #d97706; padding:16px; margin:24px 0;">
      <p style="margin:0; color:#92400e; font-size:14px;">
        <strong>Possible reasons for deactivation:</strong><br/>
        • Maintenance or profile audit.<br/>
        • Violation of portal community guidelines.<br/>
        • Request for account suspension.
      </p>
    </div>
    
    <p style="color:#4b5563; font-size:15px; line-height:1.6;"> 
      If you have questions regarding this change or wish to request reactivation, please click the button below to contact our support team.
    </p> 

    <table cellpadding="0" cellspacing="0" width="100%" style="margin:30px 0;"> 
      <tr> 
        <td align="center"> 
          <a href="mailto:${supportEmail}" style="background-color:#1f2937; color:#ffffff; padding:14px 28px; text-decoration:none; font-size:16px; border-radius:6px; display:inline-block; font-weight:bold;"> Appeal Deactivation </a> 
        </td> 
      </tr> 
    </table> 
  </td> 
</tr> 
<tr> 
  <td style="background-color:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
    <p style="margin:0;"> © ${new Date().getFullYear()} Alumni GECWC Portal. All rights reserved. </p> 
  </td> 
</tr> 
`;