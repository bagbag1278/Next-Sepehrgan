import { Search, X } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

interface SocialLinksSearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  onResetFilters: () => void;
}

export const SocialLinksSearchFilter = ({
  search,
  onSearchChange,
  onResetFilters,
}: SocialLinksSearchFilterProps) => {
  return (
    <AdvancedScrollAnimation type="slide-up" delay={0.2}>
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CAB2]" size={18} />
          <input
            type="text"
            placeholder="جستجوی پلتفرم یا آدرس..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-12 pr-10 pl-4 border border-[#0887CAB2] rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
          />
        </div>
        {search && (
          <button
            onClick={onResetFilters}
            className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition flex items-center gap-2"
          >
            <X size={18} />
            <span className="hidden sm:inline">پاک کردن</span>
          </button>
        )}
      </div>
    </AdvancedScrollAnimation>
  );
};