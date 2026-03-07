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
import {NextResponse as res} from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { connectDB } from "@/lib/mongodb"
import cloudinary from "@/utils/cloudingry"

export const POST = async (req: Request) =>  {

    try {
        await connectDB();
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized"})

        const data = await req.formData();
        const file = data.get("file") as File;

        if (!file) {
            return res.json({ message: "File not provided" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result  : any = await new Promise((resolve, reject) => {
            cloudinary.uploader
            .upload_stream({ folder: "alumni_profiles" }, (error, result) => {
                if (error) 
                    reject(error);
                else 
                    resolve(result);
            })
            .end(buffer);
        });

        const public_link = result.secure_url
        await  UserModel.findByIdAndUpdate(session.user.id, { $set : { image : public_link}})

        return res.json({public_link})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}
