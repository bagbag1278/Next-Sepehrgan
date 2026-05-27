// components/DetailModalHotel/DetailModalHotel.tsx
"use client";
import { X, Calendar, Home, MapPin, Star, DollarSign, Hash, Image, Tag } from "lucide-react";

interface DetailModalHotelProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: any;
}

const DetailModalHotel = ({ isOpen, onClose, hotel }: DetailModalHotelProps) => {
  if (!isOpen || !hotel) return null;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("fa-IR");
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "فعال";
      case "pending": return "در انتظار";
      default: return "غیرفعال";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "pending": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      default: return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* هدر */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 rounded-t-3xl border-b border-gray-200 dark:border-gray-700 p-5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">جزئیات هتل</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* تصاویر */}
          {hotel.photos && hotel.photos.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Image size={18} className="text-[#0887CAB2]" />
                <h3 className="font-bold">تصاویر هتل</h3>
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {hotel.photos.slice(0, 4).map((photo: string, idx: number) => (
                  <img key={idx} src={photo} alt={`hotel-${idx}`} className="w-20 h-20 rounded-xl object-cover" />
                ))}
              </div>
            </div>
          )}

          {/* اطلاعات پایه */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Home size={18} className="text-[#0887CAB2]" />
              <h3 className="font-bold">اطلاعات هتل</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">نام هتل</span>
                <span className="font-medium">{hotel.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">آدرس</span>
                <span className="text-left">{hotel.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">امتیاز</span>
                <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500 fill-yellow-500"/>{hotel.rate}</span>
              </div>
            </div>
          </div>

          {/* قیمت */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign size={18} className="text-[#0887CAB2]" />
              <h3 className="font-bold">قیمت</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">قیمت هر شب</span>
                <span className="font-bold text-green-600">{hotel.price.toLocaleString()} تومان</span>
              </div>
              {hotel.discounted_price && (
                <div className="flex justify-between">
                  <span className="text-gray-500">قیمت با تخفیف</span>
                  <span className="text-gray-400 line-through">{hotel.discounted_price.toLocaleString()} تومان</span>
                </div>
              )}
            </div>
          </div>

          {/* وضعیت و تاریخ ایجاد */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">وضعیت</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(hotel.status)}`}>
                {getStatusText(hotel.status)}
              </span>
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-gray-500">تاریخ ثبت</span>
              <span>{formatDate(hotel.created_at)}</span>
            </div>
          </div>
        </div>

        {/* فوتر */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-5">
          <button onClick={onClose} className="w-full py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-all">
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModalHotel;