import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

async function handler(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ slug: string[] }>;
  },
) {
  const { slug: path } = await params;

  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body =
    request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await request.text();

  const searchParams = request.nextUrl.searchParams.toString();
  const targetUrl = `${BASE_URL}/${path.join("/")}${searchParams ? `?${searchParams}` : ""}`;

  let response = await fetch(targetUrl, {
    method: request.method,
    headers: {
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
      "Content-Type": request.headers.get("content-type") ?? "application/json",
    },
    body,
    cache: "no-store",
  });
  console.log("ACCESS TOKEN:", !!accessToken);
  console.log("REFRESH TOKEN:", !!refreshToken);
  console.log("TARGET URL:", targetUrl);
  console.log("BACKEND STATUS:", response.status);
  if (response.status === 401 && refreshToken) {
    console.log("STARTING REFRESH");

    const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
    });

    console.log("REFRESH STATUS:", refreshResponse.status);

    if (!refreshResponse.ok) {
      return NextResponse.json(
        {
          message: "Refresh token expired",
        },
        {
          status: 401,
        },
      );
    }

    const refreshData = await refreshResponse.json();


    const newAccessToken = refreshData.accessToken;

    response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        Authorization: `Bearer ${newAccessToken}`,
        "Content-Type":
          request.headers.get("content-type") ?? "application/json",
      },
      body,
      cache: "no-store",
    });

    const data = await response.text();

    const res = new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ?? "application/json",
      },
    });

    if (refreshData.refreshToken) res.cookies.set("refreshToken", refreshData.refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });

    res.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    return res;
  }

  const data = await response.text();

  return new NextResponse(data, {
    status: response.status,
    headers: {
      "Content-Type":
        response.headers.get("content-type") ?? "application/json",
    },
  });
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
