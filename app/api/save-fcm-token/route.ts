import UserModel from "@/models/user.model";
import ServerCatchError from "@/utils/serverCatchError";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse as res } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (req: NextRequest) => {
  try 
  {
    const session = await  getServerSession(authOptions)

    if(!session)
        return res.json({ message : "Unauthorized access"}, { status : 401})

    const userId = session.user.id
    const { token } = await req.json();

    console.log( "userId- ", userId, "fcm-token-", token)
    if (!token || !userId) 
      return res.json( { error: "Missing token or userId" }, { status: 400 } )

    const data = await UserModel.findByIdAndUpdate(userId, {
      FCM: token,
    }, { new : true});
    console.log(data)
    
    return res.json({ success: true });
  } catch (err) {
    return ServerCatchError(err)
  }
}