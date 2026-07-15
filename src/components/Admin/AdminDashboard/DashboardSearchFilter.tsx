import { Search } from "lucide-react";

interface DashboardSearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const DashboardSearchFilter = ({ searchTerm, onSearchChange }: DashboardSearchFilterProps) => {
  return (
    <div className="flex justify-start">
      <div className="relative w-full sm:w-80">
        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CAB2]" />
        <input
          type="text"
          placeholder="جستجوی شناسه یا نام ملک..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pr-9 pl-4 py-3 border border-[#0887CAB2] rounded-2xl text-sm w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
        />
      </div>
    </div>
  );
};