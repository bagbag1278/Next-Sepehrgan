import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { message: "Refresh token not found" },
      { status: 401 }
    );
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("isLoggedIn");
    cookieStore.delete("accessTokenExpiry");
    return NextResponse.json(
      { message: "Refresh failed" },
      { status: 401 }
    );
  }

  const data = await response.json();

 
  const decoded = jwt.decode(data.accessToken) as { exp: number } | null;

  cookieStore.set("accessToken", data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15,
  });


  if (decoded?.exp) {
    cookieStore.set("accessTokenExpiry", String(decoded.exp), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });
  }

  return NextResponse.json({ success: true });
}