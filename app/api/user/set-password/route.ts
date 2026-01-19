import ServerCatchError from "@/utils/serverCatchError"
import mongoose from "mongoose"
import { NextRequest, NextResponse as res} from "next/server"
import { setPassword } from "@/controller/auth.controller"
const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`
mongoose.connect(DB)

export const POST = async (req: NextRequest) => {
    try {
        const { password, token } = await req.json()

        if(!password || !token)
            return res.json({ message : "New password or Token is required"})

        const data = await setPassword(password, token)

        return res.json({ message  : data})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}