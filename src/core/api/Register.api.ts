import {
  CompleteRegistrationRequest,
  CompleteRegistrationResponse,
} from "../types/IRegister";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function completeRegistrationApi(
  body: CompleteRegistrationRequest,
): Promise<CompleteRegistrationResponse> {
  const res = await fetch(`${BASE_URL}/auth/complete-registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to complete registration");
  }

  return res.json();
}
