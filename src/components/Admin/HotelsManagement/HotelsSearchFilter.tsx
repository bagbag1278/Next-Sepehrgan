import { Search, X } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

interface HotelsSearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  onResetFilters: () => void;
}

export const HotelsSearchFilter = ({
  search,
  onSearchChange,
  onResetFilters,
}: HotelsSearchFilterProps) => {
  return (
    <AdvancedScrollAnimation type="slide-up" delay={0.2}>
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CAB2]" size={18} />
          <input
            type="text"
            placeholder="جستجوی نام هتل، آدرس یا نام فروشنده..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-[48px] pr-10 pl-4 py-2.5 border border-[#0887CAB2] text-gray-700 dark:text-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0887CAB2] transition-all bg-white dark:bg-gray-800"
          />
        </div>
        {search && (
          <button
            onClick={onResetFilters}
            className="px-3 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all flex items-center gap-2"
          >
            <X size={18} />
            <span className="hidden sm:inline">پاک کردن</span>
          </button>
        )}
      </div>
    </AdvancedScrollAnimation>
  );
};