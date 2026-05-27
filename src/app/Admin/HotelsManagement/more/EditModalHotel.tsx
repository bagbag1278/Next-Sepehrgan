"use client";
import { useState, useEffect } from "react";
import { X, Home, MapPin, DollarSign, Star, ChevronDown } from "lucide-react";

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
  const [isStatusOpen, setIsStatusOpen] = useState(false);

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
    { value: "active", label: "فعال" },
    { value: "pending", label: "در انتظار" },
    { value: "inactive", label: "غیرفعال" },
  ];

  const getStatusLabel = (val: string) => {
    return statusOptions.find(opt => opt.value === val)?.label || "انتخاب وضعیت";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-md relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-5">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">ویرایش هتل</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">نام هتل</label>
            <div className="relative">
              <Home size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">آدرس</label>
            <div className="relative">
              <MapPin size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
              />
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
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">امتیاز (0-5)</label>
            <div className="relative">
              <Star size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">وضعیت</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
              >
                <span>{getStatusLabel(status)}</span>
                <ChevronDown size={18} className={`transition-transform ${isStatusOpen ? "rotate-180" : ""}`} />
              </button>
              {isStatusOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-20 overflow-hidden">
                  {statusOptions.map(opt => (
                    <div
                      key={opt.value}
                      onClick={() => {
                        setStatus(opt.value);
                        setIsStatusOpen(false);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3 border-t border-gray-200 dark:border-gray-700 p-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-all">انصراف</button>
          <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl text-white bg-[#0887CAB2] hover:bg-[#0887CA]/90 transition-all">ذخیره تغییرات</button>
        </div>
      </div>
    </div>
  );
};

export default EditModalHotel;