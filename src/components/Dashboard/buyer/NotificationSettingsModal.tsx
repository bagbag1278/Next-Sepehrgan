"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import api from "@/core/interceptor/axiosInstance";


interface NotificationSetting {
  id: number;
  userId: number;
  notificationType: string;
  criteria: object;
  created_at: string;
  updated_at: string;
}

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TYPE_MAP: Record<string, string> = {
  new_booking: "reservation",
  new_payment: "payment",
  discount: "discount",
  system: "system",
};

const REVERSE_TYPE_MAP: Record<string, string> = {
  reservation: "new_booking",
  payment: "new_payment",
  discount: "discount",
  system: "system",
};

type SettingsKey = "reservation" | "payment" | "discount" | "system";

export default function NotificationSettingsModal({
  isOpen,
  onClose,
}: NotificationSettingsModalProps) {
  const [settings, setSettings] = useState<Record<SettingsKey, boolean>>({
    reservation: false,
    payment: false,
    discount: false,
    system: false,
  });
  const [settingIds, setSettingIds] = useState<Partial<Record<SettingsKey, number>>>({});
  const [loading, setLoading] = useState(false);
  const [togglingKey, setTogglingKey] = useState<SettingsKey | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchSettings = async () => {
      setLoading(true);
      try {
        const { data } = await api.get<NotificationSetting[]>(
          "/targeted-notifications/settings"
        );

        const newSettings = { reservation: false, payment: false, discount: false, system: false };
        const newIds: Partial<Record<SettingsKey, number>> = {};

        data.forEach((item) => {
          const key = TYPE_MAP[item.notificationType] as SettingsKey;
          if (key) {
            newSettings[key] = true;
            newIds[key] = item.id;
          }
        });

        setSettings(newSettings);
        setSettingIds(newIds);
      } catch (err) {
        console.error("خطا در دریافت تنظیمات:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [isOpen]);

  const toggleSetting = async (key: SettingsKey) => {
    const isActive = settings[key];
    setTogglingKey(key);

    try {
      if (isActive) {
        const id = settingIds[key];
        await api.delete(`/targeted-notifications/settings/${id}`);

        setSettings((prev) => ({ ...prev, [key]: false }));
        setSettingIds((prev) => {
          const updated = { ...prev };
          delete updated[key];
          return updated;
        });
      } else {
        const { data } = await api.post<NotificationSetting>(
          "/targeted-notifications/settings",
          { notificationType: REVERSE_TYPE_MAP[key], criteria: {} }
        );

        setSettings((prev) => ({ ...prev, [key]: true }));
        setSettingIds((prev) => ({ ...prev, [key]: data.id }));
      }
    } catch (err) {
      console.error("خطا در تغییر تنظیمات:", err);
    } finally {
      setTogglingKey(null);
    }
  };

  const items = [
    { key: "reservation" as const, label: "نوتیفیکیشن رزرو" },
    { key: "payment" as const, label: "نوتیفیکیشن پرداخت" },
    { key: "discount" as const, label: "نوتیفیکیشن تخفیف" },
    { key: "system" as const, label: "نوتیفیکیشن سیستمی" },
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
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
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
                <h2 className="font-bold text-[#2F6FAE]">تنظیمات نوتیفیکیشن</h2>
              </div>

              {/* Body */}
              {loading ? (
                <div className="mt-6 flex justify-center text-sm text-gray-400">
                  در حال بارگذاری...
                </div>
              ) : (
                <div className="mt-6 flex flex-col gap-6">
                  {items.map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => toggleSetting(item.key)}
                        disabled={togglingKey === item.key}
                        className={`relative h-7 w-11 rounded-full transition-all duration-300 disabled:opacity-50 ${
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
                      <span className="font-bold text-[#7B7B88]">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}