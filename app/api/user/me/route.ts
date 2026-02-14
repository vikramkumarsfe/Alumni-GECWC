/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication and profile session APIs
 */

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Get current authenticated user session
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     description: Returns the currently authenticated user's session information.
 *     responses:
 *       200:
 *         description: Session fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *
 *   put:
 *     summary: Update current user's profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     description: Updates the authenticated user's profile details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: Vikram Kumar
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */


import UserModel from "@/models/user.model"
import ServerCatchError from "@/utils/serverCatchError"
import mongoose from "mongoose"
import { NextRequest, NextResponse as res} from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`
mongoose.connect(DB)


export const GET = async(req : NextRequest) => {
    try 
    {
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({message : "Unauthorized user"})


        return res.json(session)
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}

export const PUT = async( req: NextRequest) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session )
            return res.json({ message  : "Unauthorized Access"}, { status : 401})

        const body = await req.json()

        const id = session.user.id
        const payload = {
            fullname : body.fullname,
        }

        const data = await UserModel.findByIdAndUpdate(id, {
            $set : payload
        }, { new : true})

        return res.json(data)
    }
    catch(err)
    {
       return ServerCatchError(err)
    }
}