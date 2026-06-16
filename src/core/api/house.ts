export interface House {
  id: number;
  title: string;
  address: string;
  photos: string[] | null;
  rate: string;
  discounted_price: string;
  price: string;
  tags: string | null;
  last_updated: string;
  capacity: number;
  location: string;
  categories: string[] | null;
  bathrooms: number;
  parking: number;
  rooms: number;
  yard_type: string | null;
  num_comments: number;
  discount_id: number | null;
  transaction_type: string; //
  sellerId: number;
  sellerName: string;
  caption: string;
  bookings: number;
  favoriteId: number | null;
  isFavorite: boolean;
}

interface FetchHousesOptions {
  limit?: number;
  order?: "ASC" | "DESC";
  sort?: string;
}

export async function fetchHouses(
  options?: FetchHousesOptions,
): Promise<House[]> {
  const { limit = 10, order = "DESC", sort = "last_updated" } = options || {};

  const apiUrl = new URL("http://188.121.104.25:3003/api/houses");
  apiUrl.searchParams.append("limit", limit.toString());
  apiUrl.searchParams.append("order", order);
  apiUrl.searchParams.append("sort", sort);

  try {
    const response = await fetch(apiUrl.toString(), {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.houses as House[];
  } catch (error) {
    console.error("Failed to fetch houses:", error);
    return [];
  }
}
