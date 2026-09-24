/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Admin user management APIs
 */

/**
 * @swagger
 * /api/admin/users/{id}:
 *   get:
 *     summary: Get single user by ID (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *
 *   put:
 *     summary: Update user role or status (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: admin
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *
 *   delete:
 *     summary: Reject an account and email the admin remark (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [remark]
 *             properties:
 *               remark:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 2000
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid user ID or missing/invalid remark
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Administrator access required
 *       404:
 *         description: User not found
 *       502:
 *         description: Email could not be sent; the account was not rejected
 */



import UserModel from "@/models/user.model"
import ServerCatchError from "@/utils/serverCatchError"
import { NextRequest, NextResponse as res} from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ContextInterface from "@/Interfaces/context.interface"
import AcademicModel from "@/models/academics.model"
import { sendMail } from "@/utils/send-mail"
import { accountApprovedTemplate } from "@/utils/emailTemplates/accountApprove.mail.template"
import { accountRejectedTemplate } from "@/utils/emailTemplates/accountRejected.mail.template"
import { accountDeactivatedTemplate } from "@/utils/emailTemplates/accountDeavtived.mail.template"
import { connectDB } from "@/lib/mongodb"
import ExperienceModel from "@/models/experience.model"
import { roleUpgradedToAlumniTemplate } from "@/utils/emailTemplates/accountUpgraded.mail.templete"
import { roleDowngradedToStudentTemplate } from "@/utils/emailTemplates/roleDowngrade.mail.template"
import { isValidObjectId } from "mongoose"
import { MAX_REJECTION_REMARK_LENGTH } from "@/lib/account-rejection"



export const PUT = async( req: NextRequest, { params }: ContextInterface) =>{
    try 
    {
        await connectDB();
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized session"}, { status : 404})

        if( session.user.role !== "admin")
            return res.json({ message : "Unauthorized user"}, { status : 404})

        const param = await params
        const { id } = param
        const body = await req.json()

        if(!id)
            return res.json({message : "Id is required"})

        if(!body)
            return res.json({ message : "body is required"}, { status : 404})

        const payload = {
            role : body.role,
            isActive : body.isActive
        }
        const user = await UserModel.findByIdAndUpdate(id, { $set : payload},{ new : true})

        if(body.isActive === "approved") 
        {
            const data = await sendMail({
                email: `"Alumni Portal" <${process.env.SMTP_SERVER_USERNAME}>`,
                sendTo: body.email,
                subject: "Account Approved",
                text: `Reset your password using this link: `,
                html: accountApprovedTemplate( user.fullname, `${process.env.SERVER}/login`)
              })
        }
        if(body.isActive === "inactive")
        {
             const data = await sendMail({
                email: `"Alumni Portal" <${process.env.SMTP_SERVER_USERNAME}>`,
                sendTo: body.email,
                subject: "Account Suspended",
                text: `Reset your password using this link: `,
                html: accountDeactivatedTemplate(user.fullname)
              })
        }

        if(body.role === "alumni")
        {
            await sendMail({
                email : `"Alumni Portal" <${process.env.SMTP_SERVER_USERNAME}>`,
                sendTo : body.email,
                subject : "Your Alumni GECWC Portal Role Has Been Upgraded to Alumni 🎓",
                text : "conguralations",
                html : roleUpgradedToAlumniTemplate(user.fullname, process.env.SERVER || "")
            })
        }

        if(body.role === "student")
        {
            await sendMail({
                email : `"Alumni Portal" <${process.env.SMTP_SERVER_USERNAME}>`,
                sendTo : body.email,
                subject : "Your Alumni GECWC Portal Role Has Been Changed to Student",
                text : "conguralations",
                html : roleDowngradedToStudentTemplate(user.fullname, process.env.SERVER || "")
            })
        }
        return res.json(user)
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}

export const DELETE = async(req: NextRequest, {params} : ContextInterface) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Please sign in"}, { status : 401})
        
        if( session.user.role !== "admin")
            return res.json({ message : "Administrator access required"}, { status : 403})

        const param = await params
        const { id } = param

        if(!id || !isValidObjectId(id))
             return res.json({ message : "A valid user ID is required"}, { status : 400})

        const body = await req.json().catch(() => null)
        const remark = typeof body?.remark === "string" ? body.remark.trim() : ""

        if (!remark || remark.length > MAX_REJECTION_REMARK_LENGTH) {
            return res.json({
                message: `A rejection remark between 1 and ${MAX_REJECTION_REMARK_LENGTH} characters is required`,
            }, { status: 400 })
        }

        await connectDB();
        const user = await UserModel.findById(id)
        if(!user)
            return res.json({ message : "User not found"}, { status : 404})

        if (user.role !== "student" && user.role !== "alumni") {
            return res.json({ message: "Only student and alumni accounts can be rejected" }, { status: 403 })
        }

        // Keep the account available for retry if the mail provider fails.
        try {
            await sendMail({
                email: `"Alumni Portal" <${process.env.SMTP_SERVER_USERNAME}>`,
                sendTo: user.email,
                subject: "Account Rejected",
                text: `Hello ${user.fullname},\n\nYour registration for the Alumni GECWC Portal has not been approved.\n\nAdmin remark:\n${remark}\n\nPlease contact the administration office if you need further assistance.`,
                html: accountRejectedTemplate(user.fullname, remark)
            })
        } catch {
            return res.json({
                message: "The rejection email could not be sent. The account has not been rejected. Please try again.",
            }, { status: 502 })
        }

        await UserModel.findByIdAndDelete(id)
        
        return res.json({ message : "Account rejected and remark emailed to the user"})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params

    const session = await getServerSession(authOptions)

    if (!session)
      return res.json({ message: "Unauthorized User" }, { status: 401 })


    if (!id)
      return res.json({ message: "id not found" }, { status: 400 })

    const user = await UserModel.findById(id).select("-password")
    const education = await AcademicModel.find({ user: id })
    const experience = await ExperienceModel.find({ user: id})


    if (!user)
      return res.json({ message: "User not found" }, { status: 404 })

    return res.json({ user, education , experience})
  } catch (err) {
    return ServerCatchError(err)
  }
}
