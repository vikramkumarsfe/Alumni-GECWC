export const becomeAlumniConversionRejectedTemplate = (
  userName: string,
  rejectionReason: string = "Your details could not be verified.",
  supportEmail: string = `${process.env.SITE_MAIL_RECIEVER}`
) => `
<tr>
  <td style="background:linear-gradient(135deg,#dc2626,#991b1b); padding:24px; text-align:center; color:#ffffff;"> 
    <h1 style="margin:0; font-size:24px;">Alumni GECWC Portal</h1> 
    <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">Alumni Conversion Update</p> 
  </td> 
</tr> 

<tr> 
  <td style="padding:32px;"> 

    <h2 style="margin-top:0; color:#111827;">Request Not Approved</h2> 

    <p style="color:#4b5563; font-size:15px; line-height:1.6;"> 
      Hello ${userName}, 
      <br/><br/> 
      Your request to convert your student account into an alumni profile has been reviewed.
      Unfortunately, we were unable to approve your request at this time.
    </p> 
    
    <div style="background-color:#fef2f2; border-left:4px solid #dc2626; padding:16px; margin:24px 0;">
      <p style="margin:0; color:#991b1b; font-size:14px;">
        <strong>Reason:</strong><br/>
        ${rejectionReason}
      </p>
    </div>

    <div style="background-color:#f9fafb; border-left:4px solid #6b7280; padding:16px; margin:24px 0;">
      <p style="margin:0; color:#374151; font-size:14px;">
        <strong>What you can do next:</strong><br/>
        • Update your profile information<br/>
        • Verify your batch, branch, and registration details<br/>
        • Reapply after corrections
      </p>
    </div>
    
    <table cellpadding="0" cellspacing="0" width="100%" style="margin:30px 0;"> 
      <tr> 
        <td align="center"> 
          <a href="mailto:${supportEmail}" 
             style="background-color:#374151; color:#ffffff; padding:14px 28px; text-decoration:none; font-size:16px; border-radius:6px; display:inline-block; font-weight:bold;">
             Contact Support 
          </a> 
        </td> 
      </tr> 
    </table> 

  </td> 
</tr> 

<tr> 
  <td style="background-color:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
    <p style="margin:0;">© ${new Date().getFullYear()} Alumni GECWC Portal. All rights reserved.</p> 
  </td> 
</tr> 
`;