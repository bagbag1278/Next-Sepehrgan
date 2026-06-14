import api from "@/core/interceptor/axiosInstance";

export async function markAllAsRead() {
  const response = await api.put("/notifications/mark-all-as-read");
  return response.data;
}