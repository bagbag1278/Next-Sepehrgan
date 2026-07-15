import { Search } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

interface ChatsSearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const ChatsSearchFilter = ({ search, onSearchChange }: ChatsSearchFilterProps) => {
  return (
    <AdvancedScrollAnimation type="slide-up" delay={0.2}>
      <div className="relative w-full sm:w-96">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CAB2]" size={18} />
        <input
          type="text"
          placeholder="جستجوی اتاق یا نام کاربر..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-12 pr-10 pl-4 border border-[#0887CAB2] rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
        />
      </div>
    </AdvancedScrollAnimation>
  );
};