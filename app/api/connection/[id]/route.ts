import ServerCatchError from "@/utils/serverCatchError"
import { NextRequest, NextResponse as res} from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ContextInterface from "@/Interfaces/context.interface"
import AnnouncementsModel from "@/models/announcements"
import { connectDB } from "@/lib/mongodb"
import ConnectionModel from "@/models/connection.model"


export const PUT = async( req: NextRequest, { params }: ContextInterface) =>{
    try
    {
        await connectDB();
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized User"}, { status : 404})

        if( session.user.role !== "alumni")
            return res.json({ message : "Unauthorized user"}, { status : 404})

        const param = await params
        const id = param.id
        const body = await req.json()

        if(!id)
            return res.json({message : "Id is required"})

        if(!body)
            return res.json({ message : "body is required"}, { status : 404})

        const payload = {
            status : body.status
        }
        
        const announcement = await ConnectionModel.findByIdAndUpdate(id, { $set : payload})

        if(!announcement)
            return res.json({ message : "something went wrong"}, { status : 500})

        return res.json({ message : "Announcement updated"})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}

export const GET = async( req: NextRequest, { params }: ContextInterface) =>{
    try
    {
        await connectDB();
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized User"}, { status : 404})

        if( session.user.role !== "alumni")
            return res.json({ message : "Unauthorized user"}, { status : 404})

        const param = await params
        const alumniId = param.id
        const id = session.user.id

        if(!alumniId)
            return res.json({message : "Id is required"})

        const connection = await ConnectionModel.findOne({
            $or: [
                { sender : id, receiver : alumniId},
                { receiver : id, sender : alumniId }
            ]
            })
            
        return res.json(connection)
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}

