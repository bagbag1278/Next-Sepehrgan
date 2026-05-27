// components/FilterModal/FilterModal.tsx
"use client";
import { X, Calendar as CalendarIcon } from "lucide-react";
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
  { value: "all", label: "همه" },
  { value: "confirmed", label: "تایید شده" },
  { value: "pending", label: "در حال رزرو" },
  { value: "cancelled", label: "غیرفعال" },
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

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-md p-5 sm:p-6 relative shadow-2xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#0887CAB2]">فیلتر های بیشتر</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          {/* وضعیت رزرو */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[#0887CAB2]">
              وضعیت رزرو
            </label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setStatusFilter(opt.value)}
                  className={`px-4 py-2 rounded-xl text-sm transition-all border ${
                    statusFilter === opt.value
                      ? "bg-[#0887CAB2] text-white border-[#0887CAB2]"
                      : "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-[#0887CAB2] border-[#0887CAB2]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* از تاریخ */}
          <div>
            <label className="block text-sm font-medium mb-2 mr-2 text-[#0887CAB2]">
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
                    placeholder="انتخاب تاریخ"
                    readOnly
                    className="w-100 px-4 py-2 border border-[#0887CAB2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0887CAB2] transition-all bg-white dark:bg-gray-700 text-[#10088F] dark:text-white cursor-pointer "
                  />
                  <CalendarIcon
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0887CAB2] pointer-events-none"
                  />
                </div>
              )}
            />
          </div>

          {/* تا تاریخ */}
          <div>
            <label className="block text-sm font-medium mb-2 mr-2 text-[#0887CAB2]">
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
                    placeholder="انتخاب تاریخ"
                    readOnly
                    className="w-100 px-4  py-2 border border-[#0887CAB2] text-[#10088F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0887CAB2] transition-all bg-white dark:bg-gray-700  dark:text-white cursor-pointer "
                  />
                  <CalendarIcon
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0887CAB2] pointer-events-none"
                  />
                </div>
              )}
            />
          </div>

          {/* حداقل قیمت */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[#0887CAB2]">
              حداقل قیمت (تومان)
            </label>
            <input
              type="number"
              placeholder="۰"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className="w-full px-4 py-2 border border-[#0887CAB2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0887CAB2] transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400"
            />
          </div>

          {/* حداکثر قیمت */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[#0887CAB2]">
              حداکثر قیمت (تومان)
            </label>
            <input
              type="number"
              placeholder="نامحدود"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="w-full px-4 py-2 border border-[#0887CAB2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0887CAB2] transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* دکمه‌ها */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-white bg-[#060425] hover:bg-[#060425b2] transition-all"
          >
            اعمال فیلتر
          </button>
          <button
            onClick={() => {
              resetFilters();
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl border border-[#0887CAB2] text-[#0887CAB2] hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBookingModal;