const BASE_URL = process.env.BASE_URL!;

export interface HouseSearchParams {
  page?: number;
  limit?: number;
  transactionType?: "rental" | "mortgage" | "reservation" | "direct_purchase";
  search?: string;
  order?: "ASC" | "DESC";
  sort?: "last_updated" | "price" | "area" | "created_at";
  propertyType?: "apartment" | "villa" | "house" | "land" | "commercial";
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minRent?: number;
  maxRent?: number;
  minMortgage?: number;
  maxMortgage?: number;
  minArea?: number;
  maxArea?: number;
}

export async function searchHouses(params: HouseSearchParams) {
  const cleanParams: Record<string, string> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      cleanParams[key] = String(value);
    }
  }

  const query = new URLSearchParams(cleanParams);
  const url = `${BASE_URL}/api/houses${query.size > 0 ? `?${query}` : ""}`;

  console.log("searchHouses URL:", url);

  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    console.error("searchHouses failed:", res.status, text);
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}