import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@daveyplate/next-rate-limit";

export const middleware = async (req: NextRequest) => {
  // ✅ Apply rate limiting FIRST
  const rateLimitResponse = await rateLimit({
    request: req,
    response: NextResponse.next(),
    sessionLimit: 50,
    ipLimit: 150,
    sessionWindow: 10,
    ipWindow: 10,
    upstash: {
      enabled: true,
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
      analytics: true,
    },
  });

  // If rate limit blocks → return immediately
  if (rateLimitResponse.status === 429) {
    return rateLimitResponse;
  }

  // ✅ Auth logic
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  const isAdmin = pathname.startsWith("/admin");
  const isAlumni = pathname.startsWith("/alumni");
  const isStudent = pathname.startsWith("/student");

  //  Block unauthenticated users
  if (!session && (isAdmin || isAlumni || isStudent)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (session) {
    const role = session.role as "admin" | "alumni" | "student";

    //  Role-based protection
    if (isAdmin && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (isAlumni && role !== "alumni") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (isStudent && role !== "student") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 🔁 Prevent logged-in users from visiting auth pages
    if (pathname === "/login" || pathname === "/signup") {
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      if (role === "alumni") {
        return NextResponse.redirect(new URL("/alumni", req.url));
      }
      if (role === "student") {
        return NextResponse.redirect(new URL("/student", req.url));
      }
    }
  }

  // ✅ Default fallback
  return NextResponse.next();
};

// ✅ Apply middleware to these routes
export const config = {
  matcher: [
    "/admin/:path*",
    "/alumni/:path*",
    "/student/:path*",
    "/login",
    "/signup",
    "/api/:path*", 
  ],
}