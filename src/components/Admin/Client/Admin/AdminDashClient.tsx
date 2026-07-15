"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";


import EditBookingModal from "@/components/Admin/BookingsManagement/filter/menu/Operation/EditBookingModal";
import DeleteBookingModal from "@/components/Admin/BookingsManagement/filter/menu/Operation/DeleteBookingModal";

import { DashboardStatsCards } from "@/components/Admin/AdminDashboard/DashboardStatsCards";
import { DashboardSearchFilter } from "@/components/Admin/AdminDashboard/DashboardSearchFilter";
import { DashboardBookingTableHeader } from "@/components/Admin/AdminDashboard/DashboardBookingTableHeader";
import { DashboardBookingCard } from "@/components/Admin/AdminDashboard/DashboardBookingCard";
import DetailAdminDash from "@/components/Admin/AdminDashboard/Detail.tsx/DetailAdminDash";
import { DashboardEmptyState } from "@/components/Admin/AdminDashboard/DashboardEmptyState";
import { useAdminDashboard } from "@/core/api/UsAdmin/useAdminDashboard";
import Pagination from "../../Pagination/PaginationAdmin";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";

interface Booking {
  id: number;
  user_id: number;
  houseId: number;
  status: string;
  total_price?: number;
  price?: number;
  created_at?: string;
  reservedDates?: string[];
  traveler_details?: any[];
  sharedEmail?: string;
  sharedMobile?: string;
}

const AdminDashClient = () => {
  const router = useRouter();
  const {
    stats,
    bookings,
    houses,
    loading,
    fetchStats,
    fetchBookings,
    updateBooking,
    deleteBooking,
    getHouseTitle,
    getHousePrice,
    getUserName,
    getUserEmail,
    getUserPhone,
  } = useAdminDashboard();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) router.push("/login");
    else {
      fetchStats();
      fetchBookings();
    }
  }, []);

  const filteredBookings = bookings.filter((booking: Booking) => {
    if (!searchTerm) return true;
    const houseTitle = getHouseTitle(booking.houseId);
    return houseTitle.includes(searchTerm) || String(booking.id).includes(searchTerm);
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailOpen(true);
  };

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsEditOpen(true);
  };

  const handleDelete = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDeleteOpen(true);
  };

  const confirmEdit = async (data: any) => {
    if (!selectedBooking) return;

    const loadingToast = toast.loading("در حال ویرایش...");

    try {
      await updateBooking(selectedBooking.id, {
        status: data.status,
        total_price: data.price,
        reservedDates: data.reservedDates,
      });

      toast.success("رزرو با موفقیت ویرایش شد", { id: loadingToast });
      await fetchBookings();
      await fetchStats();
      setIsEditOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error(error);
      toast.error("خطا در ویرایش رزرو", { id: loadingToast });
    }
  };

  const confirmDelete = async () => {
    if (!selectedBooking) return;

    const loadingToast = toast.loading("در حال حذف...");

    try {
      await deleteBooking(selectedBooking.id);
      toast.success("رزرو با موفقیت حذف شد", { id: loadingToast });
      await fetchBookings();
      await fetchStats();
      setIsDeleteOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error(error);
      toast.error("خطا در حذف رزرو", { id: loadingToast });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0887CAB2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="px-4 sm:px-8 py-6 space-y-6  overflow-hidden">
      <AdvancedScrollAnimation type="slide-right" delay={0.1}>
        <div className="bg-gradient-to-br from-slate-100 via-white to-gray-100 dark:from-slate-950 dark:via-gray-900 dark:to-slate-900 rounded-tl-[42px] rounded-br-[42px] rounded-2xl p-7 shadow-lg shadow-gray-200/70 dark:shadow-none border border-gray-200 dark:border-gray-700/50">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">پنل مدیریت</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">به پنل مدیریت خوش آمدید</p>
        </div>
      </AdvancedScrollAnimation>

      <DashboardStatsCards stats={stats} />

      <DashboardSearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <DashboardBookingTableHeader />

      <div className="flex flex-col gap-3">
        {paginatedBookings.map((booking: Booking, idx: number) => (
          <DashboardBookingCard
            key={booking.id}
            booking={booking}
            houseTitle={getHouseTitle(booking.houseId)}
            userName={getUserName(booking.user_id)}
            price={getHousePrice(booking.houseId)}
            bookingDate={booking.created_at}
            onView={() => handleViewDetails(booking)}
            onEdit={() => handleEdit(booking)}
            onDelete={() => handleDelete(booking)}
          />
        ))}
      </div>

      {filteredBookings.length > 0 && totalPages > 1 && (
        <AdvancedScrollAnimation type="fade" delay={0.6}>
          <div className="flex justify-start pt-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </AdvancedScrollAnimation>
      )}

      {filteredBookings.length === 0 && !loading && <DashboardEmptyState />}

      <DetailAdminDash
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        booking={selectedBooking}
        userName={getUserName(selectedBooking?.user_id || 0)}
        userEmail={getUserEmail(selectedBooking?.user_id || 0)}
        userPhone={getUserPhone(selectedBooking?.user_id || 0)}
        houseTitle={getHouseTitle(selectedBooking?.houseId || 0)}
        housePrice={getHousePrice(selectedBooking?.houseId || 0)}
      />

      <EditBookingModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={confirmEdit}
        booking={selectedBooking}
        houseTitle={getHouseTitle(selectedBooking?.houseId || 0)}
        housePrice={getHousePrice(selectedBooking?.houseId || 0)}
      />

      <DeleteBookingModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        bookingId={selectedBooking?.id || 0}
      />
      
    </div>
  );
};

export default AdminDashClient;