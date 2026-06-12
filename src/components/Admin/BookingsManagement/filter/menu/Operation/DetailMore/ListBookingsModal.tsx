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

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";

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

  const getToken = () => localStorage.getItem("accessToken");

  useEffect(() => {
    if (!isOpen) return;
    
    const fetchUserBookings = async () => {
      setLoading(true);
      try {
        const token = getToken();
        if (!token) {
          console.error("توکن یافت نشد");
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/admin/bookings`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();
        const allBookings = result.data || result;
        const userBookings = Array.isArray(allBookings) 
          ? allBookings.filter((b: any) => b.user_id === userId)
          : [];
        setBookings(userBookings);
      } catch (error) {
        console.error("خطا در دریافت رزروها:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserBookings();
  }, [isOpen, userId]);

  const formatPersianDate = (dateStr?: string) => {
    if (!dateStr) return "نامشخص";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "نامشخص";
      return date.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "نامشخص";
    }
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
          <div className="  rounded-t-2xl px-6 py-4 text-white sticky top-0 z-10">
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
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="p-6">
            {loading && (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0887CAB2]"></div>
              </div>
            )}
            
            {!loading && bookings.length === 0 && (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                هیچ رزروی برای این کاربر یافت نشد.
              </div>
            )}
            
            {!loading && bookings.length > 0 && (
              <>
                <div className="hidden md:flex justify-between items-center h-[54px] bg-[#0887CA0D] dark:bg-gray-700 text-[#06042580] shadow-[0_0_8px] shadow-blue-300/30 dark:text-gray-300 px-4 rounded-xl text-sm font-semibold mb-3">
                  <div className="w-2/3">تاریخ رزرو</div>
                  <div className="w-1/3 text-center">اطلاعات</div>
                </div>
                <div className="flex flex-col gap-3">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white dark:bg-gray-700/50 shadow-[0_0_8px] shadow-blue-300/30 rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
                    >
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400 flex-shrink-0" />
                        <span className="text-gray-800 dark:text-gray-200 text-sm">
                          {getDateRange(booking)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleShowTravelers(booking)}
                        className="text-[#0887CAB2]  text-sm flex items-center gap-1 hover:underline transition"
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