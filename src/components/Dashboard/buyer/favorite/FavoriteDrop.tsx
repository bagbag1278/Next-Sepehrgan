"use client";

import { deleteFavorite } from "@/core/api/Buyer/DeleteFavorite.api";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

interface FavoriteDropProps {
  favoriteId: number;
}

const FavoriteDrop = ({ favoriteId }: FavoriteDropProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteFavorite(favoriteId);

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mr-44 mt-2 cursor-pointer"
      >
        <PiDotsThreeOutlineVerticalFill />
      </button>

      <div
        className={`absolute right-25 z-10 bg-[#f5f5f5] dark:bg-slate-400 px-4 py-4.75 ease-out transition-transform duration-300 w-37.5 h-27.5 rounded-2xl shadow-[0_0_15px] shadow-blue-300/30
        ${
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
        <div className="h-full flex flex-col gap-4">
          <div className="h-6 hover:h-8 items-center flex gap-2 opacity-80 text-[13px] cursor-pointer rounded-lg hover:pr-2 hover:bg-blue-300 hover:opacity-100 hover:text-white transition-all duration-150">
            <HiOutlinePlus size={24} />
            رزرو
          </div>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="h-6 hover:h-8 text-red-100 items-center flex gap-2 opacity-80 text-[13px] cursor-pointer rounded-lg hover:pr-2 hover:opacity-100 hover:bg-red-100 hover:text-white transition-all duration-150"
          >
            <HiOutlineTrash size={24} />
            {loading ? "در حال حذف..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteDrop;
