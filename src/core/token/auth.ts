import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
    id: number;
    email: string;
    role: string;
    name: string;
    profilePicture: string | null;
    exp?: number;
}

// چقدر مونده به expire (به ثانیه)
const TOKEN_REFRESH_THRESHOLD = 2 * 60; // 2 دقیقه

export async function getUserInfo(): Promise<DecodedToken | null> {
    const cookieStore = await cookies();

    const token = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    // اگه هیچ توکنی وجود نداشت
    if (!token && !refreshToken) {
        return null;
    }

    // بررسی access token
    if (token) {
        const decoded = jwt.decode(token) as DecodedToken | null;

        if (decoded && typeof decoded.exp === "number") {
            const timeLeft =
                decoded.exp - Math.floor(Date.now() / 1000);

            // هنوز معتبره و بیشتر از 2 دقیقه مونده
            if (timeLeft > TOKEN_REFRESH_THRESHOLD) {
                return decoded;
            }
        }
    }

    // اگه refresh token نداریم
    if (!refreshToken) {
        return null;
    }

    try {
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
            }
        );

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        const newAccessToken = data.accessToken;

        // فقط در Route Handler یا Server Action کار می‌کند
        cookieStore.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 15,
        });

        return jwt.decode(newAccessToken) as DecodedToken | null;
    } catch (error) {
        console.error("Refresh token error:", error);
        return null;
    }
}