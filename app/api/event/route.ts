import mongoose from "mongoose"
import { NextRequest, NextResponse as res } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import ServerCatchError from "@/utils/serverCatchError"
import EventModel from "@/models/events.model"

const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`

if (mongoose.connection.readyState === 0) {
  mongoose.connect(DB)
}


export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions)

    if (!session)
      return res.json({ message: "Unauthorized User" }, { status: 401 })

    if (session.user.role !== "admin")
      return res.json({ message: "Unauthorized User" }, { status: 403 })

    const body = await req.json()

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

      status: "upcoming",
      isPublished: true,
    }

    const event = await EventModel.create(payload)

    if (!event)
      return res.json({ message: "Something went wrong" }, { status: 500 })

    return res.json({ message: "Event created successfully" })
  } catch (err) {
    return ServerCatchError(err)
  }
}

export const GET = async (req: NextRequest) => {
  try {
    // const session = await getServerSession(authOptions)

    // if (!session)
    //   return res.json({ message: "Unauthorized User" }, { status: 401 })

    const { searchParams } = new URL(req.url)

    const page = Math.max(Number(searchParams.get("page")) || 1, 1)
    const limit = Math.min(Number(searchParams.get("limit")) || 10, 50)
    const skip = limit * (page - 1)

    const status = searchParams.get("status")
    const search = searchParams.get("search")

    let query: any = { isPublished: true }

    if (status) {
      query.status = status
    }

    if (search) {
      query.title = { $regex: search, $options: "i" }
    }

    const events = await EventModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("attendees", "fullName profileImage")

    const total = await EventModel.countDocuments(query)

    return res.json({ events, total })
  } catch (err) {
    return ServerCatchError(err)
  }
}



