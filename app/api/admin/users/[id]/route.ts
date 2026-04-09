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
 *     summary: Delete user by ID (Admin only)
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
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
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
        else {
             const data = await sendMail({
                email: `"Alumni Portal" <${process.env.SMTP_SERVER_USERNAME}>`,
                sendTo: body.email,
                subject: "Account Suspended",
                text: `Reset your password using this link: `,
                html: accountDeactivatedTemplate(user.fullname)
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
        await connectDB();
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized User"}, { status : 404})
        
        if( session.user.role !== "admin")
            return res.json({ message : "Unauthorized user"}, { status : 404})

        const param = await params
        const { id } = param

        if(!id)
             return res.json({ message : "id not found"}, { status : 404})

        const user = await UserModel.findByIdAndDelete(id)

        await sendMail({
            email: `"Alumni Portal" <${process.env.SMTP_SERVER_USERNAME}>`,
            sendTo: user.email,
            subject: "Account Rejected",
            text: `Reset your password using this link: `,
            html: accountRejectedTemplate( user.fullname)
          })

        if(!user)
            return res.json({ message : "Failed to delete the user"}, { status : 404})
        
        return res.json({ message : "deleted Succesfully"})
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