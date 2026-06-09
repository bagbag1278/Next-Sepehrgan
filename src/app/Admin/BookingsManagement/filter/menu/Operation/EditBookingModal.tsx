"use client";
import { useState, useEffect } from "react";
import { X, DollarSign, Calendar, Loader2 } from "lucide-react";

interface EditBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  booking: any;
  houseTitle: string;
  housePrice: number;
  isLoading?: boolean;
}

const EditBookingModal = ({
  isOpen,
  onClose,
  onSave,
  booking,
  houseTitle,
  housePrice,
  isLoading = false,
}: EditBookingModalProps) => {
  const [price, setPrice] = useState<number>(0);
  const [rserveName, setReserveName] = useState("");
  const [reservedDates, setReservedDates] = useState<string>("");
  const [status, setStatus] = useState<string>("pending");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (booking) {
      setPrice(housePrice);
      setReserveName(houseTitle || booking?.house?.title || "");

      const dates = Array.isArray(booking?.reservedDates)
        ? booking.reservedDates
        : [];
      setReservedDates(dates.join(", "));
      setStatus(booking.status || "pending");
    }
  }, [booking, housePrice, houseTitle]);

  if (!isOpen) return null;

  const handleSave = async () => {
    const datesArray = reservedDates
      .split(",")
      .map((d) => d.trim())
      .filter((d) => d !== "");

    setLoading(true);
    try {
      await onSave({
        price,
        reservedDates: datesArray,
        rserveName: rserveName,
        status: status,
      });
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: "pending", label: "در انتظار", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
    { value: "confirmed", label: "تأیید شده", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" },
    { value: "cancelled", label: "لغو شده", color: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-lg shadow-2xl max-h-[92vh] overflow-hidden border border-gray-100 dark:border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">ویرایش رزرو</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">#{booking?.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-all active:scale-95"
          >
            <X size={22} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(92vh-140px)]">
          {/* نام ملک */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              نام ملک
            </label>
            <input
              type="text"
              value={rserveName}
              onChange={(e) => setReserveName(e.target.value)}
              className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white"
            />
          </div>

          {/* قیمت */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              قیمت (تومان)
            </label>
            <div className="relative">
              <DollarSign
                size={20}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0887CA]"
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full pl-5 pr-12 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white text-lg"
              />
            </div>
          </div>

          {/* تاریخ‌های رزرو */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              تاریخ‌های رزرو
            </label>
            <div className="relative">
              <Calendar
                size={20}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0887CA]"
              />
              <input
                type="text"
                value={reservedDates}
                onChange={(e) => setReservedDates(e.target.value)}
                placeholder="1402/01/01, 1402/01/02"
                className="w-full pl-5 pr-12 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">تاریخ‌ها را با کاما ( , ) جدا کنید</p>
          </div>

          {/* وضعیت رزرو */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              وضعیت رزرو
            </label>
            <div className="grid grid-cols-3 gap-3">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStatus(option.value)}
                  className={`py-3 px-4 rounded-2xl text-sm font-medium transition-all duration-200 border ${
                    status === option.value
                      ? `${option.color} border-current shadow-sm`
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-transparent text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-6 flex gap-3">
          <button
            onClick={onClose}
            disabled={loading || isLoading}
            className="flex-1 py-3.5 rounded-2xl border border-gray-300 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-[0.985] disabled:opacity-50"
          >
            انصراف
          </button>

          <button
            onClick={handleSave}
            disabled={loading || isLoading}
            className="flex-1 py-3.5 rounded-2xl bg-[#0887CA] hover:bg-[#0778B3] text-white font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.985] disabled:opacity-70 shadow-lg shadow-[#0887CA]/30"
          >
            {(loading || isLoading) && <Loader2 size={20} className="animate-spin" />}
            {(loading || isLoading) ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookingModal;