"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import FastFilter from "./Filter/FastFilter";

const FilterButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-37 border border-blue-300/70 rounded-2xl font-normal cursor-pointer hover:border-2 transition-colors duration-150 text-blue-300/70 flex justify-center gap-1 items-center text-sm p-2"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.3358 0.75H2.16421C1.38316 0.75 0.75 1.38317 0.75 2.16421C0.75 2.53929 0.898997 2.899 1.16421 3.16421L6.16421 8.16421C6.53929 8.53929 6.75 9.04799 6.75 9.57843V14.5139C6.75 15.2715 7.178 15.964 7.85557 16.3028L12.0264 18.3882C12.3588 18.5544 12.75 18.3127 12.75 17.941V9.57843C12.75 9.04799 12.9607 8.53929 13.3358 8.16421L18.3358 3.16421C18.601 2.899 18.75 2.53929 18.75 2.16421C18.75 1.38317 18.1168 0.75 17.3358 0.75Z"
            stroke="#0887CA"
            strokeOpacity="0.7"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        فیلتر های بیشتر
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 flex rounded-lg p-6 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* <button
                className="absolute top-2 right-2 text-gray-800 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-500 font-bold"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button> */}

              <FastFilter/>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterButton;
