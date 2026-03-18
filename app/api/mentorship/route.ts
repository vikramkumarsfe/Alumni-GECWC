import { NextRequest , NextResponse as res } from "next/server"

export const POST = (req: NextRequest) => {
    return res.json({ message : "deployment error fixed "})
}