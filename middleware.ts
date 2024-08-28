// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateAccess } from "./lib/auth";
import { jwtVerify } from "jose";

const secretKey =
  "django-insecure-o5&@&gj(16x%)54lgfo9#%+aa)phv&7u9y9j(qdd@47ge^m0p3";
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
  const isProtectedRoute = path.startsWith("/");

  if (isProtectedRoute) {
    console.log(" middleware");
    let token = request.cookies.get("access")?.value;

    if (!token) {
      // If no access token, try to refresh
      const response = await updateAccess(request);

      // If updateAccess returned a response (either a redirect or a new token)
      if (response instanceof NextResponse) {
        return response;
      }

      // If updateAccess succeeded, get the new token
      token = request.cookies.get("access")?.value;
    }

    if (token) {
      const decodedToken = await decodeToken(token);

      if (decodedToken) {
        const userType = decodedToken.user_type; // Adjust this based on your actual token structure

        // Redirect based on user type
        // if (path.startsWith("/app/publisher") && userType !== "publisher") {
        //   return NextResponse.redirect(new URL("/app/advertiser", request.url));
        // }

        // if (path.startsWith("/app/advertiser") && userType !== "advertiser") {
        //   return NextResponse.redirect(new URL("/app/publisher", request.url));
        // }

        // Allow access to the correct route
        return NextResponse.next();
      }
    }

    // If token is invalid or missing, redirect to login
    return NextResponse.next();
    // return NextResponse.redirect(
    //   new URL("https://localhost:3000/auth/login", request.url)
    // );
  } else {
    console.log("middleware else");
    let token = request.cookies.get("access")?.value;
    if (!token) {
      // If no access token, try to refresh
      const response = await updateAccess(request);

      // If updateAccess returned a response (either a redirect or a new token)
      if (response instanceof NextResponse) {
        return response;
      }

      // If updateAccess succeeded, get the new token
      token = request.cookies.get("access")?.value;
    }
  }

  console.log("middleware all");
  // Allow access to unprotected routes
  return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ["/app/:path*", "/"],
};
