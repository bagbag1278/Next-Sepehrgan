import { Home, MapPin, Star, User } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import ActionMenu from "@/components/Admin/HotelsManagement/more/ActionMenu";

interface HotelCardProps {
  hotel: any;
  index: number;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const HotelCard = ({ hotel, index, onView, onEdit, onDelete }: HotelCardProps) => {
  return (
    <AdvancedScrollAnimation type="slide-up" delay={0.4 + index * 0.05} duration={0.4}>
      <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 rounded-[16px] bg-white dark:bg-gray-800 hover:shadow-lg transition-all shadow-[0_0_8px] shadow-blue-300/20">
        {/* Mobile View */}
        <div className="flex flex-col gap-2 md:hidden">
          <div className="flex items-center gap-2">
            <Home size={16} className="text-gray-400" />
            <span className="font-medium text-gray-800 dark:text-white">{hotel.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{hotel.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{hotel.sellerName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              <span className="text-gray-700 dark:text-gray-300">{hotel.rate}</span>
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#0887CAB2] font-bold">{hotel.price?.toLocaleString()} تومان</span>
            <ActionMenu onEdit={onEdit} onDelete={onDelete} onView={onView} />
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex md:items-center justify-between w-full">
          <div className="w-[22%] flex items-center gap-2">
            <Home size={16} className="text-gray-400" />
            <span className="truncate text-gray-800 dark:text-white">{hotel.title}</span>
          </div>
          <div className="w-[25%] flex items-center gap-2">
            <MapPin size={16} className="text-gray-400" />
            <span className="truncate text-gray-600 dark:text-gray-400">{hotel.address}</span>
          </div>
          <div className="w-[15%] font-bold text-[#0887CAB2]">{hotel.price?.toLocaleString()} تومان</div>
          <div className="w-[10%] flex items-center gap-1">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="text-gray-700 dark:text-gray-300">{hotel.rate}</span>
          </div>
          <div className="w-[18%] flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <User size={14} className="text-gray-400" />
            <span className="truncate">{hotel.sellerName}</span>
          </div>
          <div className="w-[10%] flex justify-center">
            <ActionMenu onEdit={onEdit} onDelete={onDelete} onView={onView} />
          </div>
        </div>
      </div>
    </AdvancedScrollAnimation>
  );
};