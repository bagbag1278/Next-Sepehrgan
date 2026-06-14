"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { loginApi } from "../api/auth/Login.api";

export type ActionState = {
  success: boolean;
  error?: string;
  message?: string;
  accessToken?: string;
  user?: any;
};

export async function loginAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = formData.get("email")?.toString().trim() || "";
  const password = formData.get("password")?.toString().trim() || "";

  if (!email || !password) {
    return { success: false, error: "ایمیل و رمز عبور الزامی هستند." };
  }

  try {
    const data = await loginApi({ email, password });

    const cookieStore = await cookies();
    const accessTokenMaxAge = 60 * 15;
    const refreshTokenMaxAge = 60 * 60 * 24 * 30;
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

    // ✅ isLoggedIn قبل از return ست میشه
    cookieStore.set("isLoggedIn", "true", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: refreshTokenMaxAge,
    });

    if (decoded?.exp) {
      cookieStore.set("accessTokenExpiry", String(decoded.exp), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: accessTokenMaxAge,
      });
    }

    // ✅ یه return در آخر
    return {
      success: true,
      message: "خوش آمدید",
      accessToken: data.accessToken,
      user: data.user,
    };

  } catch (error: any) {
    console.error("Login action error:", error);
    return { success: false, error: error.message || "خطا در ورود" };
  }
}