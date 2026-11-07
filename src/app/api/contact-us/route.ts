import { apiUrl } from "@/core/api/baseUrl";

export async function POST(request: Request) {
  const response = await fetch(apiUrl("contact-us"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: await request.text(),
    cache: "no-store",
  });
  return new Response(await response.text(), {
    status: response.status,
    headers: { "Content-Type": response.headers.get("Content-Type") ?? "application/json" },
  });
}
