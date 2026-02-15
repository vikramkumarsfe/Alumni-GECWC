/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication and security APIs
 */

/**
 * @swagger
 * /api/user/change-password:
 *   post:
 *     summary: Change password (Alumni only)
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     description: Allows an authenticated alumni user to change their password after verifying the old password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - newPassword
 *             properties:
 *               password:
 *                 type: string
 *                 example: oldPassword123
 *               newPassword:
 *                 type: string
 *                 example: newStrongPassword456
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (User is not alumni)
 *       400:
 *         description: Old password is incorrect
 *       500:
 *         description: Server error
 */


import UserModel from "@/models/user.model"
import ServerCatchError from "@/utils/serverCatchError"
import mongoose from "mongoose"
import { NextRequest, NextResponse as res} from "next/server"
import bcrypt from 'bcrypt'
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`
mongoose.connect(DB)

export const POST = async( req: NextRequest) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({message  : "Unauthorized User"}, { status : 404})

        if(session.user.role !== "alumni")
            return res.json({ message : "Unauthorized user"}, { status: 404 })

        const { password, newPassword } = await req.json()

        const user = await UserModel.findById(session.user.id)
        if(!user)
            return res.json({message : "Unauthorized User"}, { status : 404})

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword)
            return res.json({ message : "Old password is not correct"}, { status: 404 })
        const hashedPassword =await  bcrypt.hash(newPassword, 12)

        const data = await UserModel.updateOne({_id : session.user.id}, {$set : { password : hashedPassword}})

        return res.json({ message : "Password Updated"})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}