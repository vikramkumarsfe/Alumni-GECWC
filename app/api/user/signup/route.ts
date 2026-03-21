/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication and registration APIs
 */

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Register new user
 *     tags: [Authentication]
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - mobile
 *               - password
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: Vikram Kumar
 *               email:
 *                 type: string
 *                 format: email
 *                 example: vikram@example.com
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               password:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 example: alumni
 *     responses:
 *       200:
 *         description: Signup successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: SignUp successfull!!
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Server error
 */


import { connectDB } from "@/lib/mongodb"
import UserModel from "@/models/user.model"
import { adminNewSignupNotification } from "@/utils/emailTemplates/adminNotification.mail.template"
import { registrationReceivedTemplate } from "@/utils/emailTemplates/registrationReceived.template"
import { sendMail } from "@/utils/send-mail"
import ServerCatchError from "@/utils/serverCatchError"
import { NextRequest, NextResponse as res } from "next/server"

export const POST = async(req : NextRequest) => {
    try {
        await connectDB();
        const body = await req.json()

        if(!body)
        {
            return res.json({ message : "name, email, mobile, password is required"})
        }
        const user = await UserModel.create(body)

        if(!user)
        {
            return res.json({ message : "Failed to create user"})
        }

        await sendMail({
            email: `"Alumni Portal" <${process.env.SMTP_SERVER_USERNAME}>`,
            sendTo: body.email,
            subject: "Registration Form submitted",
            text: `Reset your password using this link: `,
            html: registrationReceivedTemplate(user.fullname)
        })
        
        await sendMail({
            email: `"Alumni Portal" <${process.env.SMTP_SERVER_USERNAME}>`,
            sendTo: `${process.env.SITE_MAIL_RECIEVER}`,
            subject: "New Alumni Registration Request",
            text: `Reset your password using this link:`,
            html: adminNewSignupNotification(
                user.fullname,
                user.email,
                user.mobile,
                user.regNo,
                user.batch,
                user.branch,
                `${process.env.SERVER}/admin/users`
            )
            })

        return res.json({ message : "SignUp successfull!!"})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}