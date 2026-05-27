// components/DetailBookingModal/DetailBookingModal.tsx
"use client";
import { X, Calendar, Clock, Home, User, Phone, Mail, Hash } from "lucide-react";

interface DetailBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
  userName: string;
  userEmail?: string;
  userPhone?: string;
}

const DetailBookingModal = ({ isOpen, onClose, booking, userName, userEmail, userPhone }: DetailBookingModalProps) => {
  if (!isOpen) return null;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "—";
      return date.toLocaleDateString("fa-IR");
    } catch {
      return "—";
    }
  };

  const formatTime = (dateStr?: string) => {
    if (!dateStr) return "—";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "—";
      return date.toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "—";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "تایید شده";
      case "pending":
        return "در انتظار تایید";
      case "cancelled":
        return "لغو شده";
      default:
        return status;
    }
  };

  // گرفتن تاریخ از هر دو فرمت ممکن
  const getCreatedDate = () => {
    return booking?.createdAt || booking?.created_at;
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-[32px] w-full max-w-[733px] max-h-[90vh] overflow-y-auto relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* هدر */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 rounded-t-[32px] p-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">جزئیات رزرو</h2>
            <button 
              onClick={onClose} 
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* کد رزرو و وضعیت */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">شماره رزرو</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">#{booking?.id}</p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              booking?.status === "confirmed" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
              booking?.status === "pending" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
              "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}>
              {getStatusText(booking?.status)}
            </div>
          </div>

          {/* اطلاعات ملک */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              <Home size={18} className="text-[#0887CAB2]" />
              <h3 className="font-bold text-gray-800 dark:text-white">اطلاعات ملک</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">نام ملک</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white">{booking?.house?.title || "نامشخص"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">قیمت هر شب</p>
                <p className="text-sm font-bold text-green-600 dark:text-green-400">
                  {Number(booking?.house?.price).toLocaleString("fa-IR")} تومان
                </p>
              </div>
            </div>
          </div>

          {/* اطلاعات مسافر */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              <User size={18} className="text-[#0887CAB2]" />
              <h3 className="font-bold text-gray-800 dark:text-white">اطلاعات مسافر</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">نام و نام خانوادگی</span>
                <span className="text-sm font-medium text-gray-800 dark:text-white">{userName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">شماره تماس</span>
                <span className="text-sm text-gray-800 dark:text-white">{userPhone || booking?.sharedMobile || "—"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">ایمیل</span>
                <span className="text-sm text-gray-800 dark:text-white">{userEmail || booking?.sharedEmail || "—"}</span>
              </div>
            </div>
          </div>

          {/* تاریخ و زمان رزرو */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              <Calendar size={18} className="text-[#0887CAB2]" />
              <h3 className="font-bold text-gray-800 dark:text-white">تاریخ رزرو</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">تاریخ</span>
                </div>
                <span className="text-sm text-gray-800 dark:text-white">{formatDate(getCreatedDate())}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">زمان</span>
                </div>
                <span className="text-sm text-gray-800 dark:text-white">{formatTime(getCreatedDate())}</span>
              </div>
            </div>
          </div>

          {/* تاریخ‌های اقامت */}
          {booking?.reservedDates && booking.reservedDates.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                <Hash size={18} className="text-[#0887CAB2]" />
                <h3 className="font-bold text-gray-800 dark:text-white">تاریخ‌های اقامت</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {booking.reservedDates.map((date: string, index: number) => (
                  <span key={index} className="px-3 py-2 bg-white dark:bg-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300">
                    {date}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* سایر مسافران */}
          {booking?.traveler_details && booking.traveler_details.length > 1 && (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                <User size={18} className="text-[#0887CAB2]" />
                <h3 className="font-bold text-gray-800 dark:text-white">سایر مسافران</h3>
              </div>
              <div className="space-y-3">
                {booking.traveler_details.slice(1).map((traveler: any, index: number) => (
                  <div key={index} className="bg-white dark:bg-gray-700 rounded-xl p-3">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {traveler.firstName} {traveler.lastName}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <p>کد ملی: {traveler.nationalId}</p>
                      <p>تاریخ تولد: {traveler.birthDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* قیمت کل */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-5">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">قیمت کل</span>
              <span className="text-xl font-bold text-[#0887CAB2]">
                {Number(booking?.house?.price).toLocaleString("fa-IR")} تومان
              </span>
            </div>
          </div>
        </div>

        {/* فوتر */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-5 rounded-b-[32px]">
          <button 
            onClick={onClose}
            className="w-full py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailBookingModal;