import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateAccess } from "./lib/auth";
import { jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET_KEY || "your-default-secret-key";
const key = new TextEncoder().encode(secretKey);

async function decodeToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define protected routes
  const isProtectedRoute = path.startsWith("/profile") || path === "/profile";
  const isProfileRoute = path === "/profile";

  let token = request.cookies.get("access")?.value;

  if (!token) {
    const response = await updateAccess(request);
    if (response instanceof NextResponse) {
      return response;
    }
    token = request.cookies.get("access")?.value;
  }

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // const decodedToken = await decodeToken(token);

    // if (!decodedToken) {
    //   return NextResponse.redirect(new URL("/auth/login", request.url));
    // }

    // if (isProfileRoute) {
    //   // Add any specific checks for the profile page if needed
    //   // For example, you might want to check if the user has completed their profile
    // }

    // You can add more specific route checks here if needed
    // For example, landlord-only or tenant-only routes

    return NextResponse.next();
  }

  // For non-protected routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/profile"],
};
