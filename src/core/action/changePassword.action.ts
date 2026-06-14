"use server";

import { changePassword } from "../api/Buyer/ChangePassword.api";

export async function changePasswordAction(formData: FormData) {
  const currentPassword = formData.get("currentPassword")?.toString() || "";
  const newPassword = formData.get("newPassword")?.toString() || "";
  const confirmPassword = formData.get("confirmPassword")?.toString() || "";

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { success: false, message: "همه فیلدها را پر کنید" };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, message: "رمز عبور جدید و تکرار آن یکسان نیستند" };
  }

  try {
    await changePassword({ currentPassword, newPassword });
    return { success: true, message: "رمز عبور با موفقیت تغییر یافت" };
  } catch {
    return { success: false, message: "خطا در تغییر رمز عبور" };
  }
}