import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];

export async function middleware(
  request: NextRequest
) {
  const accessToken =
    request.cookies.get("accessToken")?.value;

  const refreshToken =
    request.cookies.get("refreshToken")?.value;

  const isProtectedRoute =
    protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // هیچ توکنی وجود ندارد
  if (!accessToken && !refreshToken) {
    const loginUrl = new URL(
      "/login",
      request.url
    );

    loginUrl.searchParams.set(
      "callbackUrl",
      request.url
    );

    return NextResponse.redirect(loginUrl);
  }

  // accessToken تمام شده ولی refreshToken وجود دارد
  if (!accessToken && refreshToken) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            refreshToken,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Refresh failed");
      }

      const data = await response.json();

      const res = NextResponse.next();

      res.cookies.set(
        "accessToken",
        data.accessToken,
        {
          httpOnly: true,
          secure:
            process.env.NODE_ENV ===
            "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        }
      );

      return res;
    } catch {
      const loginUrl = new URL(
        "/login",
        request.url
      );

      loginUrl.searchParams.set(
        "callbackUrl",
        request.url
      );

      return NextResponse.redirect(
        loginUrl
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};