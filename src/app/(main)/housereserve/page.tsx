import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { fetchHouses, House } from "@/core/api/house";
import HouseReserveClient from "@/components/FastReserve/HouseReserveClient";

export const metadata: Metadata = {
  title: "رزرو سریع",
  description: "رزرو سریع ویلا، هتل و آپارتمان در رهن کده. بهترین اقامتگاه‌ها را با بهترین قیمت پیدا کنید.",
  openGraph: {
    title: "رزرو سریع",
    description: "رزرو سریع ویلا، هتل و آپارتمان در رهن کده.",
    type: "website",
  },
};

const HouseReservePage = async () => {
  let housesData: House[] = [];

  try {
    housesData = await fetchHouses({
      limit: 10,
      order: "DESC",
      sort: "last_updated",
    });
  } catch (error) {
    console.error("Failed to load houses:", error);
  }

  return (
    <div dir="rtl" className="relative mx-auto max-w-360">
      <div className="h-5.5 absolute top-6 right-24">
        <Breadcrumbs />
      </div>
      <HouseReserveClient initialHouses={housesData} />
    </div>
  );
};

export default HouseReservePage;