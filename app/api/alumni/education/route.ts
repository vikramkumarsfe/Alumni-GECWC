/**
 * @swagger
 * tags:
 *   - name: Academics
 *     description: Alumni academic records management
 */

/**
 * @swagger
 * /api/alumni/education:
 *   post:
 *     summary: Add academic record for alumni (Owner only)
 *     tags: [Academics]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - degreeName
 *               - universityName
 *               - completionYear
 *             properties:
 *               degreeName:
 *                 type: string
 *                 example: B.Tech Computer Science
 *               universityName:
 *                 type: string
 *                 example: IIT Delhi
 *               score:
 *                 type: string
 *                 example: 8.5 CGPA
 *               completionYear:
 *                 type: integer
 *                 example: 2024
 *     responses:
 *       200:
 *         description: Course added successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (User ID mismatch)
 *       404:
 *         description: Alumni not found
 *       500:
 *         description: Server error
 *
 *   get:
 *     summary: Get academic records of an alumni
 *     tags: [Academics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Academic records fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   user:
 *                     type: string
 *                   degreeName:
 *                     type: string
 *                   universityName:
 *                     type: string
 *                   score:
 *                     type: string
 *                   completionYear:
 *                     type: integer
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Alumni not found
 *       500:
 *         description: Server error
 */


import { NextRequest, NextResponse as res } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ServerCatchError from "@/utils/serverCatchError";
import AcademicModel from "@/models/academics.model";
import UserModel from "@/models/user.model";
import { connectDB } from "@/lib/mongodb";

export const POST = async(req: NextRequest) => {
    try 
    {
        await connectDB();
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized user"}, { status : 401})

        const id = session.user.id

        if ( !session.user.id) 
        {
            return res.json({ message: "Forbidden" }, { status: 403 })
        }

        const body = await req.json()

        const alumni = await UserModel.findById(id)

        if(!alumni)
            return res.json({message : "Alumni not found"})

        const payload = {
            user : id,
            degreeName : body.degreeName,
            universityName : body.universityName,
            score : body.score,
            completionYear : body.completionYear,
        }

        const data = await AcademicModel.create(payload)

        if(!data)
            return res.json({ message : "failed to add course"})

        return res.json({ message : "Course added succesfully"})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}

export const GET = async(req: NextRequest) => {
    try 
    {
        await connectDB();
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized user"}, { status : 401})

        const id = session.user.id

        const alumni = await UserModel.findById(id)

        if(!alumni)
            return res.json({message : "Alumni not found"})


        const data = await AcademicModel.find({ user : id})

        if(!data)
            return res.json({ message : "failed to fetch course"})

        return res.json(data)
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}