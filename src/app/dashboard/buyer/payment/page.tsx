import type { Metadata } from "next";
import PaymentFilters from "@/components/Dashboard/buyer/payment/PaymentFilters";
import PaymentList from "@/components/Dashboard/buyer/payment/PaymentList";
import { getPayments } from "@/core/api/Buyer/Payment.api";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "تراکنش‌ها",
  robots: {
    index: false,
    follow: false,
  },
};

type Props = {
  searchParams: Promise<{
    page?: string;
    status?: string;
    type_label?: string;
  }>;
};

const PaymentPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const paymentsResponse = await getPayments(
    Number(params.page) || 1,
    10,
    params.status || undefined
  );

  return (
    <div>
      <div className="w-243 h-12 mx-auto mt-16 flex justify-between items-center">
        <div className="">
          لیست تراکنش های شما
          <span className="text-sm text-blue-400/60">
            ({paymentsResponse.totalCount})
          </span>
        </div>
        <Suspense fallback={null}>
          <PaymentFilters />
        </Suspense>
      </div>
      <div className="w-243 h-92 mx-auto flex flex-col gap-4 mt-5">
        <div className="h-16 rounded-2xl py-5.25 dark:bg-slate-700 pr-11 shadow-[0_0_4px] shadow-blue-200/20">
          <div className="-5.5 w-225.5 opacity-50 flex items-center">
            <span className="text-[13px] text-nowrap">تاریخ</span>
            <span className="text-[13px] text-nowrap mr-31.75">شناسه</span>
            <span className="text-[13px] text-nowrap mr-27">مبلغ</span>
            <span className="text-[13px] text-nowrap mr-22.75">وضعیت پرداخت</span>
            <span className="text-[13px] text-nowrap mr-10">توضیحات</span>
          </div>
        </div>
        <div className="h-72 flex flex-col gap-2 py-px px-0.5">
          <Suspense fallback={null}>
            <PaymentList
              payments={paymentsResponse.payments}
              typeFilter={params.type_label || ""}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;