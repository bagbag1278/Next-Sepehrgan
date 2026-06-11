// app/admin/BookingsManagement/filter/menu/Operation/CancelBookingModal.tsx
"use client";

import React, { useState } from "react";
import { X, Home, AlertCircle, Ban, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface CancelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookingId: number;
  bookingDetails?: {
    id: number;
    userName?: string;
    userPhone?: string;
    userEmail?: string;
    houseTitle?: string;
    totalPrice?: number;
  };
}

// ✅ اصلاح: حذف /api از انتهای آدرس
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003";

const CancelBookingModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  bookingId,
  bookingDetails 
}: CancelBookingModalProps) => {
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");

  const getToken = () => localStorage.getItem("accessToken");

  const handleCancel = async () => {
    setLoading(true);
    try {
      const token = getToken();
      
      const url = `${API_BASE_URL}/bookings/${bookingId}/cancel`;
      console.log("📡 ارسال درخواست لغو:", url);
      
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason, status: "cancelled" }),
      });

      console.log("📥 وضعیت پاسخ:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("✅ نتیجه:", result);
        toast.success("رزرو با موفقیت لغو شد");
        onConfirm();
        onClose();
      } else {
        const errorText = await response.text();
        console.error("❌ خطا:", errorText);
        toast.error("خطا در لغو رزرو");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl z-50 overflow-hidden">
        
        <div className="bg-gradient-to-r from-red-600 to-rose-600 p-5 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Ban size={24} />
              <h2 className="text-xl font-bold">لغو رزرو</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-all">
              <X size={20} />
            </button>
          </div>
          <p className="text-red-100 text-sm mt-1">شماره رزرو: #{bookingId}</p>
        </div>

        <div className="p-6">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 mb-5 border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={16} className="text-red-600" />
              <span className="text-sm font-medium text-red-700 dark:text-red-300">توجه!</span>
            </div>
            <p className="text-sm text-red-600 dark:text-red-300">
              با لغو این رزرو، وضعیت آن به "لغو شده" تغییر می‌کند و این اقدام غیرقابل بازگشت است.
            </p>
          </div>

          {bookingDetails && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 mb-5 space-y-3">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                <Home size={16} className="text-red-600" />
                اطلاعات رزرو
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">نام کاربر:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{bookingDetails.userName || "—"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">نام ملک:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{bookingDetails.houseTitle || "—"}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-gray-500 dark:text-gray-400">مبلغ کل:</span>
                  <span className="font-bold text-red-600 dark:text-red-400">
                    {bookingDetails.totalPrice?.toLocaleString() || 0} تومان
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              دلیل لغو (اختیاری)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="دلیل لغو رزرو را وارد کنید..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold hover:from-red-700 hover:to-rose-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  در حال لغو...
                </>
              ) : (
                <>
                  <Ban size={18} />
                  لغو رزرو
                </>
              )}
            </button>
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelBookingModal;