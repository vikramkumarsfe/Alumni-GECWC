import { NextRequest , NextResponse as res } from "next/server"

export const GET = (req: NextRequest) => {
    return res.json({ message : "deployment error fixed "})
}