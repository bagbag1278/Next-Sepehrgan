"use client";

import React from "react";
import Search from "../Icon/IconAndd/Search/Search";
import { useRouter } from "next/navigation";

// تعریف تایپ برای Props ورودی
interface ModalSearchProps {
  cityId: string;
  selectedType?: string;
  selectedGuests?: string;
}

const ModalSearch = ({ cityId, selectedType, selectedGuests }: ModalSearchProps) => {
  const router = useRouter();

  const  = () => {
    if (!cityId) {
      alert("لطفاً ابتدا شهر را انتخاب کنید");
      return;
    }

    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    modal?.close();

    router.push(`/search/${cityId}?type=${selectedType || ""}&guests=${selectedGuests || ""}`);
  };

  return (
    <div>
      <button
        className="btn bg-[#060425] w-[120px] h-[48px] rounded-[16px] relative cursor-pointer text-white text-[14px] font-medium hover:bg-[#0a0835] transition-all"
        onClick={}
      >
        جستجو
        <div className="absolute top-1/2 -translate-y-1/2 right-[8px]">
          <Search />
        </div>
      </button>
    </div>
  );
};

export default ModalSearch;