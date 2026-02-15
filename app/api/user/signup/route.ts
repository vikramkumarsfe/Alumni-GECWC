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


import UserModel from "@/models/user.model"
import ServerCatchError from "@/utils/serverCatchError"
import mongoose from "mongoose"
import { NextRequest, NextResponse as res } from "next/server"
const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`
mongoose.connect(DB)

export const POST = async(req : NextRequest) => {
    try {
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

        return res.json({ message : "SignUp successfull!!"})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}