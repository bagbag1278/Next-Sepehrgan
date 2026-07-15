import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

export const HotelsTableHeader = () => {
  return (
    <AdvancedScrollAnimation type="fade" delay={0.3}>
      <div className="hidden md:flex items-center justify-between h-[64px] rounded-[16px] px-5 font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 shadow-[0_0_8px] shadow-blue-300/30">
        <div className="w-[22%]">نام هتل</div>
        <div className="w-[25%]">آدرس</div>
        <div className="w-[15%]">قیمت</div>
        <div className="w-[10%]">امتیاز</div>
        <div className="w-[18%]">فروشنده</div>
        <div className="w-[10%] text-center">عملیات</div>
      </div>
    </AdvancedScrollAnimation>
  );
};