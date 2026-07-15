"use client";
import { useState } from "react";
import {
  HiOutlineCreditCard,
  HiOutlineInformationCircle,
  HiOutlineTrash,
} from "react-icons/hi";
import HouseDetailModal from "./HouseDetailModal";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import PaymentModal from "./PaymentModal";
import { Booking } from "@/core/types/buyer/IBooking";
import api from "@/core/interceptor/axiosInstance";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface Props {
  booking: Booking;
}

const ManegeHouseDrop = ({ booking }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await api.delete(`/bookings/${booking.id}`);
      toast.success("رزرو با موفقیت حذف شد");
      setIsConfirmOpen(false);
      router.refresh();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("حذف رزرو ناموفق بود");
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmModal = typeof window !== "undefined" && createPortal(
    <AnimatePresence>
      {isConfirmOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setIsConfirmOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 w-full max-w-xs mx-4 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
              <HiOutlineTrash className="text-red-400" size={22} />
            </div>
            <p className="font-medium text-[15px] mb-1">حذف رزرو</p>
            <p className="text-sm text-gray-400 mb-6">
              آیا از حذف رزرو <span className="text-gray-600 dark:text-gray-300 font-medium">{booking.house.title}</span> مطمئن هستید؟
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                {isDeleting ? "در حال حذف..." : "بله، حذف کن"}
              </button>
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="flex-1 border border-gray-200 dark:border-slate-600 text-sm py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                انصراف
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );

  return (
    <div className="">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-5.5 w-5 mr-225 mt-2 cursor-pointer"
      >
        <PiDotsThreeOutlineVerticalFill />
      </button>
      <div
        className={`absolute -left-12 bg-[#f5f5f5] z-20 dark:bg-slate-400 px-4 py-4.75 ease-out transition-transform duration-300 w-37.5 rounded-2xl shadow-[0_0_15px] shadow-blue-300/30
          ${isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}
      >
        <div className="h-full flex flex-col gap-4">
          <button
            onClick={() => { setIsPaymentOpen(true); setIsOpen(false); }}
            className="h-6 hover:h-8 items-center flex gap-2 opacity-80 text-[13px] cursor-pointer rounded-lg hover:pr-2 hover:bg-blue-300 hover:opacity-100 hover:text-white transition-all duration-150"
          >
            <HiOutlineCreditCard size={24} />
            پرداخت
          </button>
          <button
            onClick={() => { setIsModalOpen(true); setIsOpen(false); }}
            className="h-6 hover:h-8 items-center flex gap-2 opacity-80 text-[13px] cursor-pointer rounded-lg hover:pr-2 hover:bg-blue-300 hover:opacity-100 hover:text-white transition-all duration-150"
          >
            <HiOutlineInformationCircle size={24} />
            جزئیات
          </button>
          <button
            onClick={() => { setIsConfirmOpen(true); setIsOpen(false); }}
            className="h-6 hover:h-8 text-red-100 items-center flex gap-2  text-[13px] cursor-pointer rounded-lg hover:pr-2 hover:opacity-100 hover:bg-red-100 hover:text-white transition-all duration-150"
          >
            <HiOutlineTrash size={24} />
            حذف
          </button>
        </div>
      </div>

      {confirmModal}

      <HouseDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        booking={booking}
      />
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        houseName={booking.house.title}
        rentAmount={Number(booking.house.price)}
        commission={Number(booking.house.price) * 0.05}
        bookingId={booking.id}
      />
    </div>
  );
};

export default ManegeHouseDrop;