import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  id: number;
  email: string;
  role: string;
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  phoneNumber: string;
  profilePicture: string | null;
}

// چقدر مونده به expire (به ثانیه)
const TOKEN_REFRESH_THRESHOLD = 2 * 60; // 2 دقیقه

async function withProfile(token: string, decoded: DecodedToken | null) {
  if (!decoded) return null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!response.ok) return decoded;
    const result = await response.json();
    const user = result.user ?? result.data ?? {};
    const firstName = user.firstName ?? decoded.firstName ?? "";
    const lastName = user.lastName ?? decoded.lastName ?? "";
    return {
      ...decoded,
      ...user,
      id: user.id ?? decoded.id,
      role: decoded.role,
      firstName,
      lastName,
      name: user.fullName || [firstName, lastName].filter(Boolean).join(" ") || decoded.name || user.email || decoded.email,
      phone: user.phoneNumber ?? user.phone ?? decoded.phone ?? "",
      phoneNumber: user.phoneNumber ?? user.phone ?? decoded.phoneNumber ?? decoded.phone ?? "",
      profilePicture: user.profilePicture ?? user.avatar ?? decoded.profilePicture ?? null,
    } as DecodedToken;
  } catch {
    return decoded;
  }
}

export async function getUserInfo(): Promise<DecodedToken | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // اگه اصلاً توکنی نیست
  if (!token && !refreshToken) return null;

  // اگه accessToken داریم
  if (token) {
    const decoded = jwt.decode(token) as DecodedToken | null;

    if (decoded?.exp) {
      const timeLeft = decoded.exp - Math.floor(Date.now() / 1000);

      // توکن هنوز معتبره و بیشتر از 2 دقیقه مونده
      if (timeLeft > TOKEN_REFRESH_THRESHOLD) {
        return withProfile(token, decoded);
      }
    }
  }

  // توکن expire شده یا کمتر از 2 دقیقه مونده → refresh
  if (!refreshToken) return null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
        cache: "no-store",
      }
    );

    if (!response.ok) return null;

    const { accessToken } = await response.json();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    return withProfile(accessToken, jwt.decode(accessToken) as DecodedToken | null);
  } catch {
    return null;
  }
}
