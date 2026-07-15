import { Check, CheckCheck } from "lucide-react";
import { Notification } from "../../../core/api/UsAdmin/useNotifications";
interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
  formatDate: (date: string) => string;
  formatTime: (date: string) => string;
}

export const NotificationCard = ({
  notification,
  onMarkAsRead,
  formatDate,
  formatTime,
}: NotificationCardProps) => {
  const isRead = notification.isRead;

  return (
    <div className={`rounded-2xl p-4 border transition-all shadow-[0_0_8px] shadow-blue-300/20 hover:shadow-blue-300/40 ${
      !isRead
        ? "bg-blue-50/60 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800/30"
        : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700"
    }`}>
      
      {/* Mobile View */}
      <div className="flex flex-col gap-2 md:hidden">
        <p className="font-medium text-gray-800 dark:text-white text-sm">{notification.title || "بدون عنوان"}</p>
        <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2">{notification.message}</p>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-400">{formatDate(notification.createdAt)}</span>
          {!isRead ? (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs transition-colors"
            >
              <CheckCheck size={12} className="inline ml-1" />
              خوانده شد
            </button>
          ) : (
            <span className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-xs">
              <Check size={12} className="inline ml-1" />
              خوانده شده
            </span>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex md:items-center justify-between w-full">
        {/* Unread Dot */}
        <div className="w-2 flex-shrink-0">
          {!isRead && <span className="block w-2 h-2 rounded-full bg-[#0887CAB2]" />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 px-3">
          <p className="font-medium text-gray-800 dark:text-white text-sm truncate">{notification.title || "بدون عنوان"}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 truncate">{notification.message}</p>
        </div>

        {/* Date */}
        <div className="w-32 text-center text-sm text-gray-500 dark:text-gray-400">
          {formatDate(notification.createdAt)}
        </div>

        {/* Time */}
        <div className="w-24 text-center text-sm text-gray-500 dark:text-gray-400">
          {formatTime(notification.createdAt)}
        </div>

        {/* Status */}
        <div className="w-32 flex justify-center">
          {!isRead ? (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs transition-colors flex items-center gap-1"
            >
              <CheckCheck size={12} />
              خوانده شد
            </button>
          ) : (
            <span className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-xs flex items-center gap-1">
              <Check size={12} />
              خوانده شده
            </span>
          )}
        </div>
      </div>
    </div>
  );
};