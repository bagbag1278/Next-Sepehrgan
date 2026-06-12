import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

export const BlogTableHeader = () => {
  return (
    <AdvancedScrollAnimation type="fade" delay={0.3}>
      <div className="hidden md:flex items-center justify-between h-16 rounded-xl px-5 font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 shadow-[0_0_8px] shadow-blue-300/30">
        <div className="w-[30%]">عنوان</div>
        <div className="w-[15%]">نویسنده</div>
        <div className="w-[12%]">دسته‌بندی</div>
        <div className="w-[10%]">وضعیت</div>
        <div className="w-[12%]">تاریخ</div>
        <div className="w-[10%]">بازدید</div>
        <div className="w-[11%] text-center">عملیات</div>
      </div>
    </AdvancedScrollAnimation>
  );
};