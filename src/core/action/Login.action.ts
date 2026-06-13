"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { LoginApiResponse } from "../types/ILogin";
import { loginApi } from "../api/auth/Login.api";

export type ActionState = {
  success?: boolean;
  error?: string;
  message?: string;
};

export async function loginAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = formData.get("email")?.toString().trim() || "";
  const password = formData.get("password")?.toString().trim() || "";

  if (prevState?.error) {
    prevState.error = undefined;
  }

  if (!email || !password) {
    return { ...prevState, error: "ایمیل و رمز عبور الزامی هستند." };
  }

  try {
    const data: LoginApiResponse = await loginApi({ email, password });

    const cookieStore = await cookies();

    const accessTokenMaxAge = 60 * 15;
    const refreshTokenMaxAge = 60 * 60 * 24 * 30;

    // ✅ exp رو از توکن بخون
    const decoded = jwt.decode(data.accessToken) as { exp: number } | null;

    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: accessTokenMaxAge,
    });

    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: refreshTokenMaxAge,
    });

    cookieStore.set("isLoggedIn", "true", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: refreshTokenMaxAge,
    });

    // ✅ کوکی کمکی برای interceptor که بتونه exp رو از client بخونه
    if (decoded?.exp) {
      cookieStore.set("accessTokenExpiry", String(decoded.exp), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: accessTokenMaxAge,
      });
    }

    return { ...prevState, success: true, message: "خوش آمدید" };
  } catch (error: any) {
    console.error("Login action error:", error);
    return { ...prevState, error: error.message || "خطا در ورود" };
  }
}
