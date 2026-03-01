import UserModel from "@/models/user.model"
import ServerCatchError from "@/utils/serverCatchError"
import { NextRequest, NextResponse as res} from "next/server"
import { getServerSession } from "next-auth"
import { connectDB } from "@/lib/mongodb";
import { authOptions } from "../../auth/[...nextauth]/route"

export const GET = async(req: NextRequest ) => {
    try 
    {
        await connectDB();
        const session = await getServerSession(authOptions)

        if(!session )
            return res.json({ message :  "Unauthorized User"}, { status : 401})

        if( session.user.role !== "admin")
            return res.json({ message : "Unauthorized user"}, { status : 404})

        const { searchParams } = new URL(req.url)

        const totalPending = searchParams.get("pending")

        const newMembers = searchParams.get("new")
        
        let total
        if(totalPending)
        {
            total = await UserModel.countDocuments({ role : "alumni", isActive : "pending"})
            return res.json({ total })
        }
        if(newMembers)
        {
            const now = new Date();

            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

            const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

            total = await UserModel.countDocuments({ role : "alumni", createdAt: {
                    $gte: startOfMonth,
                    $lt: startOfNextMonth,
                }})
            return res.json({ total })
        }

        total = await UserModel.countDocuments({ role : "alumni"})
        return res.json({total})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}