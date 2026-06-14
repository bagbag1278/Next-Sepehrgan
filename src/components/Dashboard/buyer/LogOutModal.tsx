import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom"
import LogOutSVG from "./icon/LogOutSVG";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
const LogOutModal = ({ isOpen, onClose, onConfirm }: ModalProps) => {
    if (typeof window === "undefined") return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30 backdrop-blur-[6px] p-4"
          onClick={onClose}
        >
          {/* محتوای مودال همان قبلی... */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-white px-10 py-6 shadow-2xl"
          >
            <div className="h-44.5 flex flex-col gap-4 items-center">
                <LogOutSVG/>
                <div className="h-14.5 flex flex-col gap-2 items-center">
                    <h2 className="font-bold text-blue-200">خروج از حساب</h2>
                    <span className="text-blue-100">مطمئنی میخوای از حسابت خارج شی؟؟</span>
                </div>
                <div className="flex gap-2 h-10">
                    <button onClick={onConfirm} className="bg-blue-100 rounded-xl h-10 w-31.5 text-white hover:opacity-85 transition-opacity duration-200 cursor-pointer">بله</button>
                    <button onClick={onClose} className="border border-blue-400 opacity-60 rounded-xl h-10 w-31.5 hover:opacity-85 transition-opacity duration-200 cursor-pointer">انصراف</button>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  return createPortal(modalContent, document.body);
};

export default LogOutModal;
