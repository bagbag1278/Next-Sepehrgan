import type { Metadata } from "next";
import Notif from "@/components/Dashboard/buyer/notification/Notif";
import NotificationFilter from "@/components/Dashboard/buyer/notification/NotificationFilter";
import Pagination from "@/components/Dashboard/buyer/Pagination";
import AnimatedCard from "@/components/ui/AnimatedCard";
import { getNotifications } from "@/core/api/Buyer/Notification.api";
import { getUserInfo } from "@/core/token/auth";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "اعلان‌ها",
  robots: {
    index: false,
    follow: false,
  },
};

type Props = {
  searchParams: Promise<{
    isRead?: string;
    page?: string;
  }>;
};

const NotificationPage = async ({ searchParams }: Props) => {
  const user = await getUserInfo();
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const notifications = await getNotifications(
    user!.id,
    params.isRead,
    page,
    4,
  );
  const totalPages = Math.ceil(notifications.totalCount / 4);

  return (
    <div>
      <div className="w-243 h-12 mx-auto mt-16 flex justify-between items-center">
        <div>
          لیست اعلان های شما
          <span className="text-sm text-blue-400/60">
            ({notifications.totalCount})
          </span>
        </div>
        <Suspense fallback={<div>...</div>}>
          <NotificationFilter />
        </Suspense>
      </div>

      <div className="w-243 mx-auto flex flex-col gap-4 mt-5">
        <div className="h-16 rounded-2xl py-5.25 dark:bg-slate-700 pr-11 shadow-[0_0_4px] shadow-blue-200/20">
          <div className="-5.5 w-225.5 opacity-50 flex items-center">
            <span className="text-[13px] mr-38.25">اعلان</span>
            <span className="text-[13px] mr-66">تاریخ</span>
            <span className="text-[13px] mr-27">زمان</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-px px-0.5">
          {notifications.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-72 gap-3">
              <span className="text-5xl">🔔</span>
              <span className="text-blue-300 font-bold text-lg">
                هیچ اعلانی وجود ندارد
              </span>
            </div>
          ) : (
            notifications.data.map((notification, index) => (
              <AnimatedCard key={notification.id} index={index}>
                <Notif notification={notification} />
              </AnimatedCard>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex absolute top-130">
            <Suspense fallback={<div>...</div>}>
              <Pagination totalPages={totalPages} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;