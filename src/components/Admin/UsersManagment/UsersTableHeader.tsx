import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

export const UsersTableHeader = () => {
  return (
    <AdvancedScrollAnimation type="fade" delay={0.3}>
      <div className="hidden md:flex items-center justify-between h-16 rounded-xl px-5 font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 shadow-[0_0_8px] shadow-blue-300/30">
        <div className="w-[25%]">نام کاربر</div>
        <div className="w-[20%]">ایمیل</div>
        <div className="w-[15%]">شماره تماس</div>
        <div className="w-[12%]">نقش</div>
        <div className="w-[15%]">تاریخ عضویت</div>
        <div className="w-[13%] text-center">عملیات</div>
      </div>
    </AdvancedScrollAnimation>
  );
};