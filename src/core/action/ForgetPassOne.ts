"use server";

import { forgotPasswordRequestApi } from "../api/auth/ForgetPassOne";

export async function forgotPasswordRequestAction(formData: FormData) {
  const email = formData.get("email")?.toString().trim();

  if (!email) {
    return {
      success: false,
      message: "ایمیل الزامی است",
    };
  }

  try {
    const result = await forgotPasswordRequestApi({ email });

    return {
      success: true,
      message: result.message,
      resetCode: result.resetCode,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "خطای نامشخص",
    };
  }
}
