import UserModel from "@/models/user.model"
import ServerCatchError from "@/utils/serverCatchError"
import mongoose from "mongoose"
import { NextRequest, NextResponse as res} from "next/server"
import bcrypt from 'bcrypt'
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`
mongoose.connect(DB)

export const POST = async( req: NextRequest) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({message  : "Unauthorized User"}, { status : 404})

        if(session.user.role !== "alumni")
            return res.json({ message : "Unauthorized user"}, { status: 404 })

        const { password, newPassword } = await req.json()

        const user = await UserModel.findById(session.user.id)
        if(!user)
            return res.json({message : "Unauthorized User"}, { status : 404})

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword)
            return res.json({ message : "Old password is not correct"}, { status: 404 })
        const hashedPassword =await  bcrypt.hash(newPassword, 12)

        const data = await UserModel.updateOne({_id : session.user.id}, {$set : { password : hashedPassword}})

        return res.json({ message : "Password Updated"})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}