import { Bell } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

interface NotificationsHeaderProps {
  totalCount: number;
  unreadCount: number;
}

export const NotificationsHeader = ({ totalCount, unreadCount }: NotificationsHeaderProps) => {
  return (
    <AdvancedScrollAnimation type="slide-right" delay={0.1}>
      <div className="bg-gradient-to-br from-slate-100 via-white to-gray-100 dark:from-slate-950 dark:via-gray-900 dark:to-slate-900 rounded-tl-[42px] rounded-br-[42px] rounded-2xl p-7 shadow-lg shadow-gray-200/70 dark:shadow-none border border-gray-200 dark:border-gray-700/50">
        <div className="flex items-center gap-3">

          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">اعلان‌ها</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              لیست اعلان‌های شما ({totalCount} مورد
              {unreadCount > 0 && (
                <span className="mr-1 text-[#0887CAB2] font-medium">— {unreadCount} خوانده نشده</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </AdvancedScrollAnimation>
  );
};