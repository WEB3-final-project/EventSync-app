import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {

  const path = request.nextUrl.pathname;

  const role =
    request.cookies.get("role")?.value;
  if (
    path.startsWith("/private") &&
    role !== "ADMIN"
  ) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/private/:path*", "/public/:path*"],
  
};