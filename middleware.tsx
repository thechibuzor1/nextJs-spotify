import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  if (req.nextUrl.pathname === "/") {
    const session = await getToken({ req, secret: process.env.JWT_SECRET });
    url.pathname = "/Login";
    if (!session) return NextResponse.redirect(url);
  }
  return NextResponse.next();
}