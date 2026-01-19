import ServerCatchError from "@/utils/serverCatchError"
import mongoose from "mongoose"
import { NextRequest, NextResponse as res} from "next/server"
import { forgotPassword } from "@/controller/auth.controller"
const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`
mongoose.connect(DB)


export const POST =async (req : NextRequest) => {
    try {
        const { email } = await req.json()

        if(!email)
            return res.json({ message : "email is required"})
        const data = await  forgotPassword(email)
        return res.json({ message : data})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}