import { NextResponse } from "next/server";

export default function middleware(request) {
  // return NextResponse.redirect(new URL("/login", request.url));

  const cookie = request.cookies.get("token")?.value;
  console.log(cookie);

  if (cookie) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
