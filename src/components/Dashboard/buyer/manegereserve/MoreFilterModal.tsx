import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { createPortal } from "react-dom";
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
        className="w-full max-w-sm rounded-2xl bg-white px-10 py-6 shadow-2xl"
      >
        {/* محتوای شما */}
      </motion.div>
    </motion.div>
  );

  return createPortal(
    <AnimatePresence>{isOpen && modalContent}</AnimatePresence>,
    document.body
  );
};