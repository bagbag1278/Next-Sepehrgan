import { cookies } from "next/headers";

export async function serverFetch(
  path: string,
  options?: RequestInit
): Promise<Response> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...options?.headers,
      },
      cache: "no-store",
    }
  );

  return response;
}