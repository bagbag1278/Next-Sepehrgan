import { Home, User, Calendar, Clock, CalendarCheck } from "lucide-react";
import { StatusBadge } from "@/components/Admin/BookingsManagement/filter/StatusBadge";
import ActionMenu from "@/components/Admin/HotelsManagement/more/ActionMenu";

interface DashboardBookingCardProps {
  booking: any;
  houseTitle: string;
  userName: string;
  price: number;
  bookingDate?: string;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return "—";
  try {
    return new Date(dateString).toLocaleDateString("fa-IR");
  } catch {
    return "—";
  }
};

const formatTime = (dateString?: string) => {
  if (!dateString) return "—";
  try {
    return dateString.split("T")[1]?.slice(0, 5) || "—";
  } catch {
    return "—";
  }
};

export const DashboardBookingCard = ({
  booking,
  houseTitle,
  userName,
  price,
  bookingDate: rawDate,
  onView,
  onEdit,
  onDelete,
}: DashboardBookingCardProps) => {
  const date = formatDate(rawDate || booking.created_at);
  const time = formatTime(rawDate || booking.created_at);
  const formattedPrice = Number(price).toLocaleString("fa-IR");

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 rounded-2xl bg-white dark:bg-gray-800 hover:shadow-lg transition-all shadow-[0_0_8px] shadow-blue-300/20">
      {/* Mobile View */}
      <div className="flex flex-col gap-2 md:hidden">
        <div className="flex items-center gap-2">
          <Home size={16} className="text-gray-400" />
          <span className="font-medium text-gray-800 dark:text-white">{houseTitle}</span>
        </div>
        <div className="flex items-center gap-2">
          <User size={16} className="text-gray-400" />
          <span className="text-gray-600 dark:text-gray-400">{userName}</span>
        </div>
        <div className="flex justify-between">
          <span className="flex items-center gap-1 text-gray-500"><Calendar size={14} /> {date}</span>
          <span className="flex items-center gap-1 text-gray-500"><Clock size={14} /> {time}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#0887CAB2] font-bold">{formattedPrice} تومان</span>
          <div className="flex items-center gap-2">
            <StatusBadge status={booking.status} />
            <ActionMenu onView={onView} onEdit={onEdit} onDelete={onDelete} />
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex md:items-center justify-between w-full">
        <div className="w-[28%] flex items-center gap-2">
          <Home size={16} className="text-gray-400" />
          <span className="truncate text-gray-800 dark:text-white">{houseTitle}</span>
        </div>
        <div className="w-[18%] flex items-center gap-2">
          <User size={16} className="text-gray-400" />
          <span className="truncate text-gray-600 dark:text-gray-400">{userName}</span>
        </div>
        <div className="w-[14%] text-gray-500">{date}</div>
        <div className="w-[12%] text-gray-500">{time}</div>
        <div className="w-[18%] font-bold text-[#0887CAB2]">{formattedPrice} تومان</div>
        <div className="w-[12%] flex items-center gap-2">
          <StatusBadge status={booking.status} />
          <ActionMenu onView={onView} onEdit={onEdit} onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
};