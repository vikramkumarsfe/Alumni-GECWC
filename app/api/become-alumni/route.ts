import ServerCatchError from "@/utils/serverCatchError";
import { getServerSession } from "next-auth";
import { NextRequest , NextResponse as res} from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import BecomeAlumniModel from "@/models/becomeAlumni.model";
import { sendMail } from "@/utils/send-mail";
import { becomeAlumniRequestReceivedTemplate } from "@/utils/emailTemplates/becomeAlumniRequestReceived.template";

export const POST = async (req: NextRequest) => {
    try {
        await connectDB()
        const session = await  getServerSession(authOptions)

        if(!session)
            return res.json({message : "Unauthorized User"}, { status : 401})

        if(session.user.role !== "student")
            return res.json({message : "Unauthorized User"}, { status : 401})
        const id = session.user.id

        const payload = {
            student : id,
            status : "pending"
        }

        const {name, email, branch, batch, regNo, mobile} = session.user
        const link = `${process.env.SERVER}/admin/dashboard`

        const becomeAlumni = await BecomeAlumniModel.create(payload)

        await sendMail({
            email: `"Alumni Portal" <${process.env.SMTP_SERVER_USERNAME}>`,
            sendTo: process.env.SITE_MAIL_RECIEVER,
            subject: "Student to Alumni Conversion Request Received",
            text: `New Request Received for the conversion`,
            html: becomeAlumniRequestReceivedTemplate(name, email, branch, batch, regNo, mobile, link)
        })

        if(!becomeAlumni)
            return res.json({message : "something went wrong, Please try again"}, { status : 500})

        return res.json({message : "Your request is sent to the Admin."})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}

export const GET = async (req: NextRequest) => {
    try{
        await connectDB()
        const session = await  getServerSession(authOptions)

        if(!session)
            return res.json({message : "Unauthorized User"}, { status : 401})

        if(session.user.role !== "admin")
            return res.json({message : "Unauthorized User"}, { status : 401})
        

        const { searchParams } = new URL(req.url)

        const page = Math.max(Number(searchParams.get("page")) || 1, 1)
        const limit = Math.min(Number(searchParams.get("limit")) || 15, 100)

        const skip = limit*(page-1)

        const becomeAlumni = await BecomeAlumniModel.find()
        .sort({ createdAt : -1 })
        .skip(skip)
        .limit(limit)
        .populate("student", "-password")

        if(!becomeAlumni)
            return res.json({ message : "No data found!!"})

        const total = await BecomeAlumniModel.countDocuments()

        return res.json({becomeAlumni , total})

    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}