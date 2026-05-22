"use client";

import React, { useEffect, useState } from 'react'
import BreadCrumb from './AddressPage/BreadCrumb'
import Filters from './Filter/FiltersSection'
import Content from './Content/HousesList'

const HouseRent = () => {
  const [houses, setHouses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getHouses = async () => {
      try {
        const res = await fetch("http://next.genzuni.website/api/houses");

        const data = await res.json();
        setHouses(data.houses || []);
      } catch (err) {
        console.error("Fetch Error:", err);

        setError("متأسفانه این بخش در حال حاضر در دسترس نیست. لطفاً بعداً دوباره امتحان کنید.");
      }
    };
    getHouses();
  }, []);

  if (error) {
    return (
      <div className='w-full flex justify-center items-center h-140'>
        <p className='text-red-500'>{error}</p>
      </div>
    );
  }

  if (houses.length === 0) {
    return (
      <div className='w-full flex justify-center items-center h-140'>
        <p>در حال بارگذاری...</p>
      </div>
    );
  }
  return (
    <div className='flex justify-center flex-wrap gap-6.5' dir='rtl'>
{/* filter house +++== */}
      <BreadCrumb />
      <Filters />
{/* //////////// */}

{/* houses ++++++++ */}
      <Content
        houses={houses}
      />
      
    </div>
  )
}

export default HouseRent