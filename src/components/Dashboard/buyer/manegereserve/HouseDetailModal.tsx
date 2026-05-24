"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import HouseDetail from "./HouseDetail";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const HouseDetailModal = ({ isOpen, onClose }: ModalProps) => {
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
        className="w-full max-w-183.25 rounded-2xl bg-[#F5F5F5] p-8 shadow-[0_0_10px] shadow-blue-300/15"
      >
        <HouseDetail/>
      </motion.div>
    </motion.div>
  );

  return createPortal(
    <AnimatePresence>{isOpen && modalContent}</AnimatePresence>,
    document.body,
  );
};

export default HouseDetailModal;
