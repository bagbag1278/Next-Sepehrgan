import { formatPersianDate } from "@/components/utils/formatPersianDate";
import { Notification } from "@/core/types/buyer/Favorite/notification/INotification";
import React from "react";
import { FaCheck } from "react-icons/fa";

interface NotifProps {
  notification: Notification;
}

const Notif = ({ notification }: NotifProps) => {
  const date = new Date(notification.createdAt);

  return (
    <div className="h-16 rounded-2xl dark:bg-slate-600 shadow-[0_0_4px] hover:dark:shadow-slate-700 hover:shadow-[0_0_10px] transition-shadow duration-200 flex items-center px-6 shadow-blue-200/20">
      <span className="text-[13px] text-center w-81 text-nowrap truncate font-bold mr-px">
        {notification.title}
      </span>

      <span className="text-[13px] mr-28">
        {formatPersianDate(notification.createdAt)}
      </span>

      <span className="text-[13px] mr-21">
        {date.toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>

      <div
        className={`py-0.5 px-3.5  flex gap-1 rounded-full ${
          notification.isRead
            ? "bg-blue-400/80 text-white mr-42"
            : "bg-green-200 mr-15"
        }`}
      >
        <FaCheck />

        <span className="text-[11px]">
          {notification.isRead
            ? "خوانده شده"
            : "علامت گذاری به عنوان خوانده شده"}
        </span>
      </div>
    </div>
  );
};

export default Notif;
