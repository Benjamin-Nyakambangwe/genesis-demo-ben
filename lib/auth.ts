import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey =
  "django-insecure-o5&@&gj(16x%)54lgfo9#%+aa)phv&7u9y9j(qdd@47ge^m0p3";
const key = new TextEncoder().encode(secretKey);

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData) {
  console.log("LOGIN");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      email: formData.get("email"),
      password: formData.get("password"),
    }),
    credentials: "include",
  };

  try {
    const res = await fetch("http://127.0.0.1:8000/auth/jwt/create/", options);

    if (!res.ok) {
      throw new Error("Login failed");
    }

    const data = await res.json();
    console.log("DATA", data);

    // Decrypt the access token
    const decodedToken = await decrypt(data.access);

    // Get the expiration time from the decoded token
    const expirationTime = new Date(decodedToken.exp * 1000);

    // Set the access token cookie with the expiration time from the token
    cookies().set("access", data.access, {
      expires: expirationTime,
      httpOnly: true,
    });

    // Set the refresh token cookie (12 hours expiration as before)
    const refreshExpire = new Date(Date.now() + 12 * 60 * 60 * 1000);
    cookies().set("refresh", data.refresh, {
      expires: refreshExpire,
      httpOnly: true,
    });

    // Save decoded token details in a separate cookie
    cookies().set(
      "user_details",
      JSON.stringify({
        user_id: decodedToken.user_id,
        user_type: decodedToken.user_type,
        // Add any other relevant details from the decoded token
      }),
      {
        expires: expirationTime,
        httpOnly: true,
      }
    );

    return { success: true, userType: decodedToken.user_type };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Login failed" };
  }
}

export async function register(formData: FormData) {
  const options = {
    method: "POST",
    body: formData,
  };

  try {
    const res = await fetch("http://127.0.0.1:8000/auth/users/", options);

    if (!res.ok) {
      // Handle error cases
      const errorData = await res.json();
      console.error("Registration error:", errorData);
      throw new Error(errorData.detail || "Registration failed");
    }

    const data = await res.json();
    console.log("REGISTRATION DATA", data);

    // Redirect to the desired page after successful registration
    return { success: true, data };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { success: false, error: error.message || "Registration failed" };
  }
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateAccess(request: any) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access")?.value;

  // If access token exists, no need to refresh
  if (accessToken) {
    return NextResponse.next();
  }

  // If no access token, attempt to refresh using the refresh token
  const refreshToken = cookieStore.get("refresh")?.value;
  if (!refreshToken) {
    return NextResponse.redirect("http://localhost:3000/auth/login");
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  };

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/auth/jwt/refresh/",
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("refresh token data", data);

    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    // Decrypt the access token
    const decodedToken = await decrypt(data.access);

    // Get the expiration time from the decoded token
    const expirationTime = new Date(decodedToken.exp * 1000);
    const res = NextResponse.next();
    res.cookies.set({
      name: "access",
      value: data.access,
      httpOnly: true,
      expires: expires,
    });
    res.cookies.set(
      "user_details",
      JSON.stringify({
        user_id: decodedToken.user_id,
        user_type: decodedToken.user_type,
        // Add any other relevant details from the decoded token
      }),
      {
        expires: expirationTime,
        httpOnly: true,
      }
    );
    return res;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 500 }
    );
  }
}
