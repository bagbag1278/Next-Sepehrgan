import { Calendar, Clock, User, Building2, Hash } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import ActionMenu from "../filter/menu/ActionMenu";
import { Booking } from "../../../../hooks/UsAdmin/useBookings";

interface BookingCardProps {
  booking: Booking;
  houseTitle: string;
  userName: string;
  price: number;
  reservedDates: string;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onAccept: () => void;
  onCancel: () => void;
}

export const BookingCard = ({
  booking,
  houseTitle,
  userName,
  price,
  reservedDates,
  onView,
  onEdit,
  onDelete,
  onAccept,
  onCancel,
}: BookingCardProps) => {
  const date = formatDate(booking.createdAt || booking.created_at);
  const time = formatTime(booking.createdAt || booking.created_at);

  return (
    <div className="rounded-2xl p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-all shadow-[0_0_8px] shadow-blue-300/20">
      {/* Mobile View */}
      <div className="flex flex-col gap-3 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash size={14} className="text-gray-400" />
            <span className="text-xs text-gray-500">#{booking.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={booking.status} />
            <ActionMenu
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
              onAccept={onAccept}
              onCancel={onCancel}
              canCancel={booking.status === "pending"}
              canAccept={booking.status === "pending"}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Building2 size={16} className="text-gray-400" />
          <span className="font-medium text-gray-800 dark:text-white text-sm">{houseTitle}</span>
        </div>
        <div className="flex items-center gap-2">
          <User size={16} className="text-gray-400" />
          <span className="text-gray-600 dark:text-gray-400 text-sm">{userName}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
            <Calendar size={12} /> {date}
          </div>
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
            <Clock size={12} /> {time}
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
          <Calendar size={12} />
          <span className="truncate">اقامت: {reservedDates}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-[#0887CAB2] font-bold text-sm">{price.toLocaleString()} تومان</span>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex md:items-center justify-between">
        <div className="w-[20%] flex items-center gap-2">
          <Building2 size={16} className="text-gray-400 flex-shrink-0" />
          <span className="text-gray-800 dark:text-white truncate text-sm">{houseTitle}</span>
        </div>
        <div className="w-[14%] flex items-center gap-2">
          <User size={16} className="text-gray-400 flex-shrink-0" />
          <span className="text-gray-600 dark:text-gray-400 truncate text-sm">{userName}</span>
        </div>
        <div className="w-[12%] text-gray-500 dark:text-gray-400 text-sm">{date}</div>
        <div className="w-[12%] text-gray-500 dark:text-gray-400 text-sm">{time}</div>
        <div className="w-[12%] text-gray-500 dark:text-gray-400 text-xs truncate" title={reservedDates}>
          {reservedDates}
        </div>
        <div dir="ltr" className="w-[12%] relative left-6 font-bold whitespace-nowrap truncate text-[#0887CAB2] text-sm">{price.toLocaleString()} تومان</div>
        <div className="w-[8%] flex items-center gap-3">
          <StatusBadge status={booking.status} />
          <ActionMenu
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            onAccept={onAccept}
            onCancel={onCancel}
            canCancel={booking.status === "pending"}
            canAccept={booking.status === "pending"}
          />
        </div>
      </div>
    </div>
  );
};

function formatDate(str?: string) {
  if (!str) return "—";
  try {
    const d = new Date(str);
    return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("fa-IR");
  } catch {
    return "—";
  }
}

function formatTime(str?: string) {
  if (!str) return "—";
  try {
    return new Date(str).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "—";
  }
}