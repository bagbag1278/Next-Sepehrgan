"use client";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Payment } from "@/core/api/Buyer/Payment.api";
import { digitsEnToFa, addCommas } from "@persian-tools/persian-tools";
import jalaali from "jalaali-js";
import { HiOutlineX } from "react-icons/hi";
import { TbReceipt } from "react-icons/tb";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  payment: Payment;
}

const toJalali = (dateStr: string | null) => {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  const { jy, jm, jd } = jalaali.toJalaali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
  const monthNames = [
    "فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور",
    "مهر","آبان","آذر","دی","بهمن","اسفند",
  ];
  return `${digitsEnToFa(jd.toString())} ${monthNames[jm - 1]} ${digitsEnToFa(jy.toString())}`;
};

const statusLabel = (status: string) => {
  if (status === "confirmed") return { label: "پرداخت شده", color: "var(--color-background-success)", text: "var(--color-text-success)" };
  if (status === "canceled") return { label: "لغو شده", color: "var(--color-background-danger)", text: "var(--color-text-danger)" };
  return { label: "در انتظار", color: "var(--color-background-warning)", text: "var(--color-text-warning)" };
};

const ReceiptModal = ({ isOpen, onClose, payment }: Props) => {
  if (typeof window === "undefined" || !isOpen) return null;

  const status = statusLabel(payment.status);

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 w-full max-w-sm"
      >
        {/* header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
              <TbReceipt className="text-blue-500" size={20} />
            </div>
            <span className="font-medium text-[15px]">رسید پرداخت</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
            <HiOutlineX size={20} />
          </button>
        </div>

        {/* amount */}
        <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4 mb-4">
          <p className="text-xs text-gray-400 mb-1">مبلغ پرداخت</p>
          <p className="text-xl font-medium text-blue-500">
            {digitsEnToFa(addCommas(Math.round(Number(payment.amount)).toString()))} تومان
          </p>
        </div>

        {/* details */}
        <div className="border border-gray-100 dark:border-slate-700 rounded-xl overflow-hidden text-sm">
          <div className="flex justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-700">
            <span className="text-gray-400">شناسه تراکنش</span>
            <span className="font-medium">{digitsEnToFa(payment.id.toString())}</span>
          </div>
          <div className="flex justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-700">
            <span className="text-gray-400">تاریخ</span>
            <span className="font-medium">{toJalali(payment.createdAt)}</span>
          </div>
          <div className="flex justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-700">
            <span className="text-gray-400">وضعیت</span>
            <span
              className="text-xs font-medium px-3 py-1 rounded-lg"
              style={{ background: status.color, color: status.text }}
            >
              {status.label}
            </span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-gray-400 shrink-0">توضیحات</span>
            <span className="font-medium text-left mr-4 truncate">{payment.description ?? "—"}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2.5 rounded-xl text-sm border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        >
          بستن
        </button>
      </motion.div>
    </motion.div>
  );

  return createPortal(
    <AnimatePresence>{isOpen && modalContent}</AnimatePresence>,
    document.body
  );
};

export default ReceiptModal;