import UserModel from "@/models/user.model"
import ServerCatchError from "@/utils/serverCatchError"
import mongoose from "mongoose"
import { NextRequest, NextResponse as res} from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`
mongoose.connect(DB)


export const GET = async(req : NextRequest) => {
    try 
    {
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({message : "Unauthorized user"})


        return res.json(session)
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}

export const PUT = async( req: NextRequest) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session )
            return res.json({ message  : "Unauthorized Access"}, { status : 401})

        const body = await req.json()

        const id = session.user.id
        const payload = {
            fullname : body.fullname,
        }

        const data = await UserModel.findByIdAndUpdate(id, {
            $set : payload
        }, { new : true})

        return res.json(data)
    }
    catch(err)
    {
       return ServerCatchError(err)
    }
}