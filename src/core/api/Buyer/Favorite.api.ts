import { cookies } from "next/headers";

export async function getFavorites(userId: number) {
  const token =
    (await cookies()).get("accessToken")?.value;

  console.log("TOKEN:", token);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/favorites/user/${userId}?page=1&limit=10&order=ASC`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  console.log("STATUS:", response.status);

  const data = await response.json();

  console.log("RESPONSE:", data);

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
}