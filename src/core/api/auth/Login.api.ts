import { LoginApiResponse } from "../types/ILogin";

export type LoginRequest = {
  email: string;
  password: string;
};

export async function loginApi(
  payload: LoginRequest,
): Promise<LoginApiResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Login failed");
  }

  return data;
}
