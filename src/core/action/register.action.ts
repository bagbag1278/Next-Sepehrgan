"use server";

import { cookies } from "next/headers";
import { CompleteRegistrationRequest } from "../types/IRegister";
import { completeRegistrationApi } from "../api/auth/Register.api";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export async function registerStepOneClientAction(formData: FormData): Promise<{
  success: boolean;
  message: string | null;
  tempUserId?: number;
  verificationCode?: string;
}> {
  const email = String(formData.get("email") || "").trim();

  if (!email) {
    return { success: false, message: "لطفاً ایمیل خود را وارد کنید." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "فرمت ایمیل نامعتبر است." };
  }

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!data.tempUserId || !data.verificationCode) {
      return {
        success: false,
        message: data.message || "خطا در ارسال کد ثبت‌نام.",
      };
    }

    // ذخیره در کوکی (اختیاری، برای امنیت بیشتر)
    const cookieStore = await cookies();
    cookieStore.set("tempUserId", String(data.tempUserId), {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 15,
    });

    return {
      success: true,
      message: "کد با موفقیت ارسال شد.",
      tempUserId: data.tempUserId,
      verificationCode: data.verificationCode,
    };
  } catch (error) {
    console.error("Server Action Error:", error);
    return {
      success: false,
      message: "خطای داخلی سرور. لطفاً بعداً دوباره تلاش کنید.",
    };
  }
}

export async function registerStepTwoClientAction(
  formData: FormData,
): Promise<{ success: boolean; message: string | null }> {
  const tempUserId = String(formData.get("tempUserId") || "");
  const verificationCode = String(formData.get("verificationCode") || "");

  if (!tempUserId || !verificationCode) {
    return { success: false, message: "اطلاعات ناقص است." };
  }

  try {
    const response = await fetch(`${API_URL}/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tempUserId: Number(tempUserId),
        verificationCode,
      }),
    });

    const data = await response.json();

    // به جای data.success از response.ok استفاده کن
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "کد وارد شده نامعتبر است.",
      };
    }

    const cookieStore = await cookies();
    if (data.registrationToken) cookieStore.set("registrationToken", data.registrationToken, { path: "/", httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 15 });
    cookieStore.delete("tempUserId");

    return {
      success: true,
      message: "تایید با موفقیت انجام شد.",
    };
  } catch (error) {
    console.error("Server Action Error:", error);
    return {
      success: false,
      message: "خطای داخلی سرور.",
    };
  }
}

//
export async function completeRegistrationAction(
  data: CompleteRegistrationRequest,
) {
  try {
    const cookieStore = await cookies();
    const registrationToken = cookieStore.get("registrationToken")?.value;
    if (!registrationToken) return { success: false, message: "مجوز تکمیل ثبت‌نام منقضی شده؛ ایمیل را دوباره تأیید کنید." };
    const result = await completeRegistrationApi({ ...data, registrationToken });
    cookieStore.delete("registrationToken");
    if (result.accessToken && result.refreshToken) {
      cookieStore.set("accessToken", result.accessToken, { path: "/", httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 15 });
      cookieStore.set("refreshToken", result.refreshToken, { path: "/", httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 30 });
      cookieStore.set("isLoggedIn", "true", { path: "/", httpOnly: false, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 30 });
    }
    return {
      success: true,
      data: result,
      message: result.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
