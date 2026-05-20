// core/api/auth.ts
import { ForgotPasswordRequestBody, ForgotPasswordRequestResponse } from "../types/auth";

export async function forgotPasswordRequestApi(
  body: ForgotPasswordRequestBody
): Promise<ForgotPasswordRequestResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgot-password/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "خطا در ارسال درخواست");
  }

  return data;
}
