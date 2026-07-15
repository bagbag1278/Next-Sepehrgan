import { cookies } from "next/headers";

import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export async function POST() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    console.log("ACCESS TOKEN:", accessToken);

    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),
      },
    });

    console.log("BACKEND STATUS:", response.status);

    const text = await response.text();
    console.log("BACKEND RESPONSE:", text);

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Logout failed",
        },
        {
          status: response.status,
        },
      );
    }

    const res = NextResponse.json({
      success: true,
    });

    res.cookies.delete("accessToken");
    res.cookies.delete("refreshToken");
    res.cookies.delete("isLoggedIn");

    return res;
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      },
    );
  }
}
