"use server";

import { cookies } from "next/headers";
import { loginApi } from "../api/Login.api";

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
    
    // ✅ دیباگ - ببین data چی داره
    console.log("🔵 loginApi response:", JSON.stringify(data, null, 2));
    console.log("🔵 data.user:", data.user);
    console.log("🔵 data.accessToken:", data.accessToken);

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

    return { 
      success: true, 
      message: "خوش آمدید",
      accessToken: data.accessToken,
      user: data.user  // اگر data.user undefined باشد، اینجا undefined می‌شود
    };
    
  } catch (error: any) {
    console.error("Login action error:", error);
    return { success: false, error: error.message || "خطا در ورود" };
  }
}