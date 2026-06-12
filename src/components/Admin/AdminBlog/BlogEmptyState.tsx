import { FileText } from "lucide-react";

interface BlogEmptyStateProps {
  hasSearch: boolean;
}

export const BlogEmptyState = ({ hasSearch }: BlogEmptyStateProps) => {
  return (
    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow">
      <FileText size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
      <p className="text-gray-500 dark:text-gray-400">
        {hasSearch ? "نتیجه‌ای برای جستجوی شما یافت نشد" : "هیچ پستی یافت نشد"}
      </p>
    </div>
  );
};