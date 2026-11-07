import { apiUrl } from "@/core/api/baseUrl";

export async function GET(request: Request) {
  const incomingUrl = new URL(request.url);
  const response = await fetch(`${apiUrl("comments")}${incomingUrl.search}`, {
    cache: "no-store",
  });
  return new Response(await response.text(), {
    status: response.status,
    headers: { "Content-Type": response.headers.get("Content-Type") ?? "application/json" },
  });
}
