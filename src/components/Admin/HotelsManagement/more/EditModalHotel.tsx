"use client";
import { useState, useEffect } from "react";
import { X, Home, MapPin, DollarSign, Star, Percent, Users, Bath, Car, Hotel, Maximize } from "lucide-react";

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
  const [capacity, setCapacity] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [parking, setParking] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    if (hotel) {
      setTitle(hotel.title || "");
      setAddress(hotel.address || "");
      setPrice(hotel.price || 0);
      setRate(hotel.rate || 0);
      setCapacity(hotel.capacity || 0);
      setBathrooms(hotel.bathrooms || 0);
      setParking(hotel.parking || 0);
      setRooms(hotel.rooms || 0);
      setCaption(hotel.caption || "");
    }
  }, [hotel]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ 
      title, 
      address, 
      price, 
      rate, 
      capacity,
      bathrooms,
      parking,
      rooms,
      caption 
    });
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 h-full bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[90vh]">
        
        <div className="bg-[#0887CA] px-6 py-5 text-white sticky top-0">
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

        <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-2 gap-4">
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

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">امتیاز (۰-۵)</label>
              <div className="relative">
                <Star size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-500" />
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
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">ظرفیت</label>
              <div className="relative">
                <Users size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CA]" />
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="w-full pr-9 pl-3 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white text-sm"
                  placeholder="نفر"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">سرویس بهداشتی</label>
              <div className="relative">
                <Bath size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CA]" />
                <input
                  type="number"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(Number(e.target.value))}
                  className="w-full pr-9 pl-3 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white text-sm"
                  placeholder="تعداد"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">پارکینگ</label>
              <div className="relative">
                <Car size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CA]" />
                <input
                  type="number"
                  value={parking}
                  onChange={(e) => setParking(Number(e.target.value))}
                  className="w-full pr-9 pl-3 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white text-sm"
                  placeholder="تعداد"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">اتاق‌ها</label>
              <div className="relative">
                <Hotel size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CA]" />
                <input
                  type="number"
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  className="w-full pr-9 pl-3 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white text-sm"
                  placeholder="تعداد"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">توضیحات</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white resize-none"
              placeholder="توضیحات هتل..."
            />
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 p-5 bg-gray-50/50 dark:bg-gray-800/50 flex gap-3 sticky bottom-0">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            انصراف
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#066A9E] to-[#0887CA] hover:from-[#055A85] hover:to-[#0778B3] text-white font-medium transition-all shadow-sm"
          >
            ذخیره تغییرات
          </button>
        </div>
      </div>
    </>
  );
};

export default EditModalHotel;