import type { Metadata } from "next";
import HouseSearch from "@/components/Dashboard/buyer/manegereserve/HouseSearch";
import BookingList from "@/components/Dashboard/buyer/manegereserve/BookingList";
import MoreFilterButton from "@/components/Dashboard/buyer/manegereserve/MoreFilterButton";
import Pagination from "@/components/Dashboard/buyer/Pagination";
import { getBookings } from "@/core/api/Buyer/GetBookings.api";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "مدیریت رزروها",
  robots: {
    index: false,
    follow: false,
  },
};

type Props = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    sort?: string;
    order?: string;
    house_id?: string;
  }>;
};

const ManegeReservePage = async ({ searchParams }: Props) => {
  const LIMIT = 4;
  const params = await searchParams;
  const bookings = await getBookings({
    page: Number(params.page) || 1,
    limit: LIMIT,
    sort:
      (params.sort as
        | "created_at"
        | "updated_at"
        | "check_in_date"
        | "check_out_date") || "created_at",
    order: (params.order as "ASC" | "DESC") || "DESC",
    house_id: params.house_id ? Number(params.house_id) : undefined,
  });

  const totalPages = Math.ceil(bookings.totalCount / LIMIT);

  return (
    <div className="">
      <div className="w-243 h-12 mx-auto mt-16 flex justify-between items-center">
        <div className="">
          لیست رزرو های شما{" "}
          <span className="text-sm text-blue-400/60">
            ({bookings.totalCount})
          </span>
        </div>
        <div className="w-153.5 flex gap-4 h-12">
          <Suspense fallback={null}>
            <HouseSearch />
          </Suspense>
          <MoreFilterButton />
        </div>
      </div>
      <div className="w-243 h-92 mx-auto flex flex-col gap-4 mt-5">
        <div className="h-16 rounded-2xl py-5.25 pr-14 dark:bg-slate-700 shadow-[0_0_4px] shadow-blue-200/20">
          <div className="-5.5 w-222.5 opacity-50 flex gap-24.25">
            <span className="text-[13px] text-nowrap">نام ملک</span>
            <div className="w-188 h-5.5 flex gap-20">
              <span className="text-[13px] text-nowrap">تاریخ رزرو</span>
              <span className="text-[13px] text-nowrap">زمان رزرو</span>
              <span className="text-[13px] text-nowrap">مبلغ</span>
              <div className="flex gap-13">
                <span className="text-[13px] text-nowrap">تعداد مسافر</span>
                <div className="flex gap-10">
                  <span className="text-[13px] text-nowrap">وضعیت رزرو</span>
                  <span className="text-[13px] text-nowrap">وضعیت پرداخت</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-72 flex flex-col gap-2 py-px px-0.5">
          <Suspense fallback={null}>
            <BookingList bookings={bookings.data} />
          </Suspense>
        </div>
      </div>
      <div className="w-88 h-10 mr-6 mt-5">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default ManegeReservePage;