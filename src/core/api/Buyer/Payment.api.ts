import { serverFetch } from "@/core/interceptor/serverFetch";

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
  page = 1, limit = 10, status?: string,
  sort: "amount" | "createdAt" = "createdAt",
  order: "ASC" | "DESC" = "DESC"
) {
  const query = new URLSearchParams({ page: String(page), limit: String(limit), sort, order });
  if (status) query.append("status", status);

  const response = await serverFetch(`/payments?${query.toString()}`);

  if (!response.ok) throw new Error(`Failed: ${response.status}`);
  return response.json() as Promise<PaymentsResponse>;
}