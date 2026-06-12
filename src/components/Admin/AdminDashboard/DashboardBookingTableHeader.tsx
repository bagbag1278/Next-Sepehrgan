import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

export const DashboardBookingTableHeader = () => {
  return (
    <AdvancedScrollAnimation type="fade" delay={0.3}>
      <div className="hidden md:flex items-center justify-between h-16 rounded-xl px-5 font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 shadow-[0_0_8px] shadow-blue-300/30">
        <div className="w-[28%]">نام ملک</div>
        <div className="w-[18%]">نام کاربر</div>
        <div className="w-[14%]">تاریخ رزرو</div>
        <div className="w-[12%]">زمان رزرو</div>
        <div className="w-[14%]">مبلغ</div>
        <div className="w-[14%]">وضعیت</div>
      </div>
    </AdvancedScrollAnimation>
  );
};