import React from 'react';
import { Star, MapPin, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import HomeReserve from '../../icon/Home/HomeReserve';

const SimilarProperties = () => {
  const properties = [
    {
      id: 1,
      title: "هتل سراوان رانین رشت",
      location: "گیلان ، رشت ، میدان آزادی ....",
      price: "۲۵۰,۰۰۰,۰۰۰ تومان",
      rating: "۴.۹",
      image: "/hotel1.jpg", // جایگزین با آدرس تصویر واقعی
    },
    {
      id: 2,
      title: "هتل سراوان رانین رشت",
      location: "گیلان ، رشت ، میدان آزادی ....",
      price: "۲۵۰,۰۰۰,۰۰۰ تومان",
      rating: "۴.۹",
      image: "/hotel2.jpg",
    },
    {
      id: 3,
      title: "هتل سراوان رانین رشت",
      location: "گیلان ، رشت ، میدان آزادی ....",
      price: "۲۵۰,۰۰۰,۰۰۰ تومان",
      rating: "۴.۹",
      image: "/hotel3.jpg",
    }
  ];

  return (
    <div className="w-full max-w-[430px] mx-auto p-6 rounded-[16px] bg-[#F5F5F5]  shadow-sm border border-[#F1F5F9]" dir="rtl">
      <div className="text-center mb-6">
        <h2 className="text-[#081F62] text-lg font-bold">موارد مشابه</h2>
        <div className="w-24 h-0.5 bg-blue-100 mx-auto mt-2"></div>
      </div>

      <div className="flex flex-col gap-4 ">
        {properties.map((item) => (
          <div 
            key={item.id} 
            className="bg-[#F5F5F5] rounded-[24px]  p-3 flex gap-4 items-center border border-transparent hover:border-blue-200 transition-all cursor-pointer group"
          >
            <div className="relative w-[167px] h-[104px] rounded-lg overflow-hidden">
            <HomeReserve/>
              <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm text-white px-2 py-1 rounded-full flex items-center gap-1 text-[10px]">
                <Star size={10} className="fill-yellow-400 text-yellow-400" />
                <span>{item.rating}</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <h3 className="text-[#060425] text-sm font-bold">{item.title}</h3>
              
              <div className="flex items-center gap-1 text-[#94A3B8] text-[10px]">
                <MapPin size={12} />
                <span className=' '>{item.location}</span>
              </div>

              <div className="text-[#0887CA] text-sm font-black mt-1">
                {item.price}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 flex items-center justify-end gap-1 text-[#0887CA] text-xs font-bold hover:gap-2 transition-all">
        <span>مشاهده تمامی موارد</span>
        <ChevronLeft size={16} />
      </button>
    </div>
  );
};

export default SimilarProperties;