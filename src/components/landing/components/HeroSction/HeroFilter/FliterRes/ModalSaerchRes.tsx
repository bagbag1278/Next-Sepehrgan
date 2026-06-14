"use client";

import React, { useMemo, useState } from "react";
import FilterModalRes from "./FilterModalRes";
import SearchIconRes from "../../Icon/IconAndd/SearchIconRes";
import { useRouter } from "next/navigation";


const ModalSearchRes = () => {
  const router = useRouter();





  return (
    <div>
     
          <input
            type="text"
            placeholder="جستجوی خانه ... "
            readOnly
            className="w-[345px] h-[48px] pr-8 cursor-pointer bg-[#DEDDE1] rounded-2xl absolute dark:bg-[#060425] z-20 overflow-hidden" 
          />
          <div className="absolute z-20 right-76 top-[5px]">
             <FilterModalRes/> 
          </div>
          <div className="z-30 absolute top-3 right-2 ">
            <SearchIconRes/>
          </div>
        
  

        
   
    </div>
  );
};

export default ModalSearchRes;