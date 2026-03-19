import ServerCatchError from "@/utils/serverCatchError"
import { getServerSession } from "next-auth"
import { NextRequest , NextResponse as res } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"
import { connectDB } from "@/lib/mongodb"
import MentorshipModel from "@/models/mentorship"

export const POST = async (req: NextRequest) => {
    try {
        await connectDB();
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized User"}, { status : 404})

        const { receiverId} = await req.json()
        const id = session.user.id

        if(!receiverId)
            return res.json({ message : "receiver is required"}, { status : 500})

        const payload = {
            receiver : receiverId,
            sender : id,
            status : "pending",
        }

        const mentorship = await MentorshipModel.create(payload)

        if(!mentorship)
            return res.json({ message : "something went wrong , Please try again!!"}, { status : 500})

        return res.json({ message : "mentorship request sent!!"})
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
            return res.json({ message : "Unauthorized User"}, { status : 404})

        const id = session.user.id

        const mentorship = await MentorshipModel.find({$or : [
            { sender : id},
            { receiver : id},
        ]})
        if(!mentorship)
            return res.json({ message : "something went wrong , Please try again!!"}, { status : 500})

        return res.json(mentorship)
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}