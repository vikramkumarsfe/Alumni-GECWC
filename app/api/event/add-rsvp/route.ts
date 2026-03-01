import { NextRequest, NextResponse as res } from "next/server"
import { getServerSession } from "next-auth"
import ServerCatchError from "@/utils/serverCatchError"
import EventModel from "@/models/events.model"
import { authOptions } from "../../auth/[...nextauth]/route"
import { connectDB } from "@/lib/mongodb"


export const PUT = async (req: NextRequest) => {
  try {
    await connectDB();
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