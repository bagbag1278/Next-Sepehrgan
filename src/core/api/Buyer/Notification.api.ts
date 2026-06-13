import { serverFetch } from "@/core/interceptor/serverFetch";


export async function getNotifications(
  userId: number,
  isRead?: string,
  page: number = 1,
  limit: number = 4
) {
  const query = new URLSearchParams();
  query.append("page", String(page));
  query.append("limit", String(limit));
  query.append("sort", "createdAt");
  query.append("order", "DESC");

  if (isRead !== undefined && isRead !== "") {
    query.append("isRead", isRead);
  }

  const response = await serverFetch(
    `/notifications/${userId}?${query.toString()}`
  );

  if (!response.ok) throw new Error("Failed to fetch notifications");
  return response.json();
}