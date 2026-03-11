import ServerCatchError from "@/utils/serverCatchError";
import { getServerSession } from "next-auth";
import { NextRequest , NextResponse as res } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import UserModel from "@/models/user.model";
import { connectDB } from "@/lib/mongodb";

export const GET = async(req: NextRequest) => {
    try {
        await connectDB();
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ messgae : "Unauthorized Access to the api"}, { status : 404})

        if(session.user.role !== "student")
        {
            return res.json({ messgae : "Unauthorized Access to the api"}, { status : 404})
        }

        const id = session.user.id

        const student = await UserModel.findById(id).select("-password -resetPasswordToken -expiryResetLink");

        if(!student)
            return res.json({ message : "User not found"}, { status : 500})

        return res.json(student)
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}

export const PUT = async (req: NextRequest) => {
    try {
        await connectDB();
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ messgae : "Unauthorized Access to the api"}, { status : 404})

        if(session.user.role !== "student")
        {
            return res.json({ messgae : "Unauthorized Access to the api"}, { status : 404})
        }

        const id = session.user.id

        const body = await req.json()

        const payload = {
            image: body.image,
            fullname: body.fullname,
            mobile: body.mobile,
            gender: body.gender,
            DOB: body.DOB,

            bio: body.bio,

            profile: {
                headline: body.headline,
                skills: body.skills
            },

            address: {
                street: body.street,
                city: body.city,
                state: body.state,
                country: body.country,
                pincode: body.pincode
            },

            socialLinks: {
                linkedIn: body.linkedIn,
                github: body.github,
                twitter: body.twitter
            }
        }
        const data = await UserModel.updateOne({ _id : id}, { $set : payload }, { runValidators: true })

        if(data.modifiedCount !== 0)
            return res.json({message : "User Update Failed!!"}, { status : 500})

        return res.json({ message : " user updated succesfully"})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}