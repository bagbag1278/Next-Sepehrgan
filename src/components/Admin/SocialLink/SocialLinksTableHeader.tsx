import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

export const SocialLinksTableHeader = () => {
  return (
    <AdvancedScrollAnimation type="fade" delay={0.3}>
      <div className="hidden md:flex items-center justify-between h-16 rounded-xl px-5 font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 shadow-[0_0_8px] shadow-blue-300/30">
        <div className="w-[20%] text-center">پلتفرم</div>
        <div className="w-[55%]">آدرس لینک</div>
        <div className="w-[25%] text-center">عملیات</div>
      </div>
    </AdvancedScrollAnimation>
  );
};