"use client";
import { useState, useEffect } from "react";
import { X, Calendar, Loader2, Mail, Phone, Users, Home } from "lucide-react";

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
  const [status, setStatus] = useState<string>("pending");
  const [sharedEmail, setSharedEmail] = useState("");
  const [sharedMobile, setSharedMobile] = useState("");
  const [travelerDetails, setTravelerDetails] = useState<any[]>([]);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (booking) {
      setStatus(booking.status === "canceled" ? "cancelled" : (booking.status || "pending"));
      setSharedEmail(booking.sharedEmail || "");
      setSharedMobile(booking.sharedMobile || "");
      setTravelerDetails(booking.traveler_details || []);
      
      if (booking.reservedDates && booking.reservedDates.length >= 2) {
        try {
          const checkIn = new Date(booking.reservedDates[0]);
          const checkOut = new Date(booking.reservedDates[1]);
          setCheckInDate(checkIn.toISOString().split('T')[0]);
          setCheckOutDate(checkOut.toISOString().split('T')[0]);
        } catch {
          setCheckInDate(booking.reservedDates[0] || "");
          setCheckOutDate(booking.reservedDates[1] || "");
        }
      }
    }
  }, [booking]);

  useEffect(() => {
    if (!isOpen) {
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      let statusToSend = status;
      if (status === "cancelled") {
        statusToSend = "canceled";
      }
      
      await onSave({
        status: statusToSend,
        sharedEmail,
        sharedMobile,
        traveler_details: travelerDetails,
        reservedDates: [checkInDate, checkOutDate],
      });
      onClose();
    } catch (error) {
      console.error("خطا در ذخیره:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateTraveler = (index: number, field: string, value: string) => {
    const updated = [...travelerDetails];
    updated[index] = { ...updated[index], [field]: value };
    setTravelerDetails(updated);
  };

  const statusOptions = [
    { value: "pending", label: "در انتظار", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
    { value: "confirmed", label: "تأیید شده", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" },
    { value: "cancelled", label: "لغو شده", color: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-xl shadow-2xl max-h-[110vh] overflow-hidden border border-gray-200 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">ویرایش رزرو</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">کد رزرو: #{booking?.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Home size={18} className="text-[#0887CA]" />
              <span className="font-bold text-gray-700 dark:text-gray-300">اطلاعات ملک</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">نام ملک</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{houseTitle}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">قیمت هر شب</p>
                <p className="text-sm font-semibold text-[#0887CA]">{housePrice?.toLocaleString()} تومان</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                تاریخ ورود
              </label>
              <div className="relative">
                <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CA]" />
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full pr-10 pl-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                تاریخ خروج
              </label>
              <div className="relative">
                <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CA]" />
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full pr-10 pl-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              وضعیت رزرو
            </label>
            <div className="flex gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStatus(option.value)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    status === option.value
                      ? `${option.color} shadow-md`
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              <Mail size={14} className="inline ml-1" />
              اطلاعات تماس اشتراکی
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={sharedEmail}
                  onChange={(e) => setSharedEmail(e.target.value)}
                  placeholder="ایمیل"
                  className="w-full pr-10 pl-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white text-sm"
                />
              </div>
              <div className="relative">
                <Phone size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={sharedMobile}
                  onChange={(e) => setSharedMobile(e.target.value)}
                  placeholder="شماره موبایل"
                  className="w-full pr-10 pl-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white text-sm"
                />
              </div>
            </div>
          </div>

          {travelerDetails.length > 0 && (
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                <Users size={14} className="inline ml-1" />
                اطلاعات مسافران ({travelerDetails.length} نفر)
              </label>
              <div className="space-y-3">
                {travelerDetails.map((traveler, idx) => (
                  <div key={idx} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 space-y-3 border border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-bold text-[#0887CA]">مسافر {idx + 1}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={traveler.firstName || ""}
                        onChange={(e) => updateTraveler(idx, "firstName", e.target.value)}
                        placeholder="نام"
                        className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none text-sm"
                      />
                      <input
                        type="text"
                        value={traveler.lastName || ""}
                        onChange={(e) => updateTraveler(idx, "lastName", e.target.value)}
                        placeholder="نام خانوادگی"
                        className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none text-sm"
                      />
                      <input
                        type="text"
                        value={traveler.nationalId || ""}
                        onChange={(e) => updateTraveler(idx, "nationalId", e.target.value)}
                        placeholder="کد ملی"
                        className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none text-sm"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => updateTraveler(idx, "gender", "male")}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                            traveler.gender === "male"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          مرد
                        </button>
                        <button
                          type="button"
                          onClick={() => updateTraveler(idx, "gender", "female")}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                            traveler.gender === "female"
                              ? "bg-pink-500 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          زن
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 flex gap-3">
          <button
            onClick={onClose}
            disabled={loading || isLoading}
            className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all disabled:opacity-50 text-sm"
          >
            انصراف
          </button>
          <button
            onClick={handleSave}
            disabled={loading || isLoading}
            className="flex-1 py-2.5 rounded-xl bg-[#0887CA] hover:bg-[#0778B3] text-white font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-70 text-sm"
          >
            {(loading || isLoading) && <Loader2 size={16} className="animate-spin" />}
            {(loading || isLoading) ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookingModal;
