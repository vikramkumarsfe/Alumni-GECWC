import { connectDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest , NextResponse as res} from "next/server";
import UserModel from "@/models/user.model";
import ServerCatchError from "@/utils/serverCatchError";

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
        const branch = searchParams.get("branch")?.trim();
        const batch = searchParams.get("batch");
        const search = searchParams.get("search")?.trim();
        const sort = searchParams.get("sort") || "newest";

        // 3. Dynamic Query Build Karein
        let query: any = { role: "student", isActive: "approved" };

        if (branch && branch !== "all") {
            query.branch = { $regex: `${branch}`, $options: "i" };
        }

        if (batch && batch !== "all") {
            query.batch = batch;
        }
        

        if (search && search.length > 0) {
            const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            query.$or = [
                { fullname: { $regex: search, $options: "i" } },
                { "profile.company": { $regex: search, $options: "i" } },
                { "profile.skills": { $elemMatch: { $regex: escapedSearch, $options: "i" } } }
            ];
        }

        // 4. Sorting logic
        const sortOrder = sort === "oldest" ? 1 : -1;

        // 5. Database Operations

        console.log(query)
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