import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/user.model"
import { forgotPasswordTemplate } from "@/utils/forgot.password.mail.template"
import { sendMail } from "@/utils/send-mail"
import bcrypt from "bcrypt"
import { v4 as uuid } from 'uuid';
const FIFTEEN_MINUTES_IN_MS = 15 * 60 * 1000;

export const forgotPassword = async (email :string) : Promise<String> => {
    await connectDB();
    const token = uuid()
    const expirayTime = Date.now() + FIFTEEN_MINUTES_IN_MS

    const user = await UserModel.findOneAndUpdate(
        { email }, 
        {$set : {
            resetPasswordToken : token,
            expiryResetLink : expirayTime
        }},
        { new : true}
    )
    if(!user)
        throw new Error("User not found")

    const resetLink  = `${process.env.SERVER}/reset-password?token=${token}`
    const data = await sendMail({
    email: `"Alumni Portal" <${process.env.SMTP_SERVER_USERNAME}>`,
    sendTo: email,
    subject: "Reset Your Password",
    text: `Reset your password using this link: ${resetLink}`,
    html: forgotPasswordTemplate( user.fullname, resetLink,15)
  });

    return "Email sent Successfully"
}

export const setPassword = async (password : string, token : string) :Promise<any> => {
    await connectDB();
    const user = await UserModel.findOne({
        resetPasswordToken: token,
        expiryResetLink : { $gt: Date.now() },
    });

    if(!user)
        throw new Error("User does not exist or link expired")
    
    user.password = await bcrypt.hash(password, 12)
    user.resetPasswordToken = null
    user.expiryResetLink = null

    user.save()

    return "Password reset successfully"
}