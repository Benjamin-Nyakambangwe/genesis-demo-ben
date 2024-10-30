// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { updateAccess } from "./lib/auth";
// import { jwtVerify } from "jose";

// const secretKey = process.env.JWT_SECRET_KEY || "your-default-secret-key";
// const key = new TextEncoder().encode(secretKey);

// async function decodeToken(token: string): Promise<any> {
//   try {
//     const { payload } = await jwtVerify(token, key, {
//       algorithms: ["HS256"],
//     });
//     return payload;
//   } catch (error) {
//     console.error("Failed to decode token:", error);
//     return null;
//   }
// }

// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;

//   // Define protected routes
//   const isProtectedRoute = path.startsWith("/profile") || path === "/profile";
//   const isProfileRoute = path === "/profile";

//   let token = request.cookies.get("access")?.value;

//   if (!token) {
//     const response = await updateAccess(request);
//     if (response instanceof NextResponse) {
//       return response;
//     }
//     token = request.cookies.get("access")?.value;
//   }

//   if (isProtectedRoute) {
//     if (!token) {
//       return NextResponse.redirect(new URL("/auth/login", request.url));
//     }

//     return NextResponse.next();
//   }

//   // For non-protected routes
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/profile/:path*", "/profile"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateAccess } from "./lib/auth";
import { jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET_KEY || "your-default-secret-key";
const key = new TextEncoder().encode(secretKey);

// Define protected routes array for better maintainability
const PROTECTED_ROUTES = [
  "/profile",
  "/properties/add",
  "/chat",
  // Add other protected routes here
];

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

  // Check if current path is protected
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => path.startsWith(route) || path === route
  );

  // Get tokens from cookies
  const accessToken = request.cookies.get("access")?.value;
  const refreshToken = request.cookies.get("refresh")?.value;

  // If accessing protected route
  if (isProtectedRoute) {
    // No tokens available, redirect to login
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Try to use existing access token
    if (accessToken) {
      const decodedToken = await decodeToken(accessToken);

      // If token is valid, allow access
      if (decodedToken) {
        return NextResponse.next();
      }
    }

    // Try to refresh the token
    if (refreshToken) {
      const response = await updateAccess(request);

      if (response instanceof NextResponse) {
        const newAccessToken = response.cookies.get("access")?.value;

        if (newAccessToken) {
          return response;
        }
      }
    }

    // If all token attempts fail, redirect to login
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // For non-protected routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
