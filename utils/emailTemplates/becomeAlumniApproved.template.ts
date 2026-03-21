export const becomeAlumniConversionApprovedTemplate = (
  userName: string,
  dashboardLink: string
) => `
<tr>
  <td style="background:linear-gradient(135deg,#16a34a,#15803d); padding:24px; text-align:center; color:#ffffff;"> 
    <h1 style="margin:0; font-size:24px;">Alumni GECWC Portal</h1> 
    <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">Alumni Conversion Approved</p> 
  </td> 
</tr> 

<tr> 
  <td style="padding:32px;"> 

    <h2 style="margin-top:0; color:#111827;">Welcome to Alumni Network 🎓</h2> 

    <p style="color:#4b5563; font-size:15px; line-height:1.6;"> 
      Hello ${userName}, 
      <br/><br/> 
      Your request to convert your student account into an alumni profile has been successfully approved.
    </p> 
    
    <div style="background-color:#ecfdf5; border-left:4px solid #16a34a; padding:16px; margin:24px 0;">
      <p style="margin:0; color:#065f46; font-size:14px;">
        <strong>You can now:</strong><br/>
        • Appear in Alumni Directory<br/>
        • Connect with students & alumni<br/>
        • Participate in events<br/>
        • Offer mentorship
      </p>
    </div>
    
    <table cellpadding="0" cellspacing="0" width="100%" style="margin:30px 0;"> 
      <tr> 
        <td align="center"> 
          <a href="${dashboardLink}" 
             style="background-color:#16a34a; color:#ffffff; padding:14px 28px; text-decoration:none; font-size:16px; border-radius:6px; display:inline-block; font-weight:bold;">
             Go to Dashboard 
          </a> 
        </td> 
      </tr> 
    </table> 

    <p style="color:#4b5563; font-size:14px;">
      Keep your profile updated to maximize your visibility and opportunities.
    </p>

  </td> 
</tr> 

<tr> 
  <td style="background-color:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
    <p style="margin:0;">© ${new Date().getFullYear()} Alumni GECWC Portal. All rights reserved.</p> 
  </td> 
</tr> 
`;