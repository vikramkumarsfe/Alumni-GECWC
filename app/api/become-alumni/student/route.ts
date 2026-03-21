import { getServerSession } from "next-auth"
import { NextRequest, NextResponse as res } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route"
import BecomeAlumniModel from "@/models/becomeAlumni.model"
import ServerCatchError from "@/utils/serverCatchError"

export const GET = async(req: NextRequest) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized User"}, { status : 404})

        if(session.user.role !== "student")
            return res.json({ message : "Unauthorized User"}, { status : 404})

        const id = session.user.id

        const becomeAlumni = await BecomeAlumniModel.findOne({ student : id})

        if(!becomeAlumni)
            return res.json({message : "something went wrong"}, { status : 200})

        return res.json(becomeAlumni)
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}