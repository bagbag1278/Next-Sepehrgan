import { Globe, Plus } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

interface SocialLinksHeaderProps {
  onAdd: () => void;
}

export const SocialLinksHeader = ({ onAdd }: SocialLinksHeaderProps) => {
  return (
    <AdvancedScrollAnimation type="slide-right" delay={0.1}>
      <div className="bg-gradient-to-br from-slate-100 via-white to-gray-100 dark:from-slate-950 dark:via-gray-900 dark:to-slate-900 rounded-tl-[42px] rounded-br-[42px] rounded-2xl p-7 shadow-lg shadow-gray-200/70 dark:shadow-none border border-gray-200 dark:border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#0887CA1A] flex items-center justify-center">
              <Globe size={22} className="text-[#0887CAB2]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">لینک‌های اجتماعی</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">مشاهده و مدیریت لینک‌های شبکه‌های اجتماعی</p>
            </div>
          </div>
          <button
            onClick={onAdd}
            className="px-4 py-2 rounded-2xl bg-[#0887CAB2] hover:bg-[#0887CA]/90 text-white transition flex items-center gap-2"
          >
            <Plus size={18} />
            افزودن لینک جدید
          </button>
        </div>
      </div>
    </AdvancedScrollAnimation>
  );
};