import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

export const BookingTableHeader = () => (
  <AdvancedScrollAnimation type="fade" delay={0.3}>
    <div className="hidden md:flex items-center justify-between h-16 rounded-xl px-5 font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 shadow-[0_0_8px] shadow-blue-300/30">
      <div className="w-[20%]">نام ملک</div>
      <div className="w-[14%]">نام کاربر</div>
      <div className="w-[12%]">تاریخ رزرو</div>
      <div className="w-[12%]">زمان رزرو</div>
      <div className="w-[12%]">تاریخ‌های اقامت</div>
      <div className="w-[10%]">مبلغ</div>
      <div className="w-[8%]">وضعیت</div>
    </div>
  </AdvancedScrollAnimation>
);