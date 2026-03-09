import FeedbackModal from "@/models/feedback.model"
import ServerCatchError from "@/utils/serverCatchError"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse as res} from "next/server"
import { connectDB } from "@/lib/mongodb"
import { authOptions } from "../../auth/[...nextauth]/route"


export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const session = await getServerSession(authOptions)

    if (!session)
      return res.json({ message: "Unauthorized User" }, { status: 401 })

    if( session.user.role !== "admin")
      return res.json({ message : "Unauthorized user"}, { status : 404})

    const pending = await FeedbackModal.countDocuments({ status : "pending"})

    const total = await FeedbackModal.countDocuments()

    const resolved = await FeedbackModal.countDocuments({ status : "resolved"})
    
    return res.json({ total, pending, resolved})
  } 
  catch (err) 
  {
    return ServerCatchError(err)
  }
}