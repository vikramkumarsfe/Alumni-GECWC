import UserModel from "@/models/user.model"
import ServerCatchError from "@/utils/serverCatchError"
import mongoose from "mongoose"
import { NextRequest, NextResponse as res} from "next/server"
import bcrypt from 'bcrypt'
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import ContextInterface from "@/Interfaces/context.interface"

const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`
if (mongoose.connection.readyState === 0) {
  mongoose.connect(DB)
}

export const GET = async(req: NextRequest, { params }: ContextInterface) => {
    try 
    {
        const session = await getServerSession(authOptions)

        if(!session )
            return res.json({ message :  "Unauthorized User"}, { status : 404})

        const { searchParams } = new URL(req.url)

        const page = Math.max(Number(searchParams.get("page")) || 1, 1)
        const limit = Math.min(Number(searchParams.get("limit")) || 10, 100)

        const skip = limit*(page-1)

        const users = await UserModel.find({ role : "alumni"},{ fullname : 1, image : 1, email : 1, createdAt : 1 }).sort({ createdAt : -1 }).skip(skip).limit(limit);

        const total = await UserModel.countDocuments()

        return res.json(
        {    data : users,
            pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        }})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}