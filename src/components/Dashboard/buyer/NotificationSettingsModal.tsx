"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationSettingsModal({
  isOpen,
  onClose,
}: NotificationSettingsModalProps) {
  const [settings, setSettings] = useState({
    reservation: true,
    payment: true,
    discount: false,
    system: true,
  });

  if (!isOpen) return null;

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const items = [
    {
      key: "reservation" as const,
      label: "نوتیفیکیشن رزرو",
    },
    {
      key: "payment" as const,
      label: "نوتیفیکیشن پرداخت",
    },
    {
      key: "discount" as const,
      label: "نوتیفیکیشن تخفیف",
    },
    {
      key: "system" as const,
      label: "نوتیفیکیشن سیستمی",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-999 flex items-center justify-center bg-black/30 backdrop-blur-[6px]"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="w-105 rounded-[36px] bg-[#F5F5F5] px-8 py-7 shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            {" "}
            <div dir="ltr">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#9FC4E8] pb-4">
                <button
                  onClick={onClose}
                  className="flex cursor-pointer hover:text-red-100 transition-colors duration-150 items-center gap-1 text-sm text-gray-500"
                >
                  <X size={16} className="text-red-500" />
                  بستن
                </button>

                <h2 className=" font-bold text-[#2F6FAE]">
                  تنظیمات نوتیفیکیشن
                </h2>
              </div>
              {/* Body */}
              <div className="mt-6 flex flex-col gap-6">
                {items.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between"
                  >
                    <button
                      type="button"
                      onClick={() => toggleSetting(item.key)}
                      className={`relative h-7 w-11 rounded-full transition-all duration-300 ${
                        settings[item.key]
                          ? "bg-green-200/10 border-2 border-green-200"
                          : "bg-blue-400/10 border-2 border-blue-400/50"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full shadow transition-all duration-300 ${
                          settings[item.key]
                            ? "right-1 bg-green-200"
                            : "left-1 bg-blue-400/50"
                        }`}
                      />
                    </button>

                    <span className=" font-bold text-[#7B7B88]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
