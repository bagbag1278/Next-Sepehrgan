"use client";
import { useState } from "react";
import {
  HiOutlineCreditCard,
  HiOutlineInformationCircle,
  HiOutlineTrash,
} from "react-icons/hi";
import HouseDetailModal from "./HouseDetailModal";
const ManegeHouseDrop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className="">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-5.5 w-5 mr-16 mt-2 cursor-pointer"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.68777 10.3125V9.68754M10.3128 10.3125V9.68754M9.68777 16.1459V15.5209M10.3128 16.1459V15.5209M9.68777 4.47921V3.85421M10.3128 4.47921V3.85421M10.0003 9.1665C10.4606 9.1665 10.8337 9.5396 10.8337 9.99984C10.8337 10.4601 10.4606 10.8332 10.0003 10.8332C9.54009 10.8332 9.16699 10.4601 9.16699 9.99984C9.16699 9.5396 9.54009 9.1665 10.0003 9.1665ZM10.0003 14.9998C10.4606 14.9998 10.8337 15.3729 10.8337 15.8332C10.8337 16.2934 10.4606 16.6665 10.0003 16.6665C9.54009 16.6665 9.16699 16.2934 9.16699 15.8332C9.16699 15.3729 9.54009 14.9998 10.0003 14.9998ZM10.0003 3.33317C10.4606 3.33317 10.8337 3.70627 10.8337 4.1665C10.8337 4.62674 10.4606 4.99984 10.0003 4.99984C9.54009 4.99984 9.16699 4.62674 9.16699 4.1665C9.16699 3.70627 9.54009 3.33317 10.0003 3.33317Z"
            stroke="#060425"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div
        className={`absolute bg-[#f5f5f5] px-4 py-4.75 ease-out transition-transform duration-300 size-37.5 rounded-2xl shadow-[0_0_15px] shadow-blue-300/30
          ${
            isOpen
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible"
          }`}
      >
        <div className="h-full flex flex-col gap-4 ">
          {/*  */}
          <div className="h-6 hover:h-8 items-center flex gap-2 opacity-80 text-[13px] cursor-pointer rounded-lg hover:pr-2 hover:bg-blue-300 hover:opacity-100 hover:text-white transition-all duration-150">
            <HiOutlineCreditCard size={24} />
            پرداخت
          </div>
          <div
            onClick={() => {
              setIsModalOpen(true);
              setIsOpen(false);
            }}
            className="h-6 hover:h-8 items-center flex gap-2 opacity-80 text-[13px] cursor-pointer rounded-lg hover:pr-2 hover:bg-blue-300 hover:opacity-100 hover:text-white transition-all duration-150"
          >
            <HiOutlineInformationCircle size={24} />
            جزئیات
          </div>
          <div className="h-6 hover:h-8 text-red-100 items-center flex gap-2 opacity-80 text-[13px] cursor-pointer rounded-lg hover:pr-2 hover:opacity-100 hover:bg-red-100 hover:text-white transition-all duration-150">
            <HiOutlineTrash size={24} />
            حذف
          </div>
        </div>
      </div>
      <HouseDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ManegeHouseDrop;
