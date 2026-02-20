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

export const PUT = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions)

    if (!session)
      return res.json({ message: "Unauthorized User" }, { status: 401 })

    const id = session.user.id

    const { eventId } = await req.json()

    const payload = {
      attendees : id
    }
    const event = await EventModel.findByIdAndUpdate({_id : eventId }, { $push : payload})

    if (!event)
      return res.json({ message: "Something went wrong" }, { status: 500 })

    return res.json({ message: "Event updated successfully" })
  } catch (err) {
    return ServerCatchError(err)
  }
}