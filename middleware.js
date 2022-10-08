import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {

  if (req.nextUrl.pathname === "/") {
    const session = await getToken({ req, secret: process.env.JWT_SECRET });
    if (!session) return NextResponse.redirect("http://localhost:3000/Login");
  }
  return NextResponse.next();
}
