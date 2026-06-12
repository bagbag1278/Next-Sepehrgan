import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

export const PaymentsTableHeader = () => {
  return (
    <AdvancedScrollAnimation type="fade" delay={0.3}>
      <div className="hidden md:flex items-center justify-between h-16 rounded-xl px-5 font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 shadow-[0_0_8px] shadow-blue-300/30">
        <div className="w-[8%]">شناسه</div>
        <div className="w-[15%]">کاربر</div>
        <div className="w-[12%]">مبلغ</div>
        <div className="w-[12%]">وضعیت</div>
        <div className="w-[10%]">تاریخ</div>
        <div className="w-[8%]">زمان</div>
        <div className="w-[15%]">توضیحات</div>
        <div className="w-[10%]">کد تراکنش</div>
        <div className="w-[10%] text-center">عملیات</div>
      </div>
    </AdvancedScrollAnimation>
  );
};