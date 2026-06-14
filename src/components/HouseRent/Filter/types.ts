// types/filters.ts
export interface FilterParams {
  page: number;
  limit: number;
  type?: string;
  location?: string;
  sort?: string;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const transactionTypes = [
  { value: "buy", label: "خرید" },
  { value: "sell", label: "فروش" },
  { value: "rent", label: "اجاره" },
  { value: "hotel", label: "رزرو هتل" },
  { value: "tour", label: "تور" },
  { value: "investment", label: "سرمایه‌گذاری" },
];

export const locations = [
  { value: "tehran", label: "تهران" },
  { value: "mashhad", label: "مشهد" },
  { value: "isfahan", label: "اصفهان" },
  { value: "shiraz", label: "شیراز" },
  { value: "tabriz", label: "تبریز" },
  { value: "kish", label: "کیش" },
  { value: "mazandaran", label: "مازندران" },
  { value: "gilan", label: "گیلان" },
  { value: "bushehr", label: "بوشهر" },
  { value: "bandarabbas", label: "بندرعباس" },
  { value: "ramsar", label: "رامسر" },
  { value: "chalus", label: "چالوس" },
];

export const sortOptions = [
  { value: "newest", label: "جدیدترین" },
  { value: "price_asc", label: "ارزان‌ترین" },
  { value: "price_desc", label: "گران‌ترین" },
  { value: "rating_desc", label: "بالاترین امتیاز" },
];