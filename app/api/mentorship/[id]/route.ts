import ServerCatchError from "@/utils/serverCatchError"
import { NextRequest, NextResponse as res} from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ContextInterface from "@/Interfaces/context.interface"
import { connectDB } from "@/lib/mongodb"
import MentorshipModel from "@/models/mentorship"

export const PUT = async( req: NextRequest, { params }: ContextInterface) =>{
    try
    {
        await connectDB();
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized User"}, { status : 404})

        const param = await params
        const id = param.id

        const body = await req.json()

        if(!id)
            return res.json({message : "Id is required"})

        const payload = {
            status : body.status,
        }

        const mentorship = await MentorshipModel.findByIdAndUpdate(id, { $set : payload})

        if(!mentorship)
            return res.json({ message : "something went wrong"}, { status : 500})

        return res.json({ message : "Mentor ship updated"})
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

        const param = await params

        const id = param.id

        if(!id)
             return res.json({ message : "id not found"}, { status : 404})

        const mentorship = await MentorshipModel.findByIdAndDelete(id)

        if(!mentorship)
            return res.json({ message : "Failed to delete the event"}, { status : 404})
        
        return res.json({ message : "rejected Succesfully"})
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

        const param = await params
        const alumniId = param.id
        const id = session.user.id

        if(!alumniId)
            return res.json({message : "Id is required"})

        const mentorship = await MentorshipModel.findOne({$or: [
                { sender : id, receiver : alumniId},
                { receiver : id, sender : alumniId }
            ]
            })

        if(!mentorship)
            return res.json({ message : "not mentorship found"}, { status : 200})

        return res.json(mentorship)
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}