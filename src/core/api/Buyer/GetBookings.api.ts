import { BookingResponse } from "@/core/types/buyer/IBooking";
import { cookies } from "next/headers";


interface GetBookingsParams {
  page?: number;
  limit?: number;
  sort?: "created_at" | "updated_at" | "check_in_date" | "check_out_date";
  order?: "ASC" | "DESC";
  house_id?: number;
}

export async function getBookings({
  page = 1,
  limit = 10,
  sort = "created_at",
  order = "DESC",
  house_id,
}: GetBookingsParams = {}): Promise<BookingResponse> {
  const cookieStore = await cookies();

  const query = new URLSearchParams();

  query.set("page", String(page));
  query.set("limit", String(limit));
  query.set("sort", sort);
  query.set("order", order);

  if (house_id) {
    query.set("house_id", String(house_id));
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/bookings?${query.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${cookieStore.get("accessToken")?.value}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return response.json();
}