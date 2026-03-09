import ServerCatchError from "@/utils/serverCatchError"
import { NextRequest, NextResponse as res} from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ContextInterface from "@/Interfaces/context.interface"
import EventModel from "@/models/events.model"
import { connectDB } from "@/lib/mongodb"
import FeedbackModal from "@/models/feedback.model"

export const PUT = async( req: NextRequest, { params }: ContextInterface) =>{
    try
    {
        await connectDB();
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized User"}, { status : 404})

        if( session.user.role !== "admin")
            return res.json({ message : "Unauthorized user"}, { status : 404})

        const param = await params
        const id = param.id

        if(!id)
            return res.json({message : "Id is required"})

        const payload = {
            status : "resolved",
        }

        const feedback = await FeedbackModal.findByIdAndUpdate(id, { $set : payload})

        if(!feedback)
            return res.json({ message : "something went wrong"}, { status : 500})

        return res.json({ message : "Event updated"})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}

export const DELETE = async(req: NextRequest, {params} : ContextInterface) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized User"}, { status : 404})

        if( session.user.role !== "admin")
            return res.json({ message : "Unauthorized user"}, { status : 404})

        const param = await params

        const id = param.id

        if(!id)
             return res.json({ message : "id not found"}, { status : 404})

        const event = await FeedbackModal.findByIdAndDelete(id)

        if(!event)
            return res.json({ message : "Failed to delete the event"}, { status : 404})
        
        return res.json({ message : "deleted Succesfully"})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}