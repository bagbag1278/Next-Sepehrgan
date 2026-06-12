// components/FilterModal/FilterModal.tsx
"use client";
import { X, Calendar as CalendarIcon, DollarSign, RefreshCw } from "lucide-react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  dateFrom: string;
  setDateFrom: (value: string) => void;
  dateTo: string;
  setDateTo: (value: string) => void;
  priceMin: string;
  setPriceMin: (value: string) => void;
  priceMax: string;
  setPriceMax: (value: string) => void;
  resetFilters: () => void;
}

const statusOptions = [
  { value: "all", label: "همه", color: "bg-gray-500" },
  { value: "confirmed", label: "تایید شده", color: "bg-emerald-500" },
  { value: "pending", label: "در انتظار", color: "bg-amber-500" },
  { value: "canceled", label: "لغو شده", color: "bg-rose-500" },
];

const FilterBookingModal = ({
  isOpen,
  onClose,
  statusFilter,
  setStatusFilter,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  resetFilters,
}: FilterModalProps) => {
  if (!isOpen) return null;

  const hasActiveFilters = statusFilter !== "all" || dateFrom || dateTo || priceMin || priceMax;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className=" bg-[#066A9E] px-6 py-5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">فیلترهای پیشرفته</h2>
              <p className="text-white/70 text-sm mt-0.5">جستجوی دقیق‌تر رزروها</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-all active:scale-95"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* وضعیت رزرو */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              وضعیت رزرو
            </label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setStatusFilter(opt.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    statusFilter === opt.value
                      ? `${opt.color} text-white shadow-md`
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* بازه تاریخی */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              بازه تاریخی
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* از تاریخ */}
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1 mr-2">
                  از تاریخ
                </label>
                <DatePicker
                  value={dateFrom}
                  onChange={(date) => {
                    const dateString = date ? date.format("YYYY/MM/DD") : "";
                    setDateFrom(dateString);
                  }}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  editable={false}
                  render={(value, openCalendar) => (
                    <div className="relative" onClick={openCalendar}>
                      <input
                        type="text"
                        value={value || ""}
                        placeholder="انتخاب"
                        readOnly
                        className="w-full pr-4 pl-10 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-700 dark:text-white cursor-pointer text-sm"
                      />
                      <CalendarIcon
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0887CA] pointer-events-none"
                      />
                    </div>
                  )}
                />
              </div>

              {/* تا تاریخ */}
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1 mr-2">
                  تا تاریخ
                </label>
                <DatePicker
                  value={dateTo}
                  onChange={(date) => {
                    const dateString = date ? date.format("YYYY/MM/DD") : "";
                    setDateTo(dateString);
                  }}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  editable={false}
                  render={(value, openCalendar) => (
                    <div className="relative" onClick={openCalendar}>
                      <input
                        type="text"
                        value={value || ""}
                        placeholder="انتخاب"
                        readOnly
                        className="w-full pr-4 pl-10 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-700 dark:text-white cursor-pointer text-sm"
                      />
                      <CalendarIcon
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0887CA] pointer-events-none"
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          {/* بازه قیمت */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              بازه قیمت (تومان)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <DollarSign size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CA]" />
                <input
                  type="number"
                  placeholder="حداقل"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-full pr-10 pl-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-700 dark:text-white placeholder:text-gray-400 text-sm"
                />
              </div>
              <div className="relative">
                <DollarSign size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CA]" />
                <input
                  type="number"
                  placeholder="حداکثر"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full pr-10 pl-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-700 dark:text-white placeholder:text-gray-400 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-100 dark:border-gray-800 p-5 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-[0.98]"
            >
              اعمال فیلتر
            </button>
            
            {hasActiveFilters && (
              <button
                onClick={() => {
                  resetFilters();
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all flex items-center gap-2 active:scale-[0.98]"
              >
                <RefreshCw size={16} />
                <span>حذف فیلترها</span>
              </button>
            )}
            
            {!hasActiveFilters && (
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed flex items-center gap-2"
              >
                <RefreshCw size={16} />
                <span>بدون فیلتر</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBookingModal;