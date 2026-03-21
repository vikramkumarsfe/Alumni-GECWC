export const forgotPasswordTemplate = (
  userName: string,
  resetLink: string,
  expiryTime: number,
) => `
<!-- Header -->
 <tr>
  <td style="background:linear-gradient(135deg,#2563eb,#1e40af); padding:24px; text-align:center; color:#ffffff;"> 
    <h1 style="margin:0; font-size:24px;">Alumni GECWC Porta</h1> 
    <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">Password Recovery</p> 
    </td> 
        </tr> 
            <!-- Body --> 
                <tr> 
                    <td style="padding:32px;"> 
                        <h2 style="margin-top:0; color:#111827;">Forgot your password?</h2> 
                        <p style="color:#4b5563; font-size:15px; line-height:1.6;"> Hello ${userName},
                        <br/><br/> We received a request to reset the password for your account. Click the button below to create a new password. </p> <!-- Button --> <table cellpadding="0" cellspacing="0" width="100%" style="margin:30px 0;"> <tr> <td align="center"> <a href="${resetLink}" style="background-color:#2563eb; color:#ffffff; padding:14px 28px; text-decoration:none; font-size:16px; border-radius:6px; display:inline-block;"> Reset Password </a> 
                    </td> 
                </tr> 
    </table> 
    <p style="color:#6b7280; font-size:14px; line-height:1.6;"> This link will expire in <strong>${expiryTime} minutes</strong> and can be used only once. </p> 
    <p style="color:#6b7280; font-size:14px; line-height:1.6;"> If you did not request a password reset, you can safely ignore this email. Your account will remain secure. </p> 
    
    <!-- Fallback link --> 
    
    <p style="font-size:13px; color:#9ca3af; margin-top:24px;"> If the button doesn’t work, copy and paste this link into your browser: <br/> <span style="word-break:break-all;">${resetLink}</span> </p> 
    
    </td> 
        </tr> <!-- Footer -->
             <tr> 
                <td style="background-color:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
                    <p style="margin:0;"> © ${Date.now().toLocaleString()} Alumni GECWC Portal. All rights reserved. </p> <p style="margin:6px 0 0;"> Need help? Contact us at <a href="mailto:gecwc@gmail.com" style="color:#2563eb; text-decoration:none;">gecwc@gmail.com</a> </p> 
                </td> 
            </tr> 
    </table> 
    </td> 
    </tr>
`;
