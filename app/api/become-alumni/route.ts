import { NextRequest , NextResponse as res} from "next/server";

export const GET = (req: NextRequest) => {
    res.json({ message : "done"})
}