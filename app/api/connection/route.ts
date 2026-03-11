import ServerCatchError from "@/utils/serverCatchError";
import { getServerSession } from "next-auth";
import { NextRequest ,NextResponse as res } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import ConnectionModel from "@/models/connection.model";
import { connectDB } from "@/lib/mongodb";

export const POST = async (req: NextRequest) => {
    try {
        await connectDB();
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized access"}, { status : 400})

        const id = session.user.id
        const { receiverId } = await req.json()

        if(!receiverId)
            return res.json({ message : "Receiver is required"}, { status : 500})
        
        const payload = {
            sender : id,
            receiver : receiverId,
            status : "pending"
        }

        const connection = await ConnectionModel.create(payload)

        if(!connection)
            return res.json({ message : "Something went wrong , Please try again!!"}, { status : 500})

        return res.json({message : "Connection Request sent Successfully!!"}, { status : 200})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}