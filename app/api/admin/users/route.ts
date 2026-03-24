/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Admin user management APIs
 */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get paginated list of alumni users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 24
 *         description: Number of records per page (max 100)
 *     responses:
 *       200:
 *         description: Paginated alumni list fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       fullname:
 *                         type: string
 *                       image:
 *                         type: string
 *                       email:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */


import UserModel from "@/models/user.model"
import ServerCatchError from "@/utils/serverCatchError"
import { NextRequest, NextResponse as res} from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { connectDB } from "@/lib/mongodb"

export const GET = async(req: NextRequest) => {
    try 
    {
        await connectDB();
        const session = await getServerSession(authOptions)

        if(!session )
            return res.json({ message :  "Unauthorized User"}, { status : 401})

        const { searchParams } = new URL(req.url)

        const page = Math.max(Number(searchParams.get("page")) || 1, 1)
        const limit = Math.min(Number(searchParams.get("limit")) || 24, 100)

        let role = "alumni"
        const student = searchParams.get("student")

        if(student)
            role = "student"

        const skip = limit*(page-1)

        const users = await UserModel.find({ role : role}).sort({ createdAt : -1 }).skip(skip).limit(limit);

        const total = await UserModel.countDocuments({ role : role})

        return res.json(
        {    data : users,
            pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        }})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}