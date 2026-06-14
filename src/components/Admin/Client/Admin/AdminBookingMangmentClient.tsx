// app/admin/BookingsManagement/page.tsx
"use client";

import DetailBookingModal from "@/components/Admin/BookingsManagement/filter/menu/Operation/DetailBookingModal";
import EditBookingModal from "@/components/Admin/BookingsManagement/filter/menu/Operation/EditBookingModal";
import DeleteBookingModal from "@/components/Admin/BookingsManagement/filter/menu/Operation/DeleteBookingModal";
import AcceptBookingModal from "@/components/Admin/BookingsManagement/filter/menu/Operation/AcceptBookingModal";
import CancelBookingModal from "@/components/Admin/BookingsManagement/filter/menu/Operation/CancelBookingModal";
import FilterBookingModal from "@/components/Admin/BookingsManagement/filter/FilterBookingModal";

import { StatsCards } from "@/components/Admin/BookingsManagement/filter/StatsCards";
import { SearchFilter } from "@/components/Admin/BookingsManagement/filter/SearchFilter";
import { BookingCard } from "@/components/Admin/BookingsManagement/filter/BookingCard";
import { BookingTableHeader } from "@/components/Admin/BookingsManagement/filter/BookingTableHeader";
import { EmptyState } from "@/components/Admin/BookingsManagement/filter/EmptyState";

import { useEffect, useState } from "react";
import { useBookings, Booking } from "@/core/api/UsAdmin/useBookings";
import { useRouter } from "next/navigation"; 
import toast from "react-hot-toast";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import Pagination from "../../Pagination/PaginationAdmin";

const AdminBookingMangmentClient = () => {
  const router = useRouter();
  const {
    bookings,
    loading,
    error,
    fetchBookings,
    updateBooking,
    deleteBooking,
    getHouseTitle,
    getHousePrice,
    getUserName,
    getUserEmail,
    getUserMobile,
  } = useBookings();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedBookingForAction, setSelectedBookingForAction] = useState<Booking | null>(null);
  const [editingHouseTitle, setEditingHouseTitle] = useState("");
  const [editingHousePrice, setEditingHousePrice] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) router.push("/login");
    else fetchBookings();
  }, []);

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter((b: Booking) => b.status === "confirmed").length;
  const pendingBookings = bookings.filter((b: Booking) => b.status === "pending").length;
  const canceledBookings = bookings.filter((b: Booking) => b.status === "canceled" || b.status === "cancelled").length;

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setDateFrom("");
    setDateTo("");
    setPriceMin("");
    setPriceMax("");
  };

  const filteredBookings = bookings.filter((booking: Booking) => {
    const userName = getUserName(booking.user_id, booking);
    const houseTitle = getHouseTitle(booking.houseId);
    const matchSearch =
      String(booking.id).includes(search) ||
      houseTitle.toLowerCase().includes(search.toLowerCase()) ||
      userName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || booking.status === statusFilter;
    const matchPrice =
      (!priceMin || getHousePrice(booking.houseId) >= Number(priceMin)) &&
      (!priceMax || getHousePrice(booking.houseId) <= Number(priceMax));
    return matchSearch && matchStatus && matchPrice;
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginated = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const formatReservedDates = (dates?: string[]) => {
    if (!dates || dates.length === 0) return "—";
    return dates
      .map((date: string) => {
        try {
          return new Date(date).toLocaleDateString("fa-IR");
        } catch {
          return date;
        }
      })
      .join("، ");
  };

  const handleViewDetails = (b: Booking) => {
    setSelectedBooking(b);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (b: Booking) => {
    setSelectedBooking(b);
    setEditingHouseTitle(getHouseTitle(b.houseId));
    setEditingHousePrice(getHousePrice(b.houseId));
    setIsEditModalOpen(true);
  };

  const handleDelete = (b: Booking) => {
    setSelectedBooking(b);
    setIsDeleteModalOpen(true);
  };

  const handleAccept = (b: Booking) => {
    setSelectedBookingForAction(b);
    setIsAcceptModalOpen(true);
  };

  const handleCancel = (b: Booking) => {
    setSelectedBookingForAction(b);
    setIsCancelModalOpen(true);
  };

  const confirmEditBooking = async (data: { 
    status: string; 
    sharedEmail: string; 
    sharedMobile: string; 
    traveler_details: any[] 
  }) => {
    const loadingToast = toast.loading("در حال ویرایش رزرو...");
    
    try {
      if (!selectedBooking) return;
      
      console.log("داده ارسالی به سرور:", {
        status: data.status,
        sharedEmail: data.sharedEmail,
        sharedMobile: data.sharedMobile,
        traveler_details: data.traveler_details,
      });
      
      await updateBooking(selectedBooking.id, {
        status: data.status,
        sharedEmail: data.sharedEmail,
        sharedMobile: data.sharedMobile,
        traveler_details: data.traveler_details,
      });
      
      toast.success("رزرو با موفقیت ویرایش شد", { id: loadingToast });
      await fetchBookings();
      setIsEditModalOpen(false);
      setSelectedBooking(null);
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || error.message || "خطا در ویرایش رزرو", { id: loadingToast });
    }
  };

  const confirmDeleteBooking = async () => {
    const loadingToast = toast.loading("در حال حذف رزرو...");
    try {
      if (!selectedBooking) return;
      await deleteBooking(selectedBooking.id);
      toast.success("رزرو با موفقیت حذف شد", { id: loadingToast });
      await fetchBookings();
      setIsDeleteModalOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      toast.error("خطا در حذف رزرو", { id: loadingToast });
    }
  };

  const confirmAcceptBooking = async () => {
    await fetchBookings();
    setIsAcceptModalOpen(false);
    setSelectedBookingForAction(null);
  };

  const confirmCancelBooking = async () => {
    await fetchBookings();
    setIsCancelModalOpen(false);
    setSelectedBookingForAction(null);
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

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">خطا</div>
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button onClick={fetchBookings} className="mt-4 px-4 py-2 bg-[#0887CAB2] text-white rounded-xl">
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="px-4 sm:px-8 py-6 space-y-6 min-h-screen">
      <AdvancedScrollAnimation type="slide-right" delay={0.1}>
        <div className="bg-gradient-to-br from-slate-100 via-white to-gray-100 dark:from-slate-950 dark:via-gray-900 dark:to-slate-900 rounded-tl-[42px] rounded-br-[42px] rounded-2xl p-7 shadow-lg shadow-gray-200/70 dark:shadow-none border border-gray-200 dark:border-gray-700/50">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">مدیریت رزروها</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">مشاهده و مدیریت همه رزروها</p>
        </div>
      </AdvancedScrollAnimation>

      <StatsCards total={totalBookings} confirmed={confirmedBookings} pending={pendingBookings} canceled={canceledBookings} />

      <SearchFilter
        search={search}
        onSearchChange={setSearch}
        onOpenFilter={() => setIsFilterModalOpen(true)}
        onResetFilters={resetFilters}
        hasActiveFilters={statusFilter !== "all" || !!dateFrom || !!dateTo || !!priceMin || !!priceMax || !!search}
      />

      <BookingTableHeader />

      <div className="flex flex-col gap-3">
        {paginated.map((booking: Booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            houseTitle={getHouseTitle(booking.houseId)}
            userName={getUserName(booking.user_id, booking)}
            price={getHousePrice(booking.houseId)}
            reservedDates={formatReservedDates(booking.reservedDates)}
            onView={() => handleViewDetails(booking)}
            onEdit={() => handleEdit(booking)}
            onDelete={() => handleDelete(booking)}
            onAccept={() => handleAccept(booking)}
            onCancel={() => handleCancel(booking)}
          />
        ))}
      </div>

      {filteredBookings.length > 0 && (
        <AdvancedScrollAnimation type="fade" delay={0.6}>
          <div className="flex justify-start pt-2">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </AdvancedScrollAnimation>
      )}

      {filteredBookings.length === 0 && !loading && <EmptyState />}

      <FilterBookingModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        priceMin={priceMin}
        setPriceMin={setPriceMin}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        resetFilters={resetFilters}
      />

      <DetailBookingModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        booking={selectedBooking}
        userName={getUserName(selectedBooking?.user_id ?? 0, selectedBooking || undefined)}
        userEmail={getUserEmail(selectedBooking?.user_id ?? 0)}
        userPhone={getUserMobile(selectedBooking?.user_id ?? 0)}
        houseTitle={getHouseTitle(selectedBooking?.houseId ?? 0)}
        housePrice={getHousePrice(selectedBooking?.houseId ?? 0)}
      />

      <EditBookingModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={confirmEditBooking}
        booking={selectedBooking}
        houseTitle={editingHouseTitle}
        housePrice={editingHousePrice}
      />

      <DeleteBookingModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteBooking}
        bookingId={selectedBooking?.id ?? 0}
      />

      <AcceptBookingModal
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
        onConfirm={confirmAcceptBooking}
        bookingId={selectedBookingForAction?.id ?? 0}
        bookingDetails={{
          id: selectedBookingForAction?.id ?? 0,
          userName: getUserName(selectedBookingForAction?.user_id ?? 0, selectedBookingForAction || undefined),
          userPhone: getUserMobile(selectedBookingForAction?.user_id ?? 0),
          userEmail: getUserEmail(selectedBookingForAction?.user_id ?? 0),
          houseTitle: getHouseTitle(selectedBookingForAction?.houseId ?? 0),
          checkIn: selectedBookingForAction?.reservedDates?.[0] || "",
          checkOut: selectedBookingForAction?.reservedDates?.[1] || "",
          guests: selectedBookingForAction?.traveler_details?.length ?? 1,
          totalPrice: getHousePrice(selectedBookingForAction?.houseId ?? 0),
        }}
      />

      <CancelBookingModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={confirmCancelBooking}
        bookingId={selectedBookingForAction?.id ?? 0}
        bookingDetails={{
          id: selectedBookingForAction?.id ?? 0,
          userName: getUserName(selectedBookingForAction?.user_id ?? 0, selectedBookingForAction || undefined),
          userPhone: getUserMobile(selectedBookingForAction?.user_id ?? 0),
          userEmail: getUserEmail(selectedBookingForAction?.user_id ?? 0),
          houseTitle: getHouseTitle(selectedBookingForAction?.houseId ?? 0),
          totalPrice: getHousePrice(selectedBookingForAction?.houseId ?? 0),
        }}
      />
    </div>
  );
};

export default AdminBookingMangmentClient;