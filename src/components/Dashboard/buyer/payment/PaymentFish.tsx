"use client";
import Accept from "@/components/landing/components/HeroSction/Icon/dashboard/Accept";
import Decline from "@/components/landing/components/HeroSction/Icon/dashboard/Decline";
import Reeject from "@/components/landing/components/HeroSction/Icon/dashboard/Reeject";
import { digitsEnToFa, addCommas } from "@persian-tools/persian-tools";
import { useState } from "react";
import { Payment } from "@/core/api/Buyer/Payment.api";
import ReceiptModal from "./ReceiptModal";

interface PaymentFishProps {
  payment: Payment;
}

const PaymentFish = ({ payment }: PaymentFishProps) => {
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  return (
    <>
      <div className="h-16 rounded-2xl dark:bg-slate-600 shadow-[0_0_4px] hover:dark:shadow-slate-700 hover:shadow-[0_0_10px] transition-shadow duration-200 flex items-center shadow-blue-200/20 py- px-6">
        <span className="text-[13px] mr-px">
          {payment.createdAt ?? "—"}
        </span>
        <span className="text-[13px] mr-20.25">
          {digitsEnToFa(payment.id.toString())}
        </span>
        <span className="text-[13px] mr-15.25 text-blue-300 font-bold">
          {digitsEnToFa(addCommas(Math.round(Number(payment.amount)).toString()))} تومان
        </span>
        <span className="mr-23">
          {payment.status === "confirmed" && <Accept />}
          {payment.status === "pending" && <Decline />}
          {payment.status === "canceled" && <Reeject />}
        </span>
        <span className="text-[13px] mr-19.75 truncate max-w-40">
          {payment.description ?? "—"}
        </span>
        {/* دکمه رسید */}
        <button
          onClick={() => setIsReceiptOpen(true)}
          className="mr-auto text-[12px] text-blue-400 border border-blue-300/50 rounded-xl px-3 py-1.5 hover:bg-blue-300/10 transition-colors cursor-pointer text-nowrap"
        >
          مشاهده رسید
        </button>
      </div>

      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        payment={payment}
      />
    </>
  );
};

export default PaymentFish;