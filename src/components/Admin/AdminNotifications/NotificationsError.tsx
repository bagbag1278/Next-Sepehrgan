import { Bell } from "lucide-react";

interface NotificationsErrorProps {
  error: string;
  onRetry: () => void;
}

export const NotificationsError = ({ error, onRetry }: NotificationsErrorProps) => {
  return (
    <div className="text-center py-16 text-red-500 bg-white dark:bg-gray-800 rounded-2xl">
      <Bell size={40} className="mx-auto mb-3 text-red-300" />
      <p>{error}</p>
      <button
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-[#0887CAB2] text-white rounded-xl text-sm"
      >
        تلاش مجدد
      </button>
    </div>
  );
};