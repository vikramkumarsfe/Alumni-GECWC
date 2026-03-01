import ServerCatchError from "@/utils/serverCatchError"
import mongoose from "mongoose"
import { NextRequest, NextResponse as res} from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import AnnouncementsModel from "@/models/announcements"

const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`
if (mongoose.connection.readyState === 0) 
{
  mongoose.connect(DB)
}

export const POST = async(req: NextRequest,) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized User"}, { status : 404})

        if( session.user.role !== "admin")
            return res.json({ message : "Unauthorized user"}, { status : 404})

        const body = await req.json()

        const date = Date.now()

        const payload = {
            title : body.title,
            date : date,
            newAnnouncement : body.newAnnouncement || true,
            description : body.description
        }

        const announcements = await AnnouncementsModel.create(payload)

        if(!announcements)
            return res.json({message : "something went wrong"}, { status : 500})

        return res.json({ message : "Announcements publised!!"})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}

export const GET = async(req: NextRequest) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized User"}, { status : 404})

        const { searchParams } = new URL(req.url)

        const page = Math.max(Number(searchParams.get("page")) || 1, 1)
        const limit = Math.min(Number(searchParams.get("limit")) || 15, 100)

        const skip = limit*(page-1)

        const announcements = await  AnnouncementsModel.find().sort({ createdAt : -1 }).skip(skip).limit(limit)

        const total = await AnnouncementsModel.countDocuments()

        if(!announcements)
            return res.json({message : "something went wrong"}, { status : 500})


        return res.json({announcements, total})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}