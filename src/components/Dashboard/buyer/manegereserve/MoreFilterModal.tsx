import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { createPortal } from "react-dom";
import ModalForm from "./ModalForm";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const MoreFilterModal = ({ isOpen, onClose }: ModalProps) => {
  if (typeof window === "undefined" || !isOpen) return null;

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-9999 flex items-center backdrop-blur-sm justify-center bg-black/20 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
        className="w-full max-w-91 h-108.5 rounded-2xl bg-white dark:bg-slate-600 px-11 flex flex-col gap-6 py-8 shadow-2xl"
      >
        <div className="h-8.5 flex flex-col gap-2">
          <div className="flex justify-between h-6">
            <h2 className="text-blue-200 ">فیلتر ها</h2>
            <button className="text-[12px] opacity-50 dark:text-gra">
              پاک کردن فیلتر ها
            </button>
          </div>
          <span className="h-px bg-blue-300/50 rounded-full"></span>
        </div>
        <ModalForm/>
      </motion.div>
    </motion.div>
  );

  return createPortal(
    <AnimatePresence>{isOpen && modalContent}</AnimatePresence>,
    document.body,
  );
};
