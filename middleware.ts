import type { NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  if (token && pathname.startsWith("/auth")) return Response.redirect(new URL("/", request.url));

  if (!token && pathname.startsWith("/profile")) return Response.redirect(new URL("/auth/login", request.url));
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
