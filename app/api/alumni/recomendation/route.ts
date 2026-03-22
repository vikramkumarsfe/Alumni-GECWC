import { connectDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse as res } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import UserModel from "@/models/user.model";
import ServerCatchError from "@/utils/serverCatchError";

export const GET = async (req: NextRequest) => {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session) {
            return res.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Student ki branch ke hisaab se recommend karne ke liye
        const userBranch = session.user.branch 

        const recommendations = await UserModel.aggregate([
            { 
                $match: { 
                    role: "alumni", 
                    isActive: "approved",
                    // Rule: Same branch walo ko pehle priority do
                    branch: userBranch 
                } 
            },
            { $sample: { size: 4 } }, // MongoDB randomly 4 uthayega
            { 
                $project: { 
                    fullname: 1, 
                    image: 1, 
                    "profile.jobTitle": 1, 
                    "profile.company": 1,
                    branch: 1 
                } 
            }
        ]);

        // Agar same branch ke log kam hain, toh generic alumni mix kar do
        if (recommendations.length < 4) {
            const extra = await UserModel.aggregate([
                { $match: { role: "alumni", isActive: "approved", branch: { $ne: userBranch } } },
                { $sample: { size: 4 - recommendations.length } },
                { $project: { fullname: 1, image: 1, "profile.jobTitle": 1, "profile.company": 1, branch: 1 } }
            ]);
            recommendations.push(...extra);
        }

        return res.json({ data: recommendations });

    } catch (err) {
        return ServerCatchError(err);
    }
}