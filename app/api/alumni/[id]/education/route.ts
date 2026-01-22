import { NextRequest, NextResponse as res } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ServerCatchError from "@/utils/serverCatchError";
import ContextInterface from "@/Interfaces/context.interface";
import AcademicModel from "@/models/academics.model";
import UserModel from "@/models/user.model";

const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`;

if (mongoose.connection.readyState === 0) {
  mongoose.connect(DB)
}

export const POST = async(req: NextRequest, context : ContextInterface) => {
    try 
    {
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized user"}, { status : 401})
        const { params } = context

        if ( session.user.id !== params.id) 
        {
            return res.json({ message: "Forbidden" }, { status: 403 })
        }

        const body = await req.json()

        const alumni = await UserModel.findById(params.id)

        if(!alumni)
            return res.json({message : "Alumni not found"})

        const payload = {
            user : params.id,
            degreeName : body.degreeName,
            universityName : body.universityName,
            score : body.score,
            completionYear : body.completionYear,
        }

        const data = await AcademicModel.create(payload)

        if(!data)
            return res.json({ message : "failed to add course"})

        return res.json({ message : "Course added succesfully"})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}


export const GET = async(req: NextRequest, context : ContextInterface) => {
    try 
    {
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized user"}, { status : 401})

        const { params } = context

        const alumni = await UserModel.findById(params.id)

        if(!alumni)
            return res.json({message : "Alumni not found"})


        const data = await AcademicModel.find({ user : params.id})

        if(!data)
            return res.json({ message : "failed to fetch course"})

        return res.json(data)
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}