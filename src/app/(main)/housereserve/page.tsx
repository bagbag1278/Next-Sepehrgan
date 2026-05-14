import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { fetchHouses, House } from "@/core/api/house";
import HouseReserveClient from "@/components/FastReserve/HouseReserveClient";



const ReserveDetails = () => {
  return (
    <div dir="rtl" className="relative w-360 mx-auto flex justify-between">
      <div className="h-5.5 absolute top-6 right-24">
        <Breadcrumbs />
      </div>

      <HouseReserveClient initialHouses={housesData} />
    </div>
  );
};

export default ReserveDetails
