"use client";

import React, { useMemo, useState } from "react";
import FilterModalRes from "./FilterModalRes";
import SearchIconRes from "../../Icon/IconAndd/SearchIconRes";
import { useRouter } from "next/navigation";


const ModalSearchRes = () => {
  const router = useRouter();



  const handleSearch = () => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    modal?.close();
    router.push("/HouseResever");
  };

  return (
    <div>
     
          <input
            onClick={handleSearch}
            type="text"
            placeholder="جستجوی خانه ... "
            readOnly
            className="w-[345px] h-[48px] pr-8 cursor-pointer bg-[#DEDDE1] rounded-2xl absolute dark:bg-[#060425] z-20 overflow-hidden" 
          />
          <div className="absolute z-50 right-76 top-[5px]">
             <FilterModalRes/> 
          </div>
          <div className="z-50 absolute top-3 right-2 ">
            <SearchIconRes/>
          </div>
        
  

        
   
    </div>
  );
};

export default ModalSearchRes;