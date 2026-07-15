import { Search, Filter, X } from "lucide-react";

interface SearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  onOpenFilter: () => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const SearchFilter = ({
  search,
  onSearchChange,
  onOpenFilter,
  onResetFilters,
  hasActiveFilters,
}: SearchFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-end gap-4">
      <div className="relative w-full sm:w-96">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CAB2]" size={18} />
        <input
          type="text"
          placeholder="جستجوی شناسه، نام ملک یا کاربر..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-12 pr-10 pl-4 border border-[#0887CAB2] rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
        />
      </div>
      <div className="flex gap-3">
        <button
          onClick={onOpenFilter}
          className="px-4 py-2 rounded-2xl bg-white dark:bg-gray-800 text-[#0887CAB2] border border-[#0887CAB2] hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2"
        >
          <Filter size={18} />
          <span className="hidden sm:inline">فیلتر بیشتر</span>
        </button>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition flex items-center gap-2"
          >
            <X size={18} />
            <span className="hidden sm:inline">پاک کردن</span>
          </button>
        )}
      </div>
    </div>
  );
};