export const registrationReceivedTemplate = (
  userName: string
) => `
<tr>
  <td style="background:linear-gradient(135deg,#6366f1,#4338ca); padding:24px; text-align:center; color:#ffffff;"> 
    <h1 style="margin:0; font-size:24px;">Alumni GECWC Portal</h1> 
    <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">Testing in Progress</p> 
  </td> 
</tr> 
<tr> 
  <td style="padding:32px;"> 
    <h2 style="margin-top:0; color:#111827;">Thank you for registering!</h2> 
    <p style="color:#4b5563; font-size:15px; line-height:1.6;"> Hello ${userName},
    <br/><br/> We have successfully received your registration form for the GECWC Alumni Management System. </p> 
    
    <div style="background-color:#eff6ff; border-radius:8px; padding:20px; margin:24px 0; border:1px border-solid #dbeafe;">
      <h3 style="margin:0 0 10px 0; font-size:16px; color:#1e40af;">What happens next?</h3>
      <ul style="margin:0; padding-left:20px; color:#1e40af; font-size:14px; line-height:1.5;">
        <li>Our administration team will verify your Registration Number and Batch details.</li>
        <li>This process usually takes <strong>24-48 hours</strong>.</li>
        <li>You will receive another email once your account is activated.</li>
      </ul>
    </div>
    
    <p style="color:#4b5563; font-size:15px; line-height:1.6;"> 
      In the meantime, make sure to add <strong>gecwc@gmail.com</strong> to your safe senders list so you don't miss our update.
    </p> 

    <p style="color:#9ca3af; font-size:13px; margin-top:24px;"> 
      If you did not perform this registration, please ignore this email or contact us if you have concerns about your identity.
    </p> 
  </td> 
</tr> 
<tr> 
  <td style="background-color:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
    <p style="margin:0;"> © ${new Date().getFullYear()} Alumni GECWC Portal. All rights reserved. </p> 
  </td> 
</tr> 
`;