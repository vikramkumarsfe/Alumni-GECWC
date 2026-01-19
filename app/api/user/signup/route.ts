import UserModel from "@/models/user.model"
import ServerCatchError from "@/utils/serverCatchError"
import mongoose from "mongoose"
import { NextRequest, NextResponse as res } from "next/server"
const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`
mongoose.connect(DB)

export const POST = async(req : NextRequest) => {
    try {
        const body = await req.json()

        if(!body)
        {
            return res.json({ message : "name, email, mobile, password is required"})
        }
        const user = await UserModel.create(body)

        if(!user)
        {
            return res.json({ message : "Failed to create user"})
        }

        return res.json(user)
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}