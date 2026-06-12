"use client";
import { useState, useEffect } from "react";
import { X, Home, MapPin, DollarSign, Star, CheckCircle, Clock, Ban } from "lucide-react";

interface EditModalHotelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  hotel: any;
}

const EditModalHotel = ({ isOpen, onClose, onSave, hotel }: EditModalHotelProps) => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [rate, setRate] = useState(0);
  const [status, setStatus] = useState("active");

  useEffect(() => {
    if (hotel) {
      setTitle(hotel.title || "");
      setAddress(hotel.address || "");
      setPrice(hotel.price || 0);
      setRate(hotel.rate || 0);
      setStatus(hotel.status || "active");
    }
  }, [hotel]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ title, address, price, rate, status });
    onClose();
  };

  const statusOptions = [
    { value: "active", label: "فعال", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { value: "pending", label: "در انتظار", icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
    { value: "inactive", label: "غیرفعال", icon: Ban, color: "text-red-600", bg: "bg-red-50" },
  ];

  return (
    <>
      <div className="fixed inset-0 h-full bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#066A9E] px-6 py-5 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">ویرایش هتل</h2>
              <p className="text-blue-100 text-sm mt-0.5">شناسه: #{hotel?.id}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* نام هتل */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">نام هتل</label>
            <div className="relative">
              <Home size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CA]" />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full pr-10 pl-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white"
                placeholder="نام هتل"
              />
            </div>
          </div>

          {/* آدرس */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">آدرس</label>
            <div className="relative">
              <MapPin size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CA]" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pr-10 pl-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white"
                placeholder="آدرس"
              />
            </div>
          </div>

          {/* قیمت */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">قیمت (تومان)</label>
            <div className="relative">
              <DollarSign size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CA]" />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full pr-10 pl-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white"
                placeholder="قیمت"
              />
            </div>
          </div>

          {/* امتیاز */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">امتیاز (۰-۵)</label>
            <div className="relative">
              <Star size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CA]" />
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full pr-10 pl-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white"
                placeholder="امتیاز"
              />
            </div>
          </div>

          <div>
      
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 dark:border-gray-700 p-5 bg-gray-50/50 dark:bg-gray-800/50 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            انصراف
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-xl bg-[#0887CA] hover:bg-[#0778B3] text-white font-medium transition-all shadow-sm"
          >
            ذخیره تغییرات
          </button>
        </div>
      </div>
    </>
  );
};

export default EditModalHotel;