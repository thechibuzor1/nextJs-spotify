import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  //token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname, origin } = req.nextUrl;

  //allow request if the following is true
  //1 token exist
  //2 its a request for next-auth sessions and provider fetching
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  //redirect to login if no token
  if (!token && !pathname.includes("/Login")) {
    return NextResponse.redirect(`${origin}/Login`);
  }
}
