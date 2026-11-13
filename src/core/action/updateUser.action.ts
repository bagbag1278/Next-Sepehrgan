"use server";

import { getUserInfo } from "@/core/token/auth";
import { updateUser } from "../api/DashboardSeller/updateUser";
import { revalidatePath } from "next/cache";

type UpdateUserActionState =
  | { success: true; message: string; user: Record<string, any> }
  | { success: false; message: string };

export async function updateUserAction(
  _prevState: unknown,
  formData: FormData,
): Promise<UpdateUserActionState> {
  const user = await getUserInfo();

  if (!user) {
    return { success: false, message: "کاربر یافت نشد" };
  }

  try {
    const updated = await updateUser(user.id, {
      firstName: formData.get("name")?.toString().trim() || "",
      lastName: formData.get("lastname")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      phoneNumber: formData.get("phone")?.toString().trim() || "",
    });
    revalidatePath("/dashboard/buyer/buyerinfo");
    return {
      success: true,
      message: "اطلاعات با موفقیت بروزرسانی شد",
      user: updated.user ?? updated.data,
    };
  } catch {
    return { success: false, message: "خطا در بروزرسانی اطلاعات" };
  }
}
