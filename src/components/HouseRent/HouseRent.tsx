"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { House } from './Content/Hosues'; // مطمئن شوید این مسیر درست است
import FiltersSection from './Filter/FiltersSection';
import BreadCrumb from './AddressPage/BreadCrumb';
import HosueList from './Content/HousesList';
import Pagination from './Content/Pagination/Pagination';

const HouseRentContent = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const [houses, setHouses] = useState<House[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const housesPerPage = 10;
  const totalPages = Math.ceil(totalCount / housesPerPage);

  useEffect(() => {
    const getHouses = async () => {
      setIsLoading(true);
      try {
        const apiUrl = `http://next.genzuni.website/api/houses?page=${currentPage}&limit=${housesPerPage}`;
        const res = await fetch(apiUrl);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        // اضافه کردن Type Assertion برای data
        const data = await res.json() as { houses?: House[]; totalCount?: number };

        // log =====
        console.log("--- پاسخ دریافتی از API ---");
        console.log("کل داده‌ها:", data);
        console.log("لیست خانه‌ها:", data.houses);
        ////

        const validHouses = (data.houses || []).filter((house: House) => {
          
          return house && house.id && house.title;
        });

      

        setHouses(validHouses); 
        setTotalCount(data.totalCount || 0);

      } catch (err) {
        console.error("Fetch Error:", err);
        setHouses([]);
        setTotalCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    getHouses();
  }, [currentPage]);

  return (
    <div className='flex justify-center flex-wrap gap-6.5' dir='rtl'>
      <BreadCrumb />
      <FiltersSection />

      {isLoading ? (
        <div className='w-full flex justify-center items-center h-140'>
          <p className='text-lg text-gray-600'>در حال بارگذاری...</p>
        </div>
      ) : (
        <>
          <HosueList houses={houses} />

          {totalPages > 1 && (
            <div className="w-full mt-8 flex justify-center border-none">
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

const HouseRentPage = () => {
  return (
    <Suspense fallback={<div>در حال بارگذاری اولیه...</div>}>
      <HouseRentContent />
    </Suspense>
  );
};

export default HouseRentPage;
