import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const originalUrl = req.nextUrl.protocol + req.headers.get('host') + req.nextUrl.pathname

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      const signInUrl = new URL("/signin", originalUrl);
      signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};