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

export const GET = async (req: NextRequest) => {
    try {
        await connectDB();
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized access"}, { status : 400})

        const id = session.user.id

        const connection = await ConnectionModel.find({
            status: "approved",
            $or: [
                { sender: id },
                { receiver: id }
            ]
        })
        .populate('sender', 'fullname image profile')   // First, populate the sender
        .populate('receiver', 'fullname image profile'); // Second, populate the receiver
        if(!connection)
            return res.json({ message : "Something went wrong , Please try again!!"}, { status : 500})

        const formattedConnections = connection.map((conn) => {
            // If I am the sender, the "other party" is the receiver (and vice versa)
            const otherParty = 
                conn.sender._id.toString() === id
                ? conn.receiver 
                : conn.sender;

            return {
                _id : conn._id,
                user: otherParty, 
                lastMsg: conn.lastMsg, 
                updatedAt: conn.updatedAt,
            };
        });

        console.log(formattedConnections)
        return res.json(formattedConnections);

    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}


