import FilterButton from "@/components/FastReserve/FilterButton";
import ProductHouse from "@/components/FastReserve/ProductHouse";
import Map from "@/components/Map/Map";
import React from "react";

const HouseReservePage = () => {
  return (
    <div
      dir="rtl"
      className="border-2 border-red-500 relative w-360 mx-auto flex justify-between"
    >
      <div className="h-12 absolute right-30 top-17.5 flex justify-between gap-4">
        <FilterButton/>
        <form action="">
          <input
            type="search"
            name="house"
            placeholder="مقصدت کجاست ...."
            className="w-126.25 h-12 text-sm border border-blue-300/70 py-1 px-4 outline-0 text-blue-300 rounded-2xl"
          />
          <label htmlFor="house"></label>
        </form>
      </div>
      <div dir="ltr" className="w-177.5 h-174 border-2 scroll-smooth custom-div-scrollbar  flex flex-wrap gap-6 border-green-100 overflow-y-auto mt-39 mr-22.25">
        <ProductHouse/>
        <ProductHouse/>
        <ProductHouse/>
        <ProductHouse/>
      </div>
      <div className="border-blue-100 border-2 w-[43%] h-209 mt-6 rounded-tl-lg rounded-br-lg rounded-bl-[42px] rounded-tr-[42px] drop-shadow-blue-300">
        {/* <Map/> */}
      </div>
    </div>
  );
};

export default HouseReservePage;
