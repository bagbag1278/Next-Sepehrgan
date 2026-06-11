// app/admin/BookingsManagement/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Clock,
  User,
  Filter,
  X,
  Building2,
  Hash,
} from "lucide-react";
import { useRouter } from "next/navigation";

import DetailBookingModal from "./filter/menu/Operation/DetailBookingModal";
import EditBookingModal from "./filter/menu/Operation/EditBookingModal";
import DeleteBookingModal from "./filter/menu/Operation/DeleteBookingModal";
import AcceptBookingModal from "./filter/menu/Operation/AcceptBookingModal";
import CancelBookingModal from "./filter/menu/Operation/CancelBookingModal";
import toast from "react-hot-toast";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import ActionMenu from "./filter/menu/ActionMenu";
import Pagination from "../Pagination/PaginationAdmin";
import FilterBookingModal from "./filter/FilterBookingModal";
import Succsess from "../Icon/Succsess";
import ReservingIcon from "../Icon/ReservingIcon";
import NotActive from "../Icon/NotActive";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";

interface Booking {
  id: number;
  user_id: number;
  houseId: number;
  reservedDates: string[];
  traveler_details: any[];
  status: string;
  sharedEmail: string | null;
  sharedMobile: string | null;
  createdAt: string;
  created_at: string;
  updatedAt: string;
  updated_at: string;
  total_price?: number;
}

interface House {
  id: number;
  title: string;
  price: number;
  address: string;
  photos: string[];
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
}

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "success":
    case "confirmed":
      return <Succsess />;
    case "reservingIcon":
    case "pending":
      return <ReservingIcon />;
    case "NotActive":
    case "cancelled":
      return <NotActive />;
    default:
      return <ReservingIcon />;
  }
};

const BookingsManagement = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [housesMap, setHousesMap] = useState<Map<number, House>>(new Map());
  const [usersMap, setUsersMap] = useState<Map<number, User>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const getToken = () => localStorage.getItem("accessToken");

  const toEnglishNumber = (str: string): string => {
    const map: { [key: string]: string } = {
      "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4",
      "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9",
    };
    return str.replace(/[۰-۹]/g, (char) => map[char] || char);
  };

  const persianToGregorian = (persianDate: string): Date | null => {
    if (!persianDate) return null;
    try {
      const englishDate = toEnglishNumber(persianDate);
      const [year, month, day] = englishDate.split("/").map(Number);
      if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
      const gregorianYear = year + 621;
      return new Date(gregorianYear, month - 1, day);
    } catch {
      return null;
    }
  };

  const getApiDate = (isoString: string): Date | null => {
    if (!isoString) return null;
    try {
      return new Date(isoString);
    } catch {
      return null;
    }
  };

  const getHouseTitle = (houseId: number): string => {
    if (!houseId) return "ملک نامشخص";
    const house = housesMap.get(houseId);
    return house?.title || `ملک شماره ${houseId}`;
  };

  const getHousePrice = (houseId: number): number => {
    if (!houseId) return 0;
    const house = housesMap.get(houseId);
    return house?.price || 0;
  };

  const getUserName = (userId: number, booking?: Booking): string => {
    if (!userId) return "کاربر ناشناس";
    const user = usersMap.get(userId);
    if (user?.firstName || user?.lastName) {
      const firstName = user.firstName || "";
      const lastName = user.lastName || "";
      if (firstName && lastName) return `${firstName} ${lastName}`;
      if (firstName) return firstName;
      if (lastName) return lastName;
    }
    if (user?.email) return user.email.split("@")[0];
    if (booking?.traveler_details?.length) {
      const first = booking.traveler_details[0];
      if (first.firstName && first.lastName)
        return `${first.firstName} ${first.lastName}`;
      if (first.firstName) return first.firstName;
    }
    return `کاربر ${userId}`;
  };

  const getUserEmail = (userId: number): string => {
    if (!userId) return "";
    return usersMap.get(userId)?.email || "";
  };

  const getUserMobile = (userId: number): string => {
    if (!userId) return "";
    return usersMap.get(userId)?.mobile || "";
  };

  const fetchHouses = async (houseIds: number[]) => {
    try {
      const token = getToken();
      const newMap = new Map<number, House>();
      
      for (const hid of houseIds) {
        try {
          const res = await fetch(`${API_BASE_URL}/houses/${hid}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          if (res.ok) {
            const data = await res.json();
            const houseData = data.data || data;
            newMap.set(hid, {
              id: houseData.id || hid,
              title: houseData.title || "",
              price: Number(houseData.price) || 0,
              address: houseData.address || "",
              photos: houseData.photos || [],
            });
          } else {
            newMap.set(hid, { id: hid, title: "", price: 0, address: "", photos: [] });
          }
        } catch {
          newMap.set(hid, { id: hid, title: "", price: 0, address: "", photos: [] });
        }
      }
      setHousesMap(newMap);
    } catch (err) {
      console.error("خطا در دریافت اطلاعات هتل‌ها:", err);
    }
  };

  const fetchUsers = async (userIds: number[]) => {
    try {
      const token = getToken();
      const newMap = new Map<number, User>();
      
      for (const uid of userIds) {
        try {
          const res = await fetch(`${API_BASE_URL}/users/${uid}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          if (res.ok) {
            const data = await res.json();
            const userData = data.data || data;
            newMap.set(uid, {
              id: userData.id || uid,
              firstName: userData.firstName || "",
              lastName: userData.lastName || "",
              email: userData.email || "",
              mobile: userData.mobile || userData.phone || "",
            });
          } else {
            newMap.set(uid, { id: uid, firstName: "", lastName: "", email: "", mobile: "" });
          }
        } catch {
          newMap.set(uid, { id: uid, firstName: "", lastName: "", email: "", mobile: "" });
        }
      }
      setUsersMap(newMap);
    } catch (err) {
      console.error("خطا در دریافت اطلاعات کاربران:", err);
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(`${API_BASE_URL}/admin/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          router.push("/login");
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }
      
      const result = await res.json();
      const data = result.data || result;
      setBookings(Array.isArray(data) ? data : []);

      if (Array.isArray(data) && data.length) {
        const houseIds = [...new Set(data.map((b: Booking) => b.houseId).filter(Boolean))];
        const userIds = [...new Set(data.map((b: Booking) => b.user_id).filter(Boolean))];

        await Promise.all([fetchHouses(houseIds), fetchUsers(userIds)]);
      }
    } catch (err) {
      console.error(err);
      setError("خطا در دریافت رزروها");
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async (bookingId: number, data: any) => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/admin/bookings/${bookingId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  };

  const deleteBooking = async (bookingId: number) => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/admin/bookings/${bookingId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  };

  useEffect(() => {
    const token = getToken();
    if (!token) router.push("/login");
    else fetchBookings();
  }, []);

  const totalBookings = bookings.length;
  const successBookings = bookings.filter(
    (b) => b.status === "success" || b.status === "confirmed"
  ).length;
  const reservingBookings = bookings.filter(
    (b) => b.status === "reservingIcon" || b.status === "pending"
  ).length;
  const notActiveBookings = bookings.filter(
    (b) => b.status === "NotActive" || b.status === "cancelled"
  ).length;

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setDateFrom("");
    setDateTo("");
    setPriceMin("");
    setPriceMax("");
  };

  const filteredBookings = bookings.filter((booking) => {
    const userName = getUserName(booking.user_id, booking);
    const houseTitle = getHouseTitle(booking.houseId);
    const matchSearch =
      String(booking.id).includes(search) ||
      houseTitle.toLowerCase().includes(search.toLowerCase()) ||
      userName.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" || booking.status === statusFilter;
    const apiDate = getApiDate(booking.createdAt || booking.created_at);
    const from = persianToGregorian(dateFrom);
    const to = persianToGregorian(dateTo);
    let matchDate = true;
    if (from && apiDate && apiDate < from) matchDate = false;
    if (to && apiDate && matchDate && apiDate > to) matchDate = false;
    const price = getHousePrice(booking.houseId);
    const matchPrice =
      (!priceMin || price >= Number(priceMin)) &&
      (!priceMax || price <= Number(priceMax));
    return matchSearch && matchStatus && matchDate && matchPrice;
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginated = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (str?: string) => {
    if (!str) return "—";
    try {
      const d = new Date(str);
      return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("fa-IR");
    } catch {
      return "—";
    }
  };
  
  const formatTime = (str?: string) => {
    if (!str) return "—";
    try {
      return new Date(str).toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "—";
    }
  };

  const formatReservedDates = (dates?: string[]) => {
    if (!dates || dates.length === 0) return "—";
    return dates.map(date => {
      try {
        return new Date(date).toLocaleDateString("fa-IR");
      } catch {
        return date;
      }
    }).join("، ");
  };

  const handleViewDetails = (b: Booking) => {
    setSelectedBooking(b);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (b: Booking) => {
    setSelectedBooking(b);
    const houseId = b.houseId;
    const house = housesMap.get(houseId);
    setEditingHouseTitle(house?.title || `ملک شماره ${houseId}`);
    setEditingHousePrice(house?.price || 0);
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

  const confirmEdit = async (data: any) => {
    try {
      if (!selectedBooking) return;
      await updateBooking(selectedBooking.id, {
        reservedDates: data.reservedDates,
        status: data.status,
      });
      toast.success("رزرو با موفقیت ویرایش شد");
      await fetchBookings();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("خطا در ویرایش رزرو");
    }
  };

  const confirmDelete = async () => {
    try {
      if (!selectedBooking) return;
      await deleteBooking(selectedBooking.id);
      toast.success("رزرو با موفقیت حذف شد");
      await fetchBookings();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("خطا در حذف رزرو");
    }
  };

  const confirmAccept = async () => {
    await fetchBookings();
  };

  const confirmCancel = async () => {
    await fetchBookings();
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
          <button
            onClick={fetchBookings}
            className="mt-4 px-4 py-2 bg-[#0887CAB2] text-white rounded-xl"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="px-4 sm:px-8 py-6 space-y-6 min-h-screen">
      {/* Header */}
      <AdvancedScrollAnimation type="slide-right" delay={0.1}>
        <div className="bg-gradient-to-br from-slate-100 via-white to-gray-100 dark:from-slate-950 dark:via-gray-900 dark:to-slate-900 rounded-tl-[42px] rounded-br-[42px] rounded-2xl p-7 shadow-lg shadow-gray-200/70 dark:shadow-none border border-gray-200 dark:border-gray-700/50">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">مدیریت رزروها</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">مشاهده و مدیریت همه رزروها</p>
        </div>
      </AdvancedScrollAnimation>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "کل رزروها", value: totalBookings, color: "text-gray-800 dark:text-white", delay: 0.1 },
          { label: "تأیید شده", value: successBookings, color: "text-green-600", delay: 0.2 },
          { label: "در انتظار", value: reservingBookings, color: "text-yellow-600", delay: 0.3 },
          { label: "لغو شده", value: notActiveBookings, color: "text-red-600", delay: 0.4 },
        ].map((stat, idx) => (
          <AdvancedScrollAnimation key={idx} type="fade" delay={stat.delay}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
              <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </AdvancedScrollAnimation>
        ))}
      </div>

      {/* Search & Filters */}
      <AdvancedScrollAnimation type="slide-up" delay={0.2}>
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CAB2]" size={18} />
            <input
              type="text"
              placeholder="جستجوی شناسه، نام ملک یا کاربر..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pr-10 pl-4 border border-[#0887CAB2] rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-2xl bg-white dark:bg-gray-800 text-[#0887CAB2] border border-[#0887CAB2] hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2"
            >
              <Filter size={18} />
              <span className="hidden sm:inline">فیلتر بیشتر</span>
            </button>
            {(statusFilter !== "all" || dateFrom || dateTo || priceMin || priceMax || search) && (
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition flex items-center gap-2"
              >
                <X size={18} />
                <span className="hidden sm:inline">پاک کردن</span>
              </button>
            )}
          </div>
        </div>
      </AdvancedScrollAnimation>

      {/* Table Header Desktop */}
      <AdvancedScrollAnimation type="fade" delay={0.3}>
        <div className="hidden md:flex items-center justify-between h-16 rounded-xl px-5 font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 shadow-[0_0_8px] shadow-blue-300/30">
          <div className="w-[20%]">نام ملک</div>
          <div className="w-[14%]">نام کاربر</div>
          <div className="w-[12%]">تاریخ رزرو</div>
          <div className="w-[12%]">زمان رزرو</div>
          <div className="w-[12%]">تاریخ‌های اقامت</div>
          <div className="w-[10%]">مبلغ</div>
          <div className="w-[8%]">وضعیت</div>
        </div>
      </AdvancedScrollAnimation>

      {/* Bookings List */}
      <div className="flex flex-col gap-3">
        {paginated.map((booking, idx) => {
          const date = formatDate(booking.createdAt || booking.created_at);
          const time = formatTime(booking.createdAt || booking.created_at);
          const price = getHousePrice(booking.houseId);
          const userName = getUserName(booking.user_id, booking);
          const houseTitle = getHouseTitle(booking.houseId);
          const reservedDates = formatReservedDates(booking.reservedDates);

          return (
            <AdvancedScrollAnimation key={booking.id} type="slide-up" delay={0.4 + idx * 0.05} duration={0.4}>
              <div className="rounded-2xl p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-all shadow-[0_0_8px] shadow-blue-300/20">
                
                {/* Mobile View */}
                <div className="flex flex-col gap-3 md:hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Hash size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-500">#{booking.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusIcon status={booking.status} />
                      <ActionMenu
                        onView={() => handleViewDetails(booking)}
                        onEdit={() => handleEdit(booking)}
                        onDelete={() => handleDelete(booking)}
                        onAccept={() => handleAccept(booking)}
                        onCancel={() => handleCancel(booking)}
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
                  <div className="w-[10%] font-bold text-[#0887CAB2] text-sm">{price.toLocaleString()} تومان</div>
                  <div className="w-[8%] flex items-center gap-3">
                    <StatusIcon status={booking.status} />
                    <ActionMenu
                      onView={() => handleViewDetails(booking)}
                      onEdit={() => handleEdit(booking)}
                      onDelete={() => handleDelete(booking)}
                      onAccept={() => handleAccept(booking)}
                      onCancel={() => handleCancel(booking)}
                    />
                  </div>
                </div>
              </div>
            </AdvancedScrollAnimation>
          );
        })}
      </div>

      {/* Pagination */}
      {filteredBookings.length > 0 && (
        <AdvancedScrollAnimation type="fade" delay={0.6}>
          <div className="flex justify-start pt-2">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </AdvancedScrollAnimation>
      )}

      {/* Empty State */}
      {filteredBookings.length === 0 && !loading && (
        <AdvancedScrollAnimation type="scale" delay={0.2}>
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <Calendar size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">هیچ رزروی یافت نشد</p>
          </div>
        </AdvancedScrollAnimation>
      )}

      {/* Modals */}
      <FilterBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
        onSave={confirmEdit}
        booking={selectedBooking}
        houseTitle={editingHouseTitle}
        housePrice={editingHousePrice}
      />

      <DeleteBookingModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        bookingId={selectedBooking?.id ?? 0}
      />

      <AcceptBookingModal
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
        onConfirm={confirmAccept}
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
        onConfirm={confirmCancel}
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

export default BookingsManagement;