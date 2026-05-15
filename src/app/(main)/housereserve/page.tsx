import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { fetchHouses, House } from "@/core/api/house";
import HouseReserveClient from "@/components/FastReserve/HouseReserveClient";

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
    <div dir="rtl" className="relative mx-auto">
      <div className="h-5.5 absolute top-6 right-24">
        <Breadcrumbs />
      </div>

      <HouseReserveClient initialHouses={housesData} />
    </div>
  );
};

export default HouseReservePage;
