"use server";

import { getUserInfo } from "@/core/token/auth";
import { updateUser } from "../api/Buyer/UpdateUser.api";
import { revalidatePath } from "next/cache";

export async function updateUserAction(formData: FormData) {
  const user = await getUserInfo();

  if (!user) {
    return { success: false, message: "کاربر یافت نشد" };
  }

  try {
    await updateUser(user.id, {
      firstName: formData.get("name")?.toString() || "",
      lastName: formData.get("lastname")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phoneNumber: formData.get("phone")?.toString() || "",
    });

    revalidatePath("/dashboard");

    return { success: true, message: "اطلاعات با موفقیت بروزرسانی شد" };
  } catch {
    return { success: false, message: "خطا در بروزرسانی اطلاعات" };
  }
}