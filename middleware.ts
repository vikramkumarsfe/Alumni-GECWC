import { getToken } from "next-auth/jwt";

import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

export const middleware = async (req : NextRequest ) => {
    const session = await getToken({req, secret : process.env.NEXTAUTH_SECRET})
    const {pathname} = req.nextUrl
    const adminPath = pathname.startsWith("/admin")
    const userPath = pathname.startsWith("/alumni")

    if(!session && (adminPath || userPath))
        return NextResponse.redirect(new URL("/login",req.url))

    if(session)
    {
        const role = session.role

        if(adminPath && role !== "admin")
             return NextResponse.redirect(new URL("/login",req.url))

        if(userPath && role !== "alumni")
             return NextResponse.redirect(new URL("/login",req.url))

        if( (pathname === "/login" || pathname === "/signup") && role === "alumni")
            return NextResponse.redirect(new URL("/alumni", req.url))

        if( (pathname === "/login" || pathname === "/signup") && role === "admin")
            return NextResponse.redirect(new URL("/admin", req.url))

        return NextResponse.next()
    }
}

export const config : MiddlewareConfig = {
    matcher : [
        "/alumni/:path",
        "/admin/:path",
        "/login",
        "/signup"
    ]
}