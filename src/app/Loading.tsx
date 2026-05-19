"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
      />
    </div>
  );
}
