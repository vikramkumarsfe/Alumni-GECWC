/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Admin user management APIs
 */

/**
 * @swagger
 * /api/alumni/users/{id}:
 *   get:
 *     summary: Get single alumni user by ID (Admin only)
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
 *               properties:
 *                 _id:
 *                   type: string
 *                 fullname:
 *                   type: string
 *                 image:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *
 *   put:
 *     summary: Update user role (Admin only)
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
 *                 example: alumni
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
import mongoose from "mongoose"
import { NextRequest, NextResponse as res} from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ContextInterface from "@/Interfaces/context.interface"
const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`
if (mongoose.connection.readyState === 0) {
  mongoose.connect(DB)
}


export const PUT = async( req: NextRequest, { params }: ContextInterface) =>{
    try 
    {
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized User"}, { status : 404})

        if( session.user.role !== "admin")
            return res.json({ message : "Unauthorized user"}, { status : 404})

        const param = await params
        const id = param.id
        const body = await req.json()

        if(!id)
            return res.json({message : "Id is required"})

        if(!body)
            return res.json({ message : "body is required"}, { status : 404})

        const payload = {
            role : body.role
        }

        const user = await UserModel.findByIdAndUpdate(id, { $set : payload})

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
            return res.json({ message : "Unauthorized User"}, { status : 404})

        if( session.user.role !== "admin")
            return res.json({ message : "Unauthorized user"}, { status : 404})

        const param = await params
        const id = param.id

        if(!id)
             return res.json({ message : "id not found"}, { status : 404})

        const user = await UserModel.findByIdAndDelete(id)

        if(!user)
            return res.json({ message : "Failed to delete the user"}, { status : 404})
        
        return res.json({ message : "deleted Succesfully"})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}

export const GET = async(req: NextRequest, {params} : ContextInterface) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized User"}, { status : 404})

        if( session.user.role !== "admin")
            return res.json({ message : "Unauthorized user"}, { status : 404})

        const param = await params
        const id = param.id

        if(!id)
             return res.json({ message : "id not found"}, { status : 404})

        const user = await UserModel.findById(id,{ fullname : 1, image : 1, email : 1, createdAt : 1 })

        if(!user)
            return res.json({ message : "Failed to delete the user"}, { status : 404})

        return res.json(user)
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}