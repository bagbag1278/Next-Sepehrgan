import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  console.log("REFRESH ROUTE CALLED");
  const refreshToken = cookieStore.get("refreshToken")?.value;

  console.log("HAS REFRESH TOKEN:", !!refreshToken);

  if (!refreshToken) {
    return NextResponse.json(
      { message: "Refresh token not found" },
      { status: 401 },
    );
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return NextResponse.json({ message: "Refresh failed" }, { status: 401 });
  }

  const data = await response.json();

  cookieStore.set("accessToken", data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15,
  });

  return NextResponse.json({
    success: true,
  });
}
