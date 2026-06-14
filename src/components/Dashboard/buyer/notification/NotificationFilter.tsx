"use client";

import { markAllAsRead } from "@/core/api/Buyer/Notification.client.api";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const NotificationFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // مقدار اولیه از URL میخونیم
  const getInitialLabel = () => {
    const isRead = searchParams.get("isRead");
    if (isRead === "true") return "خوانده شده";
    if (isRead === "false") return "خوانده نشده";
    return "همه";
  };
  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      router.refresh();
    } catch (error) {
      console.error("خطا در علامت گذاری:", error);
    }
  };
  const [paymentStatusOpen, setPaymentStatusOpen] = useState(false);
  const [paymentStatusValue, setPaymentStatusValue] = useState(getInitialLabel);
  const paymentStatusDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        paymentStatusDropdownRef.current &&
        !paymentStatusDropdownRef.current.contains(event.target as Node)
      ) {
        setPaymentStatusOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePaymentSelect = (item: string) => {
    setPaymentStatusValue(item);

    if (item === "خوانده نشده") {
      router.push(`${pathname}?isRead=true`);
    } else {
      router.push(pathname);
    }

    setPaymentStatusOpen(false);
  };

  const paymentOptions = ["همه", "خوانده نشده"]; // خوانده نشده حذف شد

  return (
    <div className="w-129 flex gap-4 h-12">
      <div className="relative w-62.5" ref={paymentStatusDropdownRef}>
        <input
          type="text"
          placeholder=" "
          value={paymentStatusValue}
          readOnly
          onClick={() => setPaymentStatusOpen(!paymentStatusOpen)}
          className="peer w-full border dark:border-blue-300 border-blue-300/50 text-blue-300 text-[13px] pt-1 px-4 h-12 outline-0 rounded-2xl cursor-pointer transition-colors duration-300"
        />
        <ChevronDown
          size={24}
          className={`absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/70 transition-transform duration-300 pointer-events-none ${
            paymentStatusOpen ? "rotate-180" : ""
          }`}
        />
        <label
          className={`absolute right-4 dark:text-blue-300 text-blue-300/70 transition-all duration-200 ease-out pointer-events-none px-1
            ${
              paymentStatusValue && paymentStatusValue !== "همه"
                ? "-top-2 text-[12px] backdrop-blur-md rounded-md peer-focus:top-0"
                : "-top-2 text-sm backdrop-blur-md peer-focus:top-0 peer-focus:text-[12px]"
            }
          `}
        >
          نوع اعلان
        </label>

        {paymentStatusOpen && (
          <div className="absolute top-14 left-0 w-full bg-white border dark:border-blue-300 border-blue-300/50 rounded-2xl shadow-xl z-20 p-2 animate-in fade-in zoom-in duration-200">
            <ul className="text-[13px] text-blue-300">
              {paymentOptions.map((item) => (
                <li
                  key={item}
                  onClick={() => handlePaymentSelect(item)}
                  className="p-2 hover:bg-blue-50 cursor-pointer rounded-lg transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        type="button"
        className="h-12 w-65 text-nowrap text-sm cursor-pointer hover:opacity-75 transition-opacity duration-200 font-bold rounded-2xl py-3 px-5 bg-blue-100 text-white text-center"
        onClick={handleMarkAllAsRead}
      >
        علامت گذاری به عنوان خوانده شده
      </button>
    </div>
  );
};

export default NotificationFilter;
