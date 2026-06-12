"use client";
import { Payment } from "@/core/api/Buyer/Payment.api";
import { useSearchParams } from "next/navigation";
import PaymentFish from "./PaymentFish";
import AnimatedCard from "@/components/ui/AnimatedCard";

type Props = {
  payments: Payment[];
  typeFilter: string;
};

const PaymentList = ({ payments, typeFilter }: Props) => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type_label") || typeFilter;

  const filtered = type && type !== "همه"
    ? payments.filter((p) => p.description?.includes(type))
    : payments;

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2">
        <span className="text-5xl">💳</span>
        <span className="text-blue-300 text-lg">هیچ تراکنشی وجود ندارد</span>
      </div>
    );
  }

  return (
    <>
      {filtered.map((payment, index) => (
        <AnimatedCard key={payment.id} index={index}>
          <PaymentFish payment={payment} />
        </AnimatedCard>
      ))}
    </>
  );
};

export default PaymentList;