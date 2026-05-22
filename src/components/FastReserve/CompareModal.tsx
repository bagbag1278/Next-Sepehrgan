"use client";
import { X, Bed, Bath, Car, Maximize } from "lucide-react";
import Image from "next/image";
import HomeReserve from "../HouseDetails/icon/Home/HomeReserve";

interface CompareItem {
  id: number;
  title: string;
  price: number;
  rooms: number;
  bathrooms: number;
  parking: number;
  area: number;
  image: string;
  address: string;
}

interface CompareModalProps {
  items: CompareItem[];
  onRemove: (id: number) => void;
  onClose: () => void;
  onClearAll: () => void;
}


const CompareModal = ({ items, onClose }: CompareModalProps) => {
  if (!items.length) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#060425] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl">
        <div className="sticky top-0 bg-white dark:bg-[#060425] p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-xl font-bold text-blue-100">مقایسه ملک‌ها</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {items.length === 2 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-lg transition-shadow"
                >
                  <div className="relative  h-43 mb-4 rounded-lg  dark:bg-gray-800 flex items-center justify-center">
                   
                      <div className="object-cover w-full flex justify-center bg-cover  ">
                        <HomeReserve/>
                      </div>
                    
                  </div>
                  
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {item.address}
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-bold text-xl mb-4">
                    {item.price.toLocaleString("fa-IR")} تومان
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Bed size={16} /> {item.rooms} اتاق
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Bath size={16} /> {item.bathrooms} حمام
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Car size={16} /> {item.parking} پارکینگ
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Maximize size={16} /> {item.area} متر
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>2 ملک برای مقایسه انتخاب نشده است</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareModal;