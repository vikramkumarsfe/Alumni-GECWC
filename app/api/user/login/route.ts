import UserModel from "@/models/user.model"
import ServerCatchError from "@/utils/serverCatchError"
import mongoose from "mongoose"
import { NextRequest, NextResponse as res} from "next/server"
import bcrypt from 'bcrypt'
const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`
mongoose.connect(DB)


export const POST = async(req: NextRequest) => {
    try {
        const { email, password } = await req.json()
        
        if(!email || !password)
        {
            res.json({ message : "email and password is required"}, { status : 401})
        }

        const user = await UserModel.findOne({email})

        if(!user)
            return res.json({ message : "email or password is invalid"}, { status : 401})

        const isLogin = bcrypt.compare(password, user.password)

        if(!isLogin)
        {
            return res.json({message : "email or password is invalid"}, { status : 401})
        }
        return res.json({message : "user logged In"})
    }
    catch(err) 
    {
       return ServerCatchError(err)
    }
}