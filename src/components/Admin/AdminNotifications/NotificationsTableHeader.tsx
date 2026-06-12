import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

export const NotificationsTableHeader = () => {
  return (
    <AdvancedScrollAnimation type="fade" delay={0.3}>
      <div className="hidden md:flex items-center justify-between h-16 rounded-xl px-5 font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 shadow-[0_0_8px] shadow-blue-300/30">
        <div className="flex-1">اعلان</div>
        <div className="w-32 text-center">تاریخ</div>
        <div className="w-24 text-center">زمان</div>
        <div className="w-32 text-center">وضعیت</div>
      </div>
    </AdvancedScrollAnimation>
  );
};