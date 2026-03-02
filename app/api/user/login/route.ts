/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication and login APIs
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     description: Authenticates user using email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user logged In
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */


import UserModel from "@/models/user.model"
import ServerCatchError from "@/utils/serverCatchError"
import { NextRequest, NextResponse as res} from "next/server"
import bcrypt from 'bcrypt'
import { connectDB } from "@/lib/mongodb"

export const POST = async(req: NextRequest) => {
    try {
        await connectDB();
        const { email, password } = await req.json()
        
        if(!email || !password)
        {
            return res.json({ message : "email and password is required"}, { status : 401})
        }

        const user = await UserModel.findOne({email})

        if(!user)
            return res.json({ message : "email or password is invalid"}, { status : 401})

        const isLogin =await  bcrypt.compare(password, user.password)

        if(!isLogin)
        {
            return res.json({message : "email or password is invalid"}, { status : 401})
        }

        const isVerified = (user.isActive === "approved" ? true : false)
    
        if(!isVerified)
            return res.json({ message : "Your account is not active , Please contact to admin. gecwc@gmail.com"})

        return res.json({message : "user logged In"})
    }
    catch(err) 
    {
       return ServerCatchError(err)
    }
}