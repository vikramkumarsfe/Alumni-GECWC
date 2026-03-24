import ServerCatchError from "@/utils/serverCatchError"
import { NextRequest, NextResponse as res} from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ContextInterface from "@/Interfaces/context.interface"
import { connectDB } from "@/lib/mongodb"
import BecomeAlumniModel from "@/models/becomeAlumni.model"
import UserModel from "@/models/user.model"


export const PUT = async( req: NextRequest, { params }: ContextInterface) =>{
    try
    {
        await connectDB();
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized User"}, { status : 404})

        if( session.user.role !== "admin")
            return res.json({ message : "Unauthorized user"}, { status : 404})

        const param = await params
        const id = param.id
        const body = await req.json()

        if(!id)
            return res.json({message : "Id is required"})

        if(!body)
            return res.json({ message : "body is required"}, { status : 404})

        const payload = {
            status : "approved",
        }
        const studentId = body.studentId

        const user = await UserModel.findByIdAndUpdate(studentId, { $set : {
            role : "alumni"
        }})

        const becomeAlumni = await BecomeAlumniModel.findByIdAndUpdate(id, { $set : payload})

        if(!becomeAlumni)
            return res.json({ message : "something went wrong"}, { status : 500})

        return res.json({ message : "Student Staus updated"})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}


export const DELETE = async(req: NextRequest, {params} : ContextInterface) => {
    try {
        await connectDB();
        const session = await getServerSession(authOptions)

        if(!session)
            return res.json({ message : "Unauthorized User"}, { status : 404})

        if( session.user.role !== "admin")
            return res.json({ message : "Unauthorized user"}, { status : 404})

        const param = await params
        const id = param.id
        if(!id)
             return res.json({ message : "id not found"}, { status : 404})

        const announcement = await BecomeAlumniModel.findByIdAndDelete(id)

        if(!announcement)
            return res.json({ message : "Failed to delete the user"}, { status : 404})
        
        return res.json({ message : "deleted Succesfully"})
    }
    catch(err)
    {
        return ServerCatchError(err)
    }
}
