"use server";

import { getUserInfo } from "@/core/token/auth";
import { updateUser } from "../api/Buyer/UpdateUser.api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updateUserAction(prevState: unknown, formData: FormData) {
  const user = await getUserInfo();

  if (!user) {
    return { success: false, message: "کاربر یافت نشد" };
  }

  let success = false;

  try {
    await updateUser(user.id, {
      firstName: formData.get("name")?.toString() || "",
      lastName: formData.get("lastname")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phoneNumber: formData.get("phone")?.toString() || "",
    });

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (refreshToken) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
          cache: "no-store",
        }
      );

      if (response.ok) {
        const { accessToken, refreshToken: rotatedRefreshToken } = await response.json();
        if (rotatedRefreshToken) cookieStore.set("refreshToken", rotatedRefreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
        cookieStore.set("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 15,
        });
      }
    }

    success = true;
  } catch {
    return { success: false, message: "خطا در بروزرسانی اطلاعات" };
  }


  if (success) {
    redirect("/dashboard/buyer/buyerinfo");
  }
}