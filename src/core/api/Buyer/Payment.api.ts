import { cookies } from "next/headers";

export interface Payment {
  id: number;
  userId: number;
  bookingId: number;
  amount: number;
  description: string;
  status: string;
  paymentUrl: string;
  transactionId: string | null;
  trackingCode: string | null;
  type: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface PaymentsResponse {
  payments: Payment[];
  totalCount: number;
}

export async function getPayments(
  page = 1,
  limit = 10,
  status?: string,
  sort: "amount" | "createdAt" = "createdAt",
  order: "ASC" | "DESC" = "DESC"
) {
  const cookieStore = await cookies();

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort,
    order,
  });

  if (status) {
    query.append("status", status);
  }

  const response = await fetch(
    `http://localhost:3000/api/proxy/payments?${query.toString()}`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("STATUS:", response.status);
    console.error("ERROR:", errorText);
    throw new Error(`Failed to fetch payments: ${response.status}`);
  }

  return response.json() as Promise<PaymentsResponse>;
}