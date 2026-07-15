import type { Metadata } from "next";
import HouseRent from '@/components/HouseRent/HouseRent';

export const metadata: Metadata = {
  title: "اجاره خانه",
  description: "جستجو و رزرو آنلاین خانه، ویلا و آپارتمان در رهن کده با بهترین قیمت.",
  openGraph: {
    title: "اجاره خانه",
    description: "جستجو و رزرو آنلاین خانه، ویلا و آپارتمان در رهن کده.",
    type: "website",
  },
};

const HouseRentPage = () => {
  return (
    <div>
      <HouseRent />
    </div>
  );
};

export default HouseRentPage;