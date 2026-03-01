/**
 * @swagger
 * tags:
 *   - name: Feedback
 *     description: Feedback submission and management APIs
 */

/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Submit feedback
 *     tags: [Feedback]
 *     description: Public endpoint to submit feedback from users or alumni.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - message
 *               - category
 *               - role
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: Vikram Kumar
 *               email:
 *                 type: string
 *                 format: email
 *                 example: vikram@example.com
 *               message:
 *                 type: string
 *                 example: This platform is very helpful.
 *               category:
 *                 type: string
 *                 example: Suggestion
 *               role:
 *                 type: string
 *                 example: alumni
 *     responses:
 *       200:
 *         description: Feedback submitted successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 *
 *   get:
 *     summary: Get paginated list of feedbacks (Admin only)
 *     tags: [Feedback]
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
 *           example: 10
 *         description: Number of records per page (max 100)
 *     responses:
 *       200:
 *         description: Feedback list fetched successfully
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
 *                       email:
 *                         type: string
 *                       message:
 *                         type: string
 *                       category:
 *                         type: string
 *                       role:
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
 *         description: Unauthorized (Admin only)
 *       500:
 *         description: Server error
 */


import FeedbackModal from "@/models/feedback.model"
import ServerCatchError from "@/utils/serverCatchError"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse as res} from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"
import { connectDB } from "@/lib/mongodb"


export const POST = async(req : NextRequest) => {
    try {
        await connectDB();
        const { fullname , email, message, category, role} = await req.json()

        
        if(!fullname || !email || !message  || !category || !role)
            return res.json({message  : "fullname , email, message, category and role is required"})

        const payload = {
            fullname,
            email,
            message,
            category,
            role
        }

        const feedback = await FeedbackModal.create(payload)

        if(!feedback)
            return res.json({ message : "Something went wrong"})

        return res.json({message : "Feedback submitted successfully"})
        
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}

//Only admin can fetch the feedbacks

export const GET = async ( req: NextRequest) => {
    try{
        const session = await getServerSession(authOptions)
        
        if(!session || session.user.role !== "admin")
            return res.json({message : "Unauthorized user"})

        const { searchParams } = new URL(req.url)

        const page = Math.max(Number(searchParams.get("page")) || 1, 1)
        const limit = Math.min(Number(searchParams.get("limit")) || 10, 100)

        const skip = limit*(page-1)

        const feedbacks = await FeedbackModal.find().sort({ createdAt : -1 }).skip(skip).limit(limit);

        const total = await FeedbackModal.countDocuments()

        return res.json(
        {    data : feedbacks,
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

