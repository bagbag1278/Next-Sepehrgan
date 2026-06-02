"use client";
import React from "react";
import { MessageCircle } from "lucide-react";

interface SellerProps {
  sellerName?: string;
  sellerId?: number;
  price?: string;
  discountedPrice?: string;
  lastUpdated?: string;
}

const Seller = ({ sellerName, sellerId, price, discountedPrice, lastUpdated }: SellerProps) => {
  
  const date = lastUpdated 
    ? new Date(lastUpdated).toLocaleDateString("fa-IR") 
    : "۱۸ خرداد ۱۴۰۴";  

  const avatar = `https://ui-avatars.com/api/?name=${sellerName || 'Admin'}&background=random`;

  return (
    <div className="w-107 max-[600]:w-90 h-117  dark:text-white dark:bg-[#060425] rounded-[40px] p-13 relative shadow-[0px_10px_40px_rgba(8,135,202,0.1)] flex flex-col justify-center items-center" dir="rtl">
      
      <h3 className="text-[#10088F] font-black text-[15px]">
        اطلاعات قیمت و تماس
      </h3>

      <div className="flex flex-col items-center gap-2">
        <div className="w-[60px] h-[60px] rounded-full border-4 border-green-100 overflow-hidden shadow-sm mt-4">
          <img 
            src={avatar} 
            alt={sellerName} 
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="text-[#060425] dark:text-white  font-bold text-[20px]">
          {sellerName || "نام فروشنده"}
        </h4>
        <span className="text-[#94A3B8] text-[13px] font-medium">
          {date}
        </span>
      </div>

      <div className="w-[324px] h-[1px] bg-gray-200 mt-5 mb-8"></div>

      <div className="w-full flex flex-col gap-5 mb-10">
        <div className="flex justify-between items-center">
          <span className="text-[#64748B] text-[15px] font-bold"> قیمت رهن از</span>
          <div className="flex items-center gap-1">
            <span className="text-[#0887CA] text-[20px] font-black">
               {price ? Number(price).toLocaleString() : "توافقی"}
            </span>
            <span className="text-[#0887CA] text-[13px] font-bold">تومان</span>
          </div>
        </div>

        {discountedPrice && discountedPrice !== price && (
          <div className="flex justify-between items-center">
            <span className="text-[#64748B] text-[14px] font-bold"> قیمت اجاره از</span>
            <div className="flex items-center gap-1">
              <span className="text-[#0887CA] text-[18px] font-black">
                {Number(discountedPrice).toLocaleString()}
              </span>
              <span className="text-[#0887CA]  text-[12px] font-bold">تومان</span>
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col gap-4">
        <button className="w-79 max-[600]:w-60 h-12 bg-[#15977D] hover:bg-[#05b0a1] text-white rounded-[18px] text-[18px] font-black transition-all flex items-center justify-center gap-2 ">
       تماس با 6598***0911
        </button>

        <span className="justify-center flex items-center cursor-pointer hover:opacity-80 transition-all">
          گفتگو با فروشنده
          <div className="w-8 h-8 text-white rounded-lg flex items-center justify-center mr-2 bg-[#005EA4]">
<MessageCircle size={20} className="text-white" />
          </div>
        </span>
      </div>
    </div>
  );
};

export default Seller;