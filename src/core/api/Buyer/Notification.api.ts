import { cookies } from "next/headers";

export async function getNotifications(
  userId: number,
  isRead?: string,
  page: number = 1,
  limit: number = 4
) {
  const cookieStore = await cookies();
  const query = new URLSearchParams();

  query.append("page", String(page));
  query.append("limit", String(limit));
  query.append("sort", "createdAt");
  query.append("order", "DESC");

  if (isRead !== undefined && isRead !== "") {
    query.append("isRead", isRead);
  }

  const response = await fetch(
    `http://localhost:3000/api/proxy/notifications/${userId}?${query.toString()}`,
    {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    }
  );

  if (!response.ok) throw new Error("Failed to fetch notifications");
  return response.json();
}