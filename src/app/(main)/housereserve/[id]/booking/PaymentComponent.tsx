// components/PaymentComponent.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Wallet, Banknote, Loader2, ArrowRight, Lock, ShieldCheck, ChevronLeft, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";

interface PaymentComponentProps {
  bookingId: string | number;
  amount: number;
  description: string;
  onBack: () => void;
  onSuccess: () => void;
  extraEmail?: string;
  extraPhone?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";

const PaymentComponent = ({ 
  bookingId, 
  amount, 
  description, 
  onBack, 
  onSuccess,
  extraEmail,
  extraPhone
}: PaymentComponentProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "failed">("idle");

  const handlePayment = async () => {
    if (amount <= 0) {
      toast.error("مبلغ پرداخت نامعتبر است");
      return;
    }

    setLoading(true);
    setStatus("processing");

    try {
      const token = localStorage.getItem("accessToken");
      
      const response = await fetch(`${API_BASE_URL}/payment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          bookingId: Number(bookingId),
          amount: amount,
          description: description,
          callbackUrl: `${window.location.origin}/payment/verify`,
          email: extraEmail,
          phone: extraPhone,
        }),
      });

      const result = await response.json();

      if (response.ok && result.paymentUrl) {
        toast.success("در حال هدایت به درگاه پرداخت...");
        setTimeout(() => {
          window.location.href = result.paymentUrl;
        }, 500);
      } else {
        setStatus("failed");
        toast.error(result.message || "خطا در ایجاد پرداخت");
        setLoading(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setStatus("failed");
      toast.error("خطا در ارتباط با سرور");
      setLoading(false);
    }
  };

  // صفحه موفقیت
  if (status === "success") {
    return (
      <div className="flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-green-600 mb-2">پرداخت موفق</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">پرداخت شما با موفقیت انجام شد</p>
            <button
              onClick={onSuccess}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all"
            >
              ادامه
            </button>
          </div>
        </div>
      </div>
    );
  }

  // صفحه خطا
  if (status === "failed") {
    return (
      <div className="flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <XCircle size={40} className="text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-red-600 mb-2">پرداخت ناموفق</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">متأسفانه پرداخت با مشکل مواجه شد</p>
            <button
              onClick={handlePayment}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      </div>
    );
  }

  // صفحه اصلی پرداخت
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-3xl p-8">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            اطلاعات مسافران ثبت شد
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            برای تکمیل رزرو، پرداخت را انجام دهید
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 dark:text-gray-400">مبلغ قابل پرداخت:</span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {amount.toLocaleString()} تومان
            </span>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2
              ${loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
              }`}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                در حال اتصال به درگاه...
              </>
            ) : (
              <>
                <CreditCard size={20} />
                پرداخت امن
                <ArrowRight size={18} />
              </>
            )}
          </button>
          
          <button
            onClick={onBack}
            disabled={loading}
            className="w-full py-3 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            بازگشت به مرحله قبل
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;