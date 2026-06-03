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
}

const EditBookingModal = ({
  isOpen,
  onClose,
  onSave,
  booking,
  houseTitle,
  housePrice,
}: EditBookingModalProps) => {
  const [price, setPrice] = useState<number>(0);
  const [rserveName, setReserveName] = useState("");

  const [reservedDates, setReservedDates] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (booking) {
      setPrice(housePrice);
      setReserveName(houseTitle || booking?.house?.title || "");

      const dates = Array.isArray(booking?.reservedDates)
        ? booking.reservedDates
        : [];
      setReservedDates(dates.join(", "));
    }
  }, [booking, housePrice]);

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
        rserveName:rserveName,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-md relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-5">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            ویرایش رزرو
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-[#0887CAB2]">
              کد رزرو
            </label>
            <div className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-2xl text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
              #{booking?.id}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#0887CAB2]">
              نام ملک
            </label>
              <input
                type="text"
                value={rserveName}
                onChange={(e) => setReserveName(e.target.value)}
                className="w-full  pr-3 py-3 border text-[#0887CAB2] border-[#0887CAB2] rounded-2xl bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
              />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#0887CAB2]">
              قیمت (تومان)
            </label>
            <div className="relative">
              <DollarSign
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CAB2]"
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full pr-10 pl-4 py-3 border text-[#0887CAB2] border-[#0887CAB2] rounded-2xl bg-white dark:bg-gray-700  dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#0887CAB2]">
              تاریخ های رزرو
            </label>
            <div className="relative">
              <Calendar
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CAB2]"
              />
              <input
                type="text"
                value={reservedDates}
                onChange={(e) => setReservedDates(e.target.value)}
                placeholder="1402/01/01, 1402/01/02"
                className="w-full pr-10 pl-4 py-3 border text-[#0887CAB2] border-[#0887CAB2] rounded-2xl bg-white dark:bg-gray-700  dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              تاریخ‌ها را با کاما جدا کنید
            </p>
          </div>
        </div>

        <div className="flex gap-3 border-t border-gray-200 dark:border-gray-700 p-5">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            انصراف
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-white bg-[#0887CAB2] hover:bg-[#0887CA]/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookingModal;
