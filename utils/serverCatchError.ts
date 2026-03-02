import { NextResponse as res } from "next/server";

const ServerCatchError = (err : unknown, statusCode : number = 500 ) => {
    if( err instanceof Error)
    {
        return res.json({ message : err.message}, {status : statusCode})
    }

    return res.json({ message : "Unknown Error"}, { status :  500})
}

export default ServerCatchError