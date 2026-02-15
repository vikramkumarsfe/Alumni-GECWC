/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication and password recovery APIs
 */

/**
 * @swagger
 * /api/user/set-password:
 *   post:
 *     summary: Reset password using token
 *     tags: [Authentication]
 *     description: Allows user to set a new password using a valid password reset token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - token
 *             properties:
 *               password:
 *                 type: string
 *                 example: newStrongPassword123
 *               token:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password updated successfully
 *       400:
 *         description: Missing password or token
 *       401:
 *         description: Invalid or expired token
 *       500:
 *         description: Server error
 */


import ServerCatchError from "@/utils/serverCatchError"
import mongoose from "mongoose"
import { NextRequest, NextResponse as res} from "next/server"
import { setPassword } from "@/controller/auth.controller"
const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`
mongoose.connect(DB)

export const POST = async (req: NextRequest) => {
    try {
        const { password, token } = await req.json()

        if(!password || !token)
            return res.json({ message : "New password or Token is required"}, { status : 400})

        const data = await setPassword(password, token)

        return res.json({ message  : data})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}