"use client";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PaymentFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [paymentStatusOpen, setPaymentStatusOpen] = useState(false);
  const [paymentStatusValue, setPaymentStatusValue] = useState(
    searchParams.get("status_label") || ""
  );
  const paymentStatusDropdownRef = useRef<HTMLDivElement>(null);

  const [transactionTypeOpen, setTransactionTypeOpen] = useState(false);
  const [transactionTypeValue, setTransactionTypeValue] = useState(
    searchParams.get("type_label") || ""
  );
  const transactionTypeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (paymentStatusDropdownRef.current && !paymentStatusDropdownRef.current.contains(event.target as Node)) {
        setPaymentStatusOpen(false);
      }
      if (transactionTypeDropdownRef.current && !transactionTypeDropdownRef.current.contains(event.target as Node)) {
        setTransactionTypeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePaymentSelect = (label: string, value: string) => {
    setPaymentStatusValue(label);
    setPaymentStatusOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("status", value);
      params.set("status_label", label);
    } else {
      params.delete("status");
      params.delete("status_label");
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handleTransactionSelect = (label: string) => {
    setTransactionTypeValue(label);
    setTransactionTypeOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    if (label) {
      params.set("type_label", label);
    } else {
      params.delete("type_label");
    }
    router.push(`?${params.toString()}`);
  };

  const paymentOptions = [
    { label: "همه", value: "" },
    { label: "تایید شده", value: "confirmed" },
    { label: "در انتظار", value: "pending" },
    { label: "تایید نشده", value: "canceled" },
  ];

  const transactionOptions = ["همه", "شارژ کیف پول", "رزرو"];

  return (
    <div className="w-129 flex gap-4 h-12">
      {/* وضعیت پرداخت */}
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
          className={`absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/70 transition-transform duration-300 pointer-events-none ${paymentStatusOpen ? "rotate-180" : ""}`}
        />
        <label
          className={`absolute right-4 dark:text-blue-300 text-blue-300/70 transition-all duration-200 ease-out pointer-events-none px-1
            ${paymentStatusValue ? "-top-2 text-[12px] backdrop-blur-md rounded-md" : "peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-[12px]"}`}
        >
          وضعیت پرداخت
        </label>
        {paymentStatusOpen && (
          <div className="absolute top-14 left-0 w-full bg-white dark:bg-slate-700 border dark:border-blue-300 border-blue-300/50 rounded-2xl shadow-xl z-20 p-2 animate-in fade-in zoom-in duration-200">
            <ul className="text-[13px] text-blue-300">
              {paymentOptions.map((item) => (
                <li
                  key={item.value}
                  onClick={() => handlePaymentSelect(item.label, item.value)}
                  className="p-2 hover:bg-blue-50 dark:hover:bg-slate-600 cursor-pointer rounded-lg transition-colors"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* نوع تراکنش — کلاینت ساید */}
      <div className="relative w-62.5" ref={transactionTypeDropdownRef}>
        <input
          type="text"
          placeholder=" "
          value={transactionTypeValue}
          readOnly
          onClick={() => setTransactionTypeOpen(!transactionTypeOpen)}
          className="peer w-full border dark:border-blue-300 border-blue-300/50 text-blue-300 text-[13px] pt-1 px-4 h-12 outline-0 rounded-2xl cursor-pointer transition-colors duration-300"
        />
        <ChevronDown
          size={24}
          className={`absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/70 transition-transform duration-300 pointer-events-none ${transactionTypeOpen ? "rotate-180" : ""}`}
        />
        <label
          className={`absolute right-4 dark:text-blue-300 text-blue-300/70 transition-all duration-200 ease-out pointer-events-none px-1
            ${transactionTypeValue ? "-top-2 text-[12px] backdrop-blur-md rounded-md" : "peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-[12px]"}`}
        >
          نوع تراکنش
        </label>
        {transactionTypeOpen && (
          <div className="absolute top-14 left-0 w-full bg-white dark:bg-slate-700 border border-blue-300/50 rounded-2xl shadow-xl z-20 p-2 animate-in fade-in zoom-in duration-200">
            <ul className="text-[13px] text-blue-300">
              {transactionOptions.map((item) => (
                <li
                  key={item}
                  onClick={() => handleTransactionSelect(item === "همه" ? "" : item)}
                  className="p-2 hover:bg-blue-50 dark:hover:bg-slate-600 cursor-pointer rounded-lg transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentFilters;