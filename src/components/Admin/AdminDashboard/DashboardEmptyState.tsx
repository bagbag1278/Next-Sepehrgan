import { CalendarCheck } from "lucide-react";

export const DashboardEmptyState = () => {
  return (
    <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-2xl">
      <CalendarCheck size={40} className="mx-auto mb-2 text-gray-300 dark:text-gray-600" />
      <p>هیچ رزروی یافت نشد</p>
    </div>
  );
};