import ServerCatchError from "@/utils/serverCatchError"
import mongoose from "mongoose"
import { NextRequest, NextResponse as res} from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ContextInterface from "@/Interfaces/context.interface"
import EventModel from "@/models/events.model"
const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`
if (mongoose.connection.readyState === 0) {
  mongoose.connect(DB)
}

export const PUT = async( req: NextRequest, { params }: ContextInterface) =>{
    try
    {
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized User"}, { status : 404})

        if( session.user.role !== "admin")
            return res.json({ message : "Unauthorized user"}, { status : 404})

        const param = await params

        const id = param.id
        const body = await req.json()

        if(!id)
            return res.json({message : "Id is required"})

        if(!body)
            return res.json({ message : "body is required"}, { status : 404})

        const payload = {
            title: body.title,
            bannerImage: body.bannerImage,
            category: body.category,

            description: body.description,

            date: body.date,
            startTime: body.startTime,
            endTime: body.endTime,

            venueName: body.venueName,
            venueAddress: body.venueAddress,

            organizerName: body.organizerName,

            capacity: body.capacity || 100,
            attendees: [],

            agenda: body.agenda || [],

            status: body.status,
            isPublished: true,
        }


        const event = await EventModel.findByIdAndUpdate(id, { $set : payload})

        if(!event)
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

        const event = await EventModel.findByIdAndDelete(id)

        if(!event)
            return res.json({ message : "Failed to delete the user"}, { status : 404})
        
        return res.json({ message : "deleted Succesfully"})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}

export const GET = async(req: NextRequest, {params} : ContextInterface) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized User"}, { status : 404})

        const param = await params

        const id = param.id

        if(!id)
             return res.json({ message : "id not found"}, { status : 404})

        const event = await EventModel.findById(id)

        if(!event)
            return res.json({ message : "Failed to delete the user"}, { status : 404})
        
        return res.json(event)
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}
