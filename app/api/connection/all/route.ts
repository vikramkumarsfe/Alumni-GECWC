import { connectDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse as res } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import ConnectionModel from "@/models/connection.model";
import ServerCatchError from "@/utils/serverCatchError";

export const GET = async (req: NextRequest) => {
    try {
        await connectDB();
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized access"}, { status : 400})

        const id = session.user.id

        const connection = await ConnectionModel.find({
            $or: [
                { sender: id },
                { receiver: id }
            ]
        })
        .populate('sender', 'fullname image profile role batch branch address')   // First, populate the sender
        .populate('receiver', 'fullname image profile role batch branch address') // Second, populate the receiver
        .sort({ updatedAt : -1})
        
        if(!connection)
            return res.json({ message : "Something went wrong , Please try again!!"}, { status : 200})

        const format = (conn: any) => ({
            _id: conn._id,
            status: conn.status,
            isSender: conn.sender._id.toString() === id,
            otherUser: conn.sender._id.toString() === id ? conn.receiver : conn.sender,
            lastMsg: conn.lastMessage,
            updatedAt: conn.updatedAt,
        })

        const formatted = connection.map(format)

        const sent =      formatted.filter(c => c.isSender && c.status === 'pending')
        const received = formatted.filter(c => !c.isSender && c.status === 'pending')
        const connected = formatted.filter(c => c.status === 'approved')

        return res.json({ sent , received, connected})

    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}
