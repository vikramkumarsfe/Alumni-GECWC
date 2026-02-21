import mongoose from "mongoose"
import { NextRequest, NextResponse as res } from "next/server"
import { getServerSession } from "next-auth"
import ServerCatchError from "@/utils/serverCatchError"
import EventModel from "@/models/events.model"
import { authOptions } from "../../auth/[...nextauth]/route"

const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`

if (mongoose.connection.readyState === 0) {
  mongoose.connect(DB)
}


export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions)

    if (!session)
      return res.json({ message: "Unauthorized User" }, { status: 401 })

    if( session.user.role !== "admin")
      return res.json({ message : "Unauthorized user"}, { status : 404})

    const { searchParams } = new URL(req.url)

    const upcoming = searchParams.get("upcoming")

    let total
    if(upcoming)
    {
      total = await EventModel.countDocuments({ status : "upcoming"})
    }
    else
    {
      total = await EventModel.countDocuments()
    }

    return res.json({ total })
  } catch (err) {
    return ServerCatchError(err)
  }
}
