import { serverFetch } from "@/core/interceptor/serverFetch";


export async function getDashboardSummary() {
  const response = await serverFetch("/dashboard/summary");

  if (!response.ok) throw new Error(`Failed: ${response.status}`);
  return response.json();
}