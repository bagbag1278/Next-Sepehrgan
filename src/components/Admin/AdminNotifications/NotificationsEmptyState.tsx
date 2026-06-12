import { Bell } from "lucide-react";

interface NotificationsEmptyStateProps {
  hasSearch: boolean;
}

export const NotificationsEmptyState = ({ hasSearch }: NotificationsEmptyStateProps) => {
  return (
    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow">
      <Bell size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
      <p className="text-gray-500 dark:text-gray-400">
        {hasSearch ? "نتیجه‌ای برای جستجوی شما یافت نشد" : "هیچ اعلانی یافت نشد"}
      </p>
    </div>
  );
};