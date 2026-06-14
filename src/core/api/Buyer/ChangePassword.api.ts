import { cookies } from "next/headers";

export async function changePassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  const cookieStore = await cookies();

  const response = await fetch(
    `http://localhost:3000/api/proxy/users/change-password`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to change password");
  }

  return response.json();
}