import React from "react";
import { MessageCircle } from "lucide-react";
import ChatIcon from "../../icon/icon/ChatIcon";

const Seller = () => {

  const mockData = {
    sellerName: "علیرضا رضایی",
    date: "۱۸ خرداد ۱۴۰۴",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    mortgagePrice: "۲۵۰,۰۰۰,۰۰۰",
    rentPrice: "۲۵۰,۰۰۰,۰۰۰",
    phoneNumber: "6598***0911",
  };

  return (
    <div className="w-107 h-117  bg-white rounded-[40px] p-13 relative bottom-8 shadow-[0px_10px_40px_rgba(8,135,202,0.1)] flex flex-col justify-center items-center" dir="rtl">
      {/* هدر بخش */}
      <h3 className="text-[#10088F] font-black text-[15px] ">
        اطلاعات قیمت و تماس
      </h3>

      <div className="flex flex-col items-center gap-2 ">
        <div className="w-[60px] h-[60px] rounded-full border-4 border-green-100 overflow-hidden shadow-sm mt-4">
          <img 
            src={mockData.avatar} 
            alt={mockData.sellerName} 
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="text-[#060425] font-bold text-[20px]">
          {mockData.sellerName}
        </h4>
        <span className="text-[#94A3B8] text-[13px] font-medium">
          {mockData.date}
        </span>
      </div>
        <div className="w-[324px] h-2  border mt-5 border-gray-200  ">
        
          </div>
      <div className="w-full h-[1px] bg-gray-100 mb-8"></div>

      <div className="w-full flex flex-col gap-5 mb-10">
        <div className="flex justify-between items-center">
          <span className="text-[#64748B] text-[15px] font-bold">قیمت رهن از</span>
          <div className="flex items-center gap-1">
            <span className="text-[#0887CA] text-[20px] font-black">{mockData.mortgagePrice}</span>
            <span className="text-[#0887CA] text-[13px] font-bold">تومان</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-[#64748B] text-[15px] font-bold">قیمت اجاره از</span>
          <div className="flex items-center gap-1">
            <span className="text-[#0887CA] text-[20px] font-black">{mockData.rentPrice}</span>
            <span className="text-[#0887CA] text-[13px] font-bold">تومان</span>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <button dir="" className="w-79 h-12 bg-[#15977D] hover:bg-[#05b0a1] text-white rounded-[18px] text-[18px] font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-100">
          تماس با {mockData.phoneNumber}
        </button>

    
          <span className=" justify-center flex">گفتگو با فروشنده    <div className=" w-8 h-8 text-white rounded-lg items-center flex justify-center relative bottom-1 mr-2 bg-[#005EA4]" > <ChatIcon /></div> </span>
  

      </div>
    </div>
  );
};

export default Seller;