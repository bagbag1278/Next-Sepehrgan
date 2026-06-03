"use client";
import { useState, useEffect } from "react";
import { X, Calendar, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import TravelersModal from "./TravelersModal";

interface Booking {
  id: number;
  user_id: number;
  houseId: number;
  reservedDates?: string[];
  created_at: string;
  status?: string;
  total_price?: number;
  traveler_details?: any[];
  sharedEmail?: string;
  sharedMobile?: string;
}

interface ListBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  userName: string;
  userEmail?: string;
  userPhone?: string;
}

const ListBookingsModal = ({
  isOpen,
  onClose,
  userId,
  userName,
  userEmail,
  userPhone,
}: ListBookingsModalProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showTravelers, setShowTravelers] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const fetchUserBookings = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch("/api-proxy/admin/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const allBookings = data.data || data;
        const userBookings = allBookings.filter((b: any) => b.user_id === userId);
        setBookings(userBookings);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserBookings();
  }, [isOpen, userId]);

  const formatPersianDate = (dateStr?: string) => {
    if (!dateStr) return "نامشخص";
    const date = new Date(dateStr);
    return date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDateRange = (booking: Booking) => {
    const dates = booking.reservedDates;
    if (dates && dates.length >= 2) {
      const start = formatPersianDate(dates[0]);
      const end = formatPersianDate(dates[1]);
      return `${start} تا ${end}`;
    }
    return formatPersianDate(booking.created_at);
  };

  const handleShowTravelers = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowTravelers(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto relative shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-l from-blue-700 via-blue-800 to-indigo-900 rounded-t-2xl px-6 py-4 text-white sticky top-0 z-10">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h2 className="text-xl font-bold">لیست رزروهای {userName}</h2>
              <Link
                href={`/admin/BookingsManagement?userId=${userId}`}
                target="_blank"
                className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full flex items-center gap-1 transition"
              >
                <ExternalLink size={14} /> مشاهده همه
              </Link>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="p-6">
            {loading && (
              <div className="flex justify-center py-10 text-gray-500">در حال بارگذاری...</div>
            )}
            {!loading && bookings.length === 0 && (
              <div className="text-center py-10 text-gray-500">هیچ رزروی برای این کاربر یافت نشد.</div>
            )}
            {!loading && bookings.length > 0 && (
              <>
                <div className="hidden md:flex justify-between items-center h-[54px] bg-[#0887CA0D] dark:bg-gray-700 text-[#06042580] shadow-[0_0_8px] shadow-blue-300/30 dark:text-white  px-4 rounded-xl text-sm font-semibold mb-3">
                  <div className="w-2/3">تاریخ رزرو</div>
                  <div className="w-1/3 text-center">لینک</div>
                </div>
                <div className="flex flex-col gap-3">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white shadow-[0_0_8px] shadow-blue-300/30 dark:bg-gray-700 rounded-xl p-4  flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
                    >
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400 flex-shrink-0" />
                        <span className="text-gray-800 dark:text-white text-sm">
                          {getDateRange(booking)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleShowTravelers(booking)}
                        className="text-[#0887CAB2] text-sm flex items-center gap-1 hover:underline"
                      >
                        <ExternalLink size={14} />
                        اطلاعات مسافران
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <TravelersModal
        isOpen={showTravelers}
        onClose={() => {
          setShowTravelers(false);
          setSelectedBooking(null);
        }}
        travelers={selectedBooking?.traveler_details || []}
        mainTravelerName={userName}
        mainTravelerEmail={userEmail || ""}
        mainTravelerPhone={userPhone || ""}
      />
    </>
  );
};

export default ListBookingsModal;