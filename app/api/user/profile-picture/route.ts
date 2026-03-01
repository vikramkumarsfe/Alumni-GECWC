/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User profile management APIs
 */

/**
 * @swagger
 * /api/user/profile-picture:
 *   post:
 *     summary: Update profile picture
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     description: Updates the authenticated user's profile picture after uploading to a cloud provider (e.g., Cloudinary).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - provider
 *               - key
 *             properties:
 *               provider:
 *                 type: string
 *                 example: cloudinary
 *               key:
 *                 type: string
 *                 example: profile-picture/user123.jpg
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile picture updated
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */


import UserModel from "@/models/user.model"
import ServerCatchError from "@/utils/serverCatchError"
import mongoose from "mongoose"
import {NextResponse as res} from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`
mongoose.connect(DB)


export const POST = async (req: Request) =>  {

    try {
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized"})

        const { provider, key } = await req.json()

        await  UserModel.findByIdAndUpdate(session.user.id, { $set : { image : key, provider}})

        return res.json({ message : "Profile picture updated"})


    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}
