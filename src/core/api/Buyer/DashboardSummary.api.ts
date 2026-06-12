import { cookies } from "next/headers";

export async function getDashboardSummary() {
  const cookieStore = await cookies();

  const response = await fetch(
    "http://localhost:3000/api/proxy/dashboard/summary",
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    console.log("STATUS:", response.status);
    console.log("ERROR:", errorText);

    throw new Error(
      `Failed: ${response.status}`
    );
  }

  return response.json();
}