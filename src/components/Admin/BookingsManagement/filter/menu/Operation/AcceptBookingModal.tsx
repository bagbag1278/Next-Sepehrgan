"use client";

import React, { useState } from "react";
import { X, Home, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface AcceptBookingModalProps {
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
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    totalPrice?: number;
  };
}

// ❌ حتماً این خط درست باشد - بدون /api در انتها
const API_BASE_URL = "http://188.121.111.8:3003";

const AcceptBookingModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  bookingId,
  bookingDetails 
}: AcceptBookingModalProps) => {
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");

  const getToken = () => localStorage.getItem("accessToken");

  const handleAccept = async () => {
    setLoading(true);
    try {
      const token = getToken();
      
      // ❌ حتماً این خط درست باشد
      const url = `http://188.121.111.8:3003/api/bookings/${bookingId}/continue`;
      
      console.log("📡 URL:", url);
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "confirmed" }),
      });

      console.log("📥 Status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Success:", result);
        toast.success("رزرو با موفقیت تایید شد");
        onConfirm();
        onClose();
      } else {
        const errorText = await response.text();
        console.error("❌ خطا:", errorText);
        toast.error("خطا در تایید رزرو");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 h-full bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl z-50 overflow-hidden">
        
        <div className="bg-emerald-600 p-5 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CheckCircle size={24} />
              <h2 className="text-xl font-bold">تایید رزرو</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg">
              <X size={20} />
            </button>
          </div>
          <p className="text-green-300 text-sm mt-1">شماره رزرو: #{bookingId}</p>
        </div>

        <div className="p-6">
          {bookingDetails && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 mb-5 space-y-3">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                <Home size={16} className="text-green-600" />
                اطلاعات رزرو
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">نام کاربر:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{bookingDetails.userName || "—"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">شماره تماس:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{bookingDetails.userPhone || "—"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">نام ملک:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{bookingDetails.houseTitle || "—"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">تاریخ ورود:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{bookingDetails.checkIn || "—"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">تاریخ خروج:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{bookingDetails.checkOut || "—"}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-gray-500 dark:text-gray-400">مبلغ کل:</span>
                  <span className="font-bold text-green-600 dark:text-green-400 text-lg">
                    {bookingDetails.totalPrice?.toLocaleString() || 0} تومان
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 mb-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">توجه</span>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-300">
              با تایید این رزرو، وضعیت آن به "تایید شده" تغییر می‌کند و به کاربر اطلاع‌رسانی می‌شود.
            </p>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              یادداشت (اختیاری)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="در صورت نیاز یادداشتی وارد کنید..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAccept}
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  در حال تایید...
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  تایید رزرو
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

export default AcceptBookingModal;