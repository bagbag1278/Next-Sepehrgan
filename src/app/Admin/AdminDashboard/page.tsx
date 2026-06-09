"use client";
import React, { useEffect, useState } from "react";
import {
  Users,
  Home,
  CalendarCheck,
  Star,
  Search,
  Clock,
  Calendar,
  Building2,
  User,
} from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import Pagination from "../Pagination/PaginationAdmin";
import Succsess from "../Icon/Succsess";
import ReservingIcon from "../Icon/ReservingIcon";
import NotActive from "../Icon/NotActive";
import ActionMenu from "../HotelsManagement/more/ActionMenu";
import toast from "react-hot-toast";
import EditBookingModal from "../BookingsManagement/filter/menu/Operation/EditBookingModal";
import DeleteBookingModal from "../BookingsManagement/filter/menu/Operation/DeleteBookingModal";
import DetailAdminDash from "./Detail.tsx/DetailAdminDash";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";

const toPersianNum = (num: number) => num.toLocaleString("fa-IR");

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

interface House {
  title: string;
  price: number;
}

interface DashboardStats {
  totalUsers: number;
  totalHouses: number;
  totalBookings: number;
  averageRating: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalHouses: 0,
    totalBookings: 0,
    averageRating: 0,
  });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [houses, setHouses] = useState<Record<number, House>>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const getToken = () => localStorage.getItem("accessToken");

  const getUserName = (userId: number) => `کاربر ${userId}`;
  const getUserEmail = (userId: number) => "";
  const getUserPhone = (userId: number) => "";

  const fetchStats = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data: any = await response.json();
      const dashboardData = data.data || data;
      
      setStats({
        totalUsers: dashboardData.totalUsers || 0,
        totalHouses: dashboardData.totalHouses || 0,
        totalBookings: dashboardData.totalBookings || 0,
        averageRating: Number(dashboardData.averageRating) || 0,
      });
    } catch (error) {
      console.error("خطا در دریافت آمار:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/admin/bookings`, {
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data: any = await response.json();
      let bookingsList: Booking[] = data.data || data;
      if (!Array.isArray(bookingsList)) bookingsList = [];
      setBookings(bookingsList);

      const houseIds: number[] = [...new Set(bookingsList.map((b: Booking) => b.houseId).filter(Boolean))];
      const housesMap: Record<number, House> = {};
      
      for (const id of houseIds) {
        try {
          const res = await fetch(`${API_BASE_URL}/houses/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const houseData: any = await res.json();
            const house = houseData.data || houseData;
            housesMap[id] = {
              title: house.title || `ملک ${id}`,
              price: Number(house.price) || 0,
            };
          } else {
            housesMap[id] = { title: `ملک ${id}`, price: 0 };
          }
        } catch (e) {
          console.error(`خطا در دریافت هتل ${id}:`, e);
          housesMap[id] = { title: `ملک ${id}`, price: 0 };
        }
      }
      setHouses(housesMap);
    } catch (error) {
      console.error("خطا در دریافت رزروها:", error);
      toast.error("خطا در دریافت لیست رزروها");
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchStats();
      await fetchBookings();
      setLoading(false);
    };
    init();
  }, []);

  const formatNumber = (num: number) => toPersianNum(num);
  
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

  const getStatusIconComponent = (status: string) => {
    switch (status) {
      case "confirmed":
      case "success":
        return <Succsess />;
      case "pending":
        return <ReservingIcon />;
      case "cancelled":
        return <NotActive />;
      default:
        return <ReservingIcon />;
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (!searchTerm) return true;
    const house = houses[booking.houseId];
    const houseName = house?.title || "";
    return houseName.includes(searchTerm) || String(booking.id).includes(searchTerm);
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
  
  console.log(" شروع ادیت", selectedBooking.id);
  console.log("Data received:", data);
  
  const loadingToast = toast.loading("در حال ویرایش...");
  
  try {
    const token = getToken();
    if (!token) {
      toast.error("لطفاً مجدداً وارد شوید", { id: loadingToast });
      return;
    }
    
    const updateData: any = {};
    
    if (data.status) updateData.status = data.status;
    if (data.price !== undefined && data.price !== null) {
      updateData.total_price = Number(data.price);
    }
    if (data.reservedDates && Array.isArray(data.reservedDates)) {
      updateData.reservedDates = data.reservedDates;
    }
    if (data.rserveName && data.rserveName !== houses[selectedBooking.houseId]?.title) {
      updateData.house_title = data.rserveName;
    }
    
    console.log(" Sending to API:", updateData);
    
    const response = await fetch(`${API_BASE_URL}/admin/bookings/${selectedBooking.id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    console.log(" Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(" Error response:", errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const responseData = await response.json();
    console.log(" Response:", responseData);
    
    toast.success("رزرو با موفقیت ویرایش شد", { id: loadingToast });
    

    await fetchBookings();
    
    await fetchStats();
    
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === selectedBooking.id 
          ? { 
              ...booking, 
              status: data.status || booking.status,
              total_price: data.price !== undefined ? Number(data.price) : booking.total_price,
              reservedDates: data.reservedDates || booking.reservedDates
            }
          : booking
      )
    );
    
    if (data.rserveName && data.rserveName !== houses[selectedBooking.houseId]?.title) {
      setHouses(prevHouses => ({
        ...prevHouses,
        [selectedBooking.houseId]: {
          ...prevHouses[selectedBooking.houseId],
          title: data.rserveName,
          price: data.price !== undefined ? Number(data.price) : prevHouses[selectedBooking.houseId]?.price
        }
      }));
    }
    
    setIsEditOpen(false);
    setSelectedBooking(null);
    
  } catch (error) {
    console.error("❌ Error in confirmEdit:", error);
    toast.error("خطا در ویرایش رزرو", { id: loadingToast });
  }
};
  const confirmDelete = async () => {
    if (!selectedBooking) return;
    
    const loadingToast = toast.loading("در حال حذف...");
    
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/admin/bookings/${selectedBooking.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      toast.success("رزرو با موفقیت حذف شد", { id: loadingToast });
      await fetchBookings();
      setIsDeleteOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error(error);
      toast.error("خطا در حذف رزرو", { id: loadingToast });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0887CAB2] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  const statsCards = [
    { 
      id: 1, 
      title: "کاربران کل", 
      value: formatNumber(stats.totalUsers), 
      icon: Users, 
      bg: "bg-blue-50 dark:bg-blue-900/20", 
      iconColor: "text-blue-600 dark:text-blue-400" 
    },
    { 
      id: 2, 
      title: "کل املاک", 
      value: formatNumber(stats.totalHouses), 
      icon: Building2, 
      bg: "bg-green-50 dark:bg-green-900/20", 
      iconColor: "text-green-600 dark:text-green-400" 
    },
    { 
      id: 3, 
      title: "کل رزروها", 
      value: formatNumber(stats.totalBookings), 
      icon: CalendarCheck, 
      bg: "bg-amber-50 dark:bg-amber-900/20", 
      iconColor: "text-amber-600 dark:text-amber-400" 
    },
    { 
      id: 4, 
      title: "میانگین امتیاز", 
      value: stats.averageRating.toFixed(1), 
      icon: Star, 
      bg: "bg-yellow-50 dark:bg-yellow-900/20", 
      iconColor: "text-yellow-600 dark:text-yellow-400",
      suffix: "از ۵"
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen">
      <div className="px-4 sm:p-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <AdvancedScrollAnimation type="slide-right" delay={0.1}>
        <div className="bg-gradient-to-br from-slate-100 via-white to-gray-100 
                dark:from-slate-950 dark:via-gray-900 dark:to-slate-900 
                rounded-tl-[42px] rounded-br-[42px] rounded-2xl p-7 
                shadow-lg shadow-gray-200/70 dark:shadow-none
                border border-gray-200 dark:border-gray-700/50">
  <h1 className="text-3xl font-bold text-gray-900 dark:text-white"> مدیریت پنل ادمین</h1>
  <p className="text-gray-500 dark:text-gray-400 mt-2">به  مدیریت پنل ادمین خوش آمدید</p>
</div>
        </AdvancedScrollAnimation>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((item, idx) => (
            <AdvancedScrollAnimation key={item.id} type="fade" delay={0.1 + idx * 0.05}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md hover:shadow-lg transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{item.title}</p>
                    <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">
                      {item.value}
                      {item.suffix && <span className="text-sm font-normal mr-1">{item.suffix}</span>}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center`}>
                    <item.icon size={24} className={item.iconColor} />
                  </div>
                </div>
              </div>
            </AdvancedScrollAnimation>
          ))}
        </div>

        {/* Bookings Table */}
        <AdvancedScrollAnimation type="slide-up" delay={0.6}>
          <div className=" rounded-2xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2 text-gray-800 dark:text-white">
                    <CalendarCheck size={20} className="text-[#0887CAB2]" /> لیست رزروها
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">مشاهده و مدیریت رزروهای ثبت شده</p>
                </div>
                <div className="relative">
                  <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CAB2]" />
                  <input 
                    type="text" 
                    placeholder="جستجو..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="pr-9 pl-4 py-3 border border-[#0887CAB2] text-[#0887CAB2] rounded-2xl text-sm w-full sm:w-64 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]" 
                  />
                </div>
              </div>
            </div>

            {/* Table Header - Desktop */}
            <div className="hidden md:flex items-center justify-between h-16 rounded-2xl px-5 font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 shadow-[0_0_8px] shadow-blue-300/30 mx-4 mb-2">
              <div className="w-[28%]">نام ملک</div>
              <div className="w-[18%]">نام کاربر</div>
              <div className="w-[14%]">تاریخ رزرو</div>
              <div className="w-[12%]">زمان رزرو</div>
              <div className="w-[14%]">مبلغ</div>
              <div className="w-[14%]">وضعیت</div>
            </div>

            {/* Bookings List */}
            <div className="space-y-3 p-4">
              {paginatedBookings.length > 0 ? (
                paginatedBookings.map((booking) => {
                  const house = houses[booking.houseId];
                  const houseName = house?.title || `ملک شماره ${booking.houseId}`;
                  const userName = getUserName(booking.user_id);
                  const bookingDate = formatDate(booking.created_at || booking.reservedDates?.[0]);
                  const bookingTime = formatTime(booking.created_at);
                  const price = booking.total_price || booking.price || house?.price || 0;
                  const formattedPrice = Number(price).toLocaleString("fa-IR");
                  
                  return (
                    <div key={booking.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 rounded-2xl bg-white dark:bg-gray-800 hover:shadow-lg transition-all shadow-[0_0_8px] shadow-blue-300/20">
                      {/* Mobile View */}
                      <div className="flex flex-col gap-2 md:hidden">
                        <div className="flex items-center gap-2">
                          <Home size={16} className="text-gray-400" />
                          <span className="font-medium text-gray-800 dark:text-white">{houseName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">{userName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1 text-gray-500"><Calendar size={14}/>{bookingDate}</span>
                          <span className="flex items-center gap-1 text-gray-500"><Clock size={14}/>{bookingTime}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#0887CAB2] font-bold">{formattedPrice} تومان</span>
                          <div className="flex items-center gap-2">
                            {getStatusIconComponent(booking.status)}
                            <ActionMenu 
                              onView={() => handleViewDetails(booking)} 
                              onEdit={() => handleEdit(booking)} 
                              onDelete={() => handleDelete(booking)} 
                            />
                          </div>
                        </div>
                      </div>

                      {/* Desktop View */}
                      <div className="hidden md:flex md:items-center justify-between w-full">
                        <div className="w-[28%] flex items-center gap-2">
                          <Home size={16} className="text-gray-400" />
                          <span className="truncate text-gray-800 dark:text-white">{houseName}</span>
                        </div>
                        <div className="w-[18%] flex items-center gap-2">
                          <User size={16} className="text-gray-400" />
                          <span className="truncate text-gray-600 dark:text-gray-400">{userName}</span>
                        </div>
                        <div className="w-[14%] text-gray-500">{bookingDate}</div>
                        <div className="w-[10%] text-gray-500">{bookingTime}</div>
                        <div className="w-[16%] font-bold text-[#0887CAB2] relative left-8">{formattedPrice} تومان</div>
                        <div className="w-[14%] flex items-center gap-4">
                          {getStatusIconComponent(booking.status)}
                          <ActionMenu 
                            onView={() => handleViewDetails(booking)} 
                            onEdit={() => handleEdit(booking)} 
                            onDelete={() => handleDelete(booking)} 
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-2xl">
                  <CalendarCheck size={40} className="mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                  <p>هیچ رزروی یافت نشد</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredBookings.length > 0 && totalPages > 1 && (
              <AdvancedScrollAnimation type="fade" delay={0.6}>
                <div className="flex justify-start pt-2 pb-4 px-4">
                  <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={setCurrentPage} 
                  />
                </div>
              </AdvancedScrollAnimation>
            )}
          </div>
        </AdvancedScrollAnimation>
      </div>

      {/* Modals */}
      <DetailAdminDash 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
        booking={selectedBooking} 
        userName={getUserName(selectedBooking?.user_id || 0)} 
        userEmail={getUserEmail(selectedBooking?.user_id || 0)} 
        userPhone={getUserPhone(selectedBooking?.user_id || 0)} 
        houseTitle={houses[selectedBooking?.houseId || 0]?.title || "نامشخص"} 
        housePrice={houses[selectedBooking?.houseId || 0]?.price || 0} 
      />
      
      <EditBookingModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        onSave={confirmEdit} 
        booking={selectedBooking} 
        houseTitle={selectedBooking ? houses[selectedBooking.houseId]?.title || "" : ""} 
        housePrice={selectedBooking ? houses[selectedBooking.houseId]?.price || 0 : 0} 
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

export default AdminDashboard;