export interface House {
  id: number; // id عدد هست
  title: string;
  address: string; // آدرس اضافه شده
  photos: string[] | null; // فرض می‌کنیم photos می‌تونه آرایه‌ای از لینک عکس باشه یا null
  rate: string; // rate به صورت رشته هست، ممکنه بخوای به number تبدیل کنی
  discounted_price: string; // قیمت‌ها به صورت رشته هستند
  price: string;
  tags: string | null; // تگ‌ها هم رشته یا null
  last_updated: string; // تاریخ به صورت رشته
  capacity: number;
  location: string; // location هم اضافه شده
  categories: string[] | null; // فرض می‌کنیم categories هم آرایه‌ای یا null باشه
  bathrooms: number;
  parking: number;
  rooms: number;
  yard_type: string | null;
  num_comments: number;
  discount_id: number | null;
  transaction_type: string; // "sell" یا "rent"
  sellerId: number;
  sellerName: string;
  caption: string; // توضیحات کامل‌تر
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

  const apiUrl = new URL("http://next.genzuni.website/api/houses");
  apiUrl.searchParams.append("limit", limit.toString());
  apiUrl.searchParams.append("order", order);
  apiUrl.searchParams.append("sort", sort);

  try {
    const response = await fetch(apiUrl.toString(), {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // تغییر مهم: پاسخ API در یک کلید "houses" قرار داره
    const data = await response.json();
    return data.houses as House[]; // این قسمت رو چک کن که درست باشه
  } catch (error) {
    console.error("Failed to fetch houses:", error);
    return [];
  }
}
