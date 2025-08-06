import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) return NextResponse.rewrite(new URL("/404", request.url));
  }

  //   const user = { role: "ADMIN" }; // Simulate fetching user from session

  //   if (!session || user?.role !== "ADMIN") {
  //     return NextResponse.rewrite(new URL("/404", request.url));
  //   }
  // }

  return NextResponse.next();
}
