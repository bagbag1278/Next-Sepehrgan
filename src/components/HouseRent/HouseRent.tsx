"use client";

import React, { useEffect, useState } from 'react';
import BreadCrumb from './AddressPage/BreadCrumb';
import Filters from './Filter/FiltersSection';
import Content from './Content/HousesList'; // این همون HousesList هست که شما داشتید
import Pagination from './Content/Pagination/Pagination';

// Interface House باید اینجا یا در یک فایل مشترک تعریف شود
interface House {
  id: number;
  title: string;
  address: string;
  price: string;
  photos?: string[] | null;
  tags?: string[];
  rooms?: number;
  bathrooms?: number;
  parking?: number;
  capacity?: number;
}

interface ApiResponse {
  houses: House[];
  totalCount: number;
}

const HouseRent: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, seterror] = useState(null)

  const housesPerPage = 10; // تعداد خانه‌ها در هر صفحه
  const totalPages = Math.ceil(totalCount / housesPerPage);

  useEffect(() => {
    const getHouses = async () => {
      setIsLoading(true);
      try {
        // ساخت URL با پارامترهای صفحه و محدودیت
        const apiUrl = `http://next.genzuni.website/api/houses?page=${currentPage}&limit=${housesPerPage}`;
        const res = await fetch(apiUrl);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: ApiResponse = await res.json();
        setHouses(data.houses || []);
        setTotalCount(data.totalCount || 0); // دریافت totalCount از API

      } catch (err) {
        console.error("Fetch Error:", err);
        setHouses([]); // در صورت خطا، لیست را خالی کن
        setTotalCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    getHouses();
  }, [currentPage]); // فراخوانی مجدد هر بار که currentPage تغییر می‌کند

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // می‌توانید اینجا اسکرول به بالای صفحه را هم اضافه کنید
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='flex justify-center flex-wrap gap-6.5' dir='rtl'>
      <BreadCrumb />
      <Filters />

      {/* نمایش وضعیت بارگذاری یا خطا */}
      {isLoading && (
        <div className='w-full flex justify-center items-center h-140'>
          <p className='text-lg text-gray-600'>در حال بارگذاری...</p>
        </div>
      )}
     

      {/* نمایش لیست خانه‌ها در صورت عدم خطا و اتمام بارگذاری */}
     
        <>
          <Content houses={houses} />

          {/* نمایش Pagination فقط در صورتی که تعداد صفحات بیشتر از 1 باشد */}
          {totalPages > 1 && (
            <div className="w-full mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                // onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
    
    </div>
  );
};

export default HouseRent;
