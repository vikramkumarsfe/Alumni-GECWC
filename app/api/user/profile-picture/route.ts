import UserModel from "@/models/user.model"
import ServerCatchError from "@/utils/serverCatchError"
import mongoose from "mongoose"
import { NextRequest, NextResponse as res} from "next/server"
import bcrypt from 'bcrypt'
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { useSession } from "next-auth/react"
const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`
mongoose.connect(DB)


export const POST = async (req: Request) =>  {

    try {
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized"})

        const { provider, key } = await req.json()

        await  UserModel.findByIdAndUpdate(session.user.id, { $set : { image : key, provider}})

        return res.json({ message : "Profile picture updated"})


    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}
