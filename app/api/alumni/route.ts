/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User profile and alumni listing APIs
 */

/**
 * @swagger
 * /api/alumni:
 *   get:
 *     summary: Get paginated list of alumni users (Authenticated users only)
 *     tags: [User]
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
 *         description: Alumni list fetched successfully
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
 *
 *   put:
 *     summary: Update logged-in user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
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
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Update failed
 *       500:
 *         description: Server error
 */


import UserModel from "@/models/user.model"
import ServerCatchError from "@/utils/serverCatchError"
import { NextRequest, NextResponse as res} from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { connectDB } from "@/lib/mongodb"


export const GET = async (req: NextRequest) => {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session) {
            return res.json({ message: "Unauthorized User" }, { status: 401 }); // 401 is better for Unauthorized
        }

        const { searchParams } = new URL(req.url);

        // 1. Pagination Params
        const page = Math.max(Number(searchParams.get("page")) || 1, 1);
        const limit = Math.min(Number(searchParams.get("limit")) || 10, 100);
        const skip = limit * (page - 1);

        // 2. Filter Params
        const branch = searchParams.get("branch");
        const batch = searchParams.get("batch");
        const search = searchParams.get("search");
        const sort = searchParams.get("sort") || "newest";

        // 3. Dynamic Query Build Karein
        let query: any = { role: "alumni", isActive: "approved" };

        if (branch && branch !== "all") {
            query.branch = branch;
        }

        if (batch && batch !== "all") {
            query.batch = batch;
        }

        if (search) {
            query.$or = [
                { fullname: { $regex: search, $options: "i" } },
                { "profile.company": { $regex: search, $options: "i" } },
                { "profile.skills": { $regex: search, $options: "i" } }
            ];
        }

        // 4. Sorting logic
        const sortOrder = sort === "oldest" ? 1 : -1;

        // 5. Database Operations
        const [users, total] = await Promise.all([
            UserModel.find(query, { 
                fullname: 1, 
                image: 1, 
                branch: 1, 
                batch: 1, 
                address: 1, 
                profile: 1, 
                createdAt: 1 
            })
            .sort({ createdAt: sortOrder })
            .skip(skip)
            .limit(limit),
            UserModel.countDocuments(query) // Query apply karna zaroori hai count ke liye
        ]);

        return res.json({
            data: users,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            }
        });

    } catch (err) {
        return ServerCatchError(err);
    }
}

export const PUT = async( req: NextRequest) => {
    try 
    {
        const session = await getServerSession(authOptions)

        if(!session )
            return res.json({ message :  "Unauthorized User"}, { status : 401})

        const body = await req.json()

        const payload = {
            fullname : body.fullname,
            mobile : body.mobile,
            bio : body.bio,
            branch : body.branch,
            batch : body.batch,
            address : body.address,
            image : body.image
        }
        console.log(payload)
        const user = await UserModel.findByIdAndUpdate({ _id : session.user.id}, { $set : payload}, { new : true})

        if(!user)
            return res.json({ message : "Update failed"})

        return res.json({ message : "Profile updated"})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}