import { Users } from "lucide-react";

interface UsersEmptyStateProps {
  hasFilters: boolean;
}

export const UsersEmptyState = ({ hasFilters }: UsersEmptyStateProps) => {
  return (
    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow">
      <Users size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
      <p className="text-gray-500 dark:text-gray-400">
        {hasFilters ? "نتیجه‌ای برای جستجوی شما یافت نشد" : "هیچ کاربری یافت نشد"}
      </p>
    </div>
  );
};