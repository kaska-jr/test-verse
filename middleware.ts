import { NextResponse } from "next/server";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

export { default } from "next-auth/middleware";
export function middleware(req: NextRequestWithAuth) {
  const publicRoutes = ["/api/register", "/api/auth/:path*"]; // List of public routes

  // Allow requests to public routes
  if (
    publicRoutes.some((path) =>
      new RegExp(`^${path.replace("*", ".*")}$`).test(req.nextUrl.pathname)
    )
  ) {
    return NextResponse.next();
  }

  // Protect other routes with NextAuth
  return withAuth(req, {
    pages: {
      signIn: "/auth/login",
    },
  });
}
export const config = {
  matcher: [
    "/dashboard",
    "/deposit",
    "/withdrawal",
    "/transactions",
    "/investments",
    "/invest",
    "/admin",
    "/api/:path*",
    "/api/auth/:path*",
  ], // Apply middleware to these paths
};
