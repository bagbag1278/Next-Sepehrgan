// components/EditBookingModal/EditBookingModal.tsx
"use client";
import { useState, useEffect } from "react";
import { X, DollarSign, Calendar } from "lucide-react";

interface EditBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  booking: any;
}

const EditBookingModal = ({ isOpen, onClose, onSave, booking }: EditBookingModalProps) => {
  const [price, setPrice] = useState<number>(0);
  const [reservedDates, setReservedDates] = useState<string>("");

  useEffect(() => {
    if (booking) {
      setPrice(Number(booking?.house?.price) || 0);
      const dates = Array.isArray(booking?.reservedDates) 
        ? booking.reservedDates 
        : [];
      setReservedDates(dates.join(", "));
    }
  }, [booking]);

  if (!isOpen) return null;

  const handleSave = () => {
    const datesArray = reservedDates
      .split(",")
      .map((d) => d.trim())
      .filter((d) => d !== "");
    
    onSave({
      price,
      reservedDates: datesArray,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-md relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-5">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">ویرایش رزرو</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">کد رزرو</label>
            <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-600 dark:text-gray-300">
              #{booking?.id}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">نام ملک</label>
            <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-600 dark:text-gray-300">
              {booking?.house?.title || "نامشخص"}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">قیمت (تومان)</label>
            <div className="relative">
              <DollarSign size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">تاریخ های رزرو</label>
            <div className="relative">
              <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={reservedDates}
                onChange={(e) => setReservedDates(e.target.value)}
                placeholder="1402/01/01, 1402/01/02"
                className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">تاریخ‌ها را با کاما جدا کنید</p>
          </div>
        </div>

        <div className="flex gap-3 border-t border-gray-200 dark:border-gray-700 p-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-all">
            انصراف
          </button>
          <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl text-white bg-[#0887CAB2] hover:bg-[#0887CA]/90 transition-all">
            ذخیره تغییرات
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookingModal;