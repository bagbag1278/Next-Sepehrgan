"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineX,
  HiOutlineCreditCard,
  HiOutlineHome,
  HiOutlineCheck,
} from "react-icons/hi";
import { createPayment } from "@/core/api/Buyer/CreatePayment.api";
import api from "@/core/interceptor/axiosInstance";
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  houseName?: string;
  rentAmount?: number;
  commission?: number;
  bookingId: number;
}

const PaymentModal = ({
  isOpen,
  onClose,
  houseName = "خیابان ولیعصر، واحد ۴",
  rentAmount = 12000000,
  commission = 600000,
  bookingId,
}: PaymentModalProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [note, setNote] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = rentAmount + commission;

  const formatCard = (val: string) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1  ").trim();

  const formatExpiry = (val: string) =>
    val.replace(/\D/g, "").slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2");

  const handleClose = () => {
    setIsPaid(false);
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setNote("");
    setError(null);
    onClose();
  };

const handlePayment = async () => {
  try {
    setIsLoading(true);
    setError(null);
    await createPayment({
      amount: total,
      description: note || `پرداخت اجاره ${houseName}`,
      callbackUrl: `${window.location.origin}/dashboard/payment/callback`,
      bookingId,
    });
    setIsPaid(true);
  } catch (err) {
    console.error("Payment error:", err); // 👈 اضافه کن
    setError("پرداخت ناموفق بود، لطفاً دوباره تلاش کنید");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <AnimatePresence mode="wait">
            {isPaid ? (
              <motion.div
                key="success"
                className="bg-white fixed z-9999 dark:bg-slate-800 backdrop-blur-2xl rounded-2xl shadow-xl p-8 w-full max-w-md mx-4 text-center"
                dir="rtl"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-green-200 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 16 }}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.2 }}
                  >
                    <HiOutlineCheck className="w-10 h-10" />
                  </motion.div>
                </motion.div>
                <motion.p
                  className="font-medium text-[17px] mb-1 text-gray-800 dark:text-white"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.25 }}
                >
                  پرداخت موفق بود
                </motion.p>
                <motion.p
                  className="text-sm text-gray-400 mb-6"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42, duration: 0.25 }}
                >
                  مبلغ {total.toLocaleString("fa-IR")} تومان با موفقیت پرداخت شد
                </motion.p>
                <motion.button
                  onClick={handleClose}
                  className="w-full cursor-pointer bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium py-2.5 rounded-xl hover:text-white hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.58, duration: 0.25 }}
                  whileTap={{ scale: 0.97 }}
                >
                  بستن
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 w-full max-w-md mx-4"
                dir="rtl"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                      <HiOutlineHome className="text-blue-500" size={22} />
                    </div>
                    <div>
                      <p className="font-medium text-[15px] text-gray-800 dark:text-white">
                        پرداخت اجاره
                      </p>
                      <p className="text-xs text-gray-400">{houseName}</p>
                    </div>
                  </div>
                  <button onClick={handleClose} className="text-gray-400 hover:text-red-500 transition-colors">
                    <HiOutlineX size={22} />
                  </button>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">اجاره ماهیانه</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {rentAmount.toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-500">کمیسیون مدیریت</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {commission.toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-slate-600 pt-3 flex justify-between">
                    <span className="font-medium text-gray-800 dark:text-white">مجموع</span>
                    <span className="text-lg font-medium text-blue-500">
                      {total.toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                </div>

                {/* Card Number */}
                <div className="mb-4">
                  <label className="text-xs text-gray-400 block mb-1.5">شماره کارت</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCard(e.target.value))}
                      placeholder="۰۰۰۰  ۰۰۰۰  ۰۰۰۰  ۰۰۰۰"
                      className="w-full border border-gray-200 dark:border-slate-600 rounded-xl px-4 pl-10 py-2.5 text-sm bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-white"
                    />
                    <HiOutlineCreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>

                {/* Expiry & CVV */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1.5">تاریخ انقضا</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      placeholder="ماه / سال"
                      className="w-full border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1.5">رمز دوم</label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.slice(0, 4))}
                      placeholder="••••"
                      className="w-full border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-white"
                    />
                  </div>
                </div>

                {/* Note */}
                <div className="mb-6">
                  <label className="text-xs text-gray-400 block mb-1.5">توضیحات (اختیاری)</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    placeholder="مثلاً: اجاره فروردین ۱۴۰۴"
                    className="w-full border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-white"
                  />
                </div>

                {/* error */}
                {error && (
                  <p className="text-red-500 text-xs mb-4 text-center">{error}</p>
                )}

                <div className="flex gap-2">
                  <motion.button
                    onClick={handlePayment}
                    disabled={isLoading}
                    className="flex-1 bg-blue-500 cursor-pointer hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm py-2.5 rounded-xl transition-colors"
                    whileTap={{ scale: 0.97 }}
                  >
                    {isLoading ? "در حال پرداخت..." : `پرداخت — ${total.toLocaleString("fa-IR")} تومان`}
                  </motion.button>
                  <motion.button
                    onClick={handleClose}
                    className="px-4 py-2.5 text-sm border text-red-100 cursor-pointer border-red-100 dark:border-slate-600 rounded-xl hover:bg-red-100 hover:text-white dark:hover:bg-slate-700 transition-colors"
                    whileTap={{ scale: 0.97 }}
                  >
                    انصراف
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;