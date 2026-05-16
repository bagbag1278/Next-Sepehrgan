"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginApi } from "../api/Login.api";
import { LoginApiResponse } from "../types/ILogin";

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

    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });


    return { ...prevState, success: true, message: "خوش آمدید" };
  } catch (error: any) {
    console.error("Login action error:", error);
    return { ...prevState, error: error.message || "خطا در ورود" };
  }
}
