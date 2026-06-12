import { Search, Filter, X } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

interface UsersSearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  roleFilter: "all" | "admin" | "seller" | "buyer";
  onRoleChange: (value: "all" | "admin" | "seller" | "buyer") => void;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  onResetFilters: () => void;
}

const roleOptions = [
  { value: "all", label: "همه نقش‌ها" },
  { value: "admin", label: "ادمین" },
  { value: "seller", label: "فروشنده" },
  { value: "buyer", label: "کاربر عادی" },
];

const getRoleLabel = (value: string) => {
  switch (value) {
    case "admin": return "ادمین";
    case "seller": return "فروشنده";
    case "buyer": return "کاربر عادی";
    default: return "همه نقش‌ها";
  }
};

export const UsersSearchFilter = ({
  search,
  onSearchChange,
  roleFilter,
  onRoleChange,
  isOpen,
  onOpenChange,
  onResetFilters,
}: UsersSearchFilterProps) => {
  const hasActiveFilters = roleFilter !== "all" || search;

  return (
    <AdvancedScrollAnimation type="slide-up" delay={0.2}>
      <div className="flex flex-col sm:flex-row justify-end gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CAB2]" size={18} />
          <input
            type="text"
            placeholder="جستجوی نام، ایمیل یا شماره تماس..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-12 pr-10 pl-4 border border-[#0887CAB2] rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
          />
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => onOpenChange(!isOpen)}
              className="px-5 py-3 rounded-2xl bg-white dark:bg-gray-800 text-[#0887CAB2] border border-[#0887CAB2] hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2"
            >
              <Filter size={16} />
              <span>نقش: {getRoleLabel(roleFilter)}</span>
              <svg className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isOpen && (
              <div className="absolute mt-1 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-10 overflow-hidden">
                {roleOptions.map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => { onRoleChange(opt.value as any); onOpenChange(false); }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          
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
    </AdvancedScrollAnimation>
  );
};