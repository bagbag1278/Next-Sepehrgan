"use server";

import { redirect } from "next/navigation"; // برای ریدایرکت بعد از موفقیت
import { verifyPasswordResetCode } from "../api/auth/verifyPasswordResetCode";

// Type برای ورودی Server Action
interface VerifyCodeServerActionArgs {
  email: string;
  resetCode: string; // کدی که از مرحله قبل داریم
  code: string; // کدی که کاربر وارد می‌کنه
}

// Type برای نتیجه Server Action
interface VerifyCodeServerActionResult {
  success: boolean;
  message?: string;
}

export async function verifyCodeAction(
  prevState: VerifyCodeServerActionResult,
  formData: FormData
): Promise<VerifyCodeServerActionResult> {
  const email = formData.get("email") as string; // ایمیل از فرم (یا بهتره از state والد پاس داده بشه)
  const code = formData.get("verificationCode") as string; // کد تایید از فرم

  // *** نکته مهم: چطور resetCode رو بدست بیاریم؟ ***
  // این قسمت رو باید با توجه به نحوه مدیریت state در کامپوننت والد تکمیل کنی.
  // فرض می‌کنیم email و resetCode رو از طریق یک پارامتر مخفی در فرم یا از state والد داریم.
  // مثال: فرض می‌کنیم 'resetCode' هم در FormData هست (که باید به فرم اضافه بشه).
  const resetCode = formData.get("resetCode") as string;

  if (!email || !code || !resetCode) {
    return { success: false, message: "لطفاً تمام فیلدها را پر کنید." };
  }

  try {
    const result = await verifyPasswordResetCode(email, code);
    // اگر API موفق بود، به مرحله بعدی (مثلاً تنظیم رمز عبور) ریدایرکت می‌کنیم
    // در اینجا resetCode هم به همراه email برای مرحله بعدی لازمه.
    redirect(`/auth/reset-password?email=${encodeURIComponent(email)}&resetCode=${encodeURIComponent(resetCode)}`);

    // یا اگر می‌خوای نتیجه رو برگردونی و کامپوننت مدیریت کنه:
    // return { success: true, message: result.message };

  } catch (error: any) {
    console.error("Error verifying code:", error);
    return { success: false, message: error.message || "کد تایید نامعتبر است." };
  }
}