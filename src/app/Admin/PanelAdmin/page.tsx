// components/admin/AdminDashboard.tsx
"use client";
import React, { useEffect, useState } from "react";
import { 
  Users, Home, CalendarCheck, Star, Eye, TrendingUp,
  Search, ChevronLeft, ChevronRight, Clock, Calendar,
  AlertCircle, MoreHorizontal, DollarSign, Building2,
  CheckCircle, XCircle, ArrowUpRight, ArrowDownRight,
  Activity, User, Wallet
} from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import Pagination from "../Pagination/PaginationAdmin";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalHouses: 0,
    totalBookings: 0,
    averageRating: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
    totalViews: 0,
    totalIncome: 0,
  });
  const [bookings, setBookings] = useState<any[]>([]);
  const [houses, setHouses] = useState<Record<number, any>>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        
        const response = await fetch("http://next.genzuni.website/api/admin/dashboard", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        
        setStats({
          totalUsers: data.totalUsers || 18420,
          totalHouses: data.totalHouses || 184,
          totalBookings: data.totalBookings || 65,
          averageRating: Number(data.averageRating) || 3.6,
          pendingBookings: 12,
          confirmedBookings: 42,
          cancelledBookings: 11,
          totalViews: 2840,
          totalIncome: 125800000,
        });
      } catch (error) {
        console.error("خطا:", error);
      }
    };
    
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        
        const response = await fetch("/api-proxy/admin/bookings", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        
        let bookingsList = [];
        if (data.data && Array.isArray(data.data)) {
          bookingsList = data.data;
        } else if (Array.isArray(data)) {
          bookingsList = data;
        }
        
        setBookings(bookingsList);
        
        const houseIds = [...new Set(bookingsList.map((b: any) => b.houseId).filter(Boolean))];
        const housesMap: Record<number, any> = {};
        
        for (const id of houseIds) {
          try {
            const res = await fetch(`http://next.genzuni.website/api/houses/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const houseData = await res.json();
            housesMap[id] = houseData;
          } catch (e) {
            console.error(`خطا در دریافت هتل ${id}:`, e);
          }
        }
        
        setHouses(housesMap);
      } catch (error) {
        console.error("خطا:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
    fetchBookings();
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString("fa-IR");
  };

  const filteredBookings = bookings.filter(booking => {
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

  const formatDate = (dateString: string) => {
    if (!dateString) return "نامشخص";
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR");
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "نامشخص";
    return dateString.split("T")[1]?.slice(0, 5) || "نامشخص";
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "confirmed":
        return { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/30", label: "تایید شده" };
      case "pending":
        return { icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/30", label: "در انتظار" };
      case "cancelled":
        return { icon: XCircle, color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/30", label: "لغو شده" };
      default:
        return { icon: AlertCircle, color: "text-gray-600", bg: "bg-gray-50 dark:bg-gray-800", label: "در انتظار" };
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 animate-pulse h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  const statsCards = [
    { id: 1, title: "کاربران کل", value: formatNumber(stats.totalUsers), icon: Users, change: "+۱۲%", bg: "bg-blue-50 dark:bg-blue-900/20", iconColor: "text-blue-600 dark:text-blue-400" },
    { id: 2, title: "بازدیدها", value: formatNumber(stats.totalViews), icon: Eye, change: "+۵۰%", bg: "bg-indigo-50 dark:bg-indigo-900/20", iconColor: "text-indigo-600 dark:text-indigo-400" },
    { id: 3, title: "رزروهای در انتظار", value: stats.pendingBookings, icon: Clock, change: "+۱۲", bg: "bg-amber-50 dark:bg-amber-900/20", iconColor: "text-amber-600 dark:text-amber-400" },
    { id: 4, title: "کل املاک", value: formatNumber(stats.totalHouses), icon: Building2, change: "+۳", bg: "bg-green-50 dark:bg-green-900/20", iconColor: "text-green-600 dark:text-green-400" },
  ];

  const middleCards = [
    { id: 5, title: "رزروهای فعال", value: stats.confirmedBookings, icon: Activity, change: "+۲۳%", bg: "bg-emerald-50 dark:bg-emerald-900/20", iconColor: "text-emerald-600 dark:text-emerald-400" },
    { id: 6, title: "درآمد کل", value: formatNumber(stats.totalIncome), icon: DollarSign, change: "+۳۲%", bg: "bg-rose-50 dark:bg-rose-900/20", iconColor: "text-rose-600 dark:text-rose-400", suffix: "تومان" },
    { id: 7, title: "میانگین امتیاز", value: stats.averageRating, icon: Star, change: "+۰.۲", bg: "bg-yellow-50 dark:bg-yellow-900/20", iconColor: "text-yellow-600 dark:text-yellow-400", suffix: "از ۵" },
    { id: 8, title: "رزروهای لغو شده", value: stats.cancelledBookings, icon: XCircle, change: "-۵", bg: "bg-red-50 dark:bg-red-900/20", iconColor: "text-red-600 dark:text-red-400" },
  ];

  const chartData = [
    { day: "شنبه", amount: 1800000 },
    { day: "یکشنبه", amount: 2200000 },
    { day: "دوشنبه", amount: 2800000 },
    { day: "سه‌شنبه", amount: 3500000 },
    { day: "چهارشنبه", amount: 4200000 },
    { day: "پنجشنبه", amount: 3800000 },
    { day: "جمعه", amount: 4500000 },
  ];

  const maxAmount = Math.max(...chartData.map(d => d.amount));

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="px-4 sm:p-6 lg:px-8 py-6 space-y-6">
        {/* هدر گرادیانت */}
        <AdvancedScrollAnimation type="slide-right" delay={0.1}>
          <div className="bg-gradient-to-l from-blue-700 rounded-tl-[42px] rounded-br-[42px] via-blue-800 to-indigo-900 rounded-2xl p-6 text-white">
            <h1 className="text-2xl font-bold">داشبورد مدیریت</h1>
            <p className="text-blue-100 mt-1">به پنل مدیریت خوش آمدید</p>
          </div>
        </AdvancedScrollAnimation>

        {/* کارت‌های آماری ردیف اول */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((item, idx) => (
            <AdvancedScrollAnimation key={item.id} type="fade" delay={0.1 + idx * 0.05}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md hover:shadow-lg transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{item.title}</p>
                    <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">{item.value}</p>
                    <p className="text-green-500 text-xs mt-1 flex items-center gap-1">
                      <ArrowUpRight size={12} />
                      {item.change} نسبت به ماه قبل
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

        {/* کارت‌های آماری ردیف دوم */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {middleCards.map((item, idx) => (
            <AdvancedScrollAnimation key={item.id} type="fade" delay={0.3 + idx * 0.05}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md hover:shadow-lg transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{item.title}</p>
                    <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">
                      {item.value}
                      {item.suffix && <span className="text-sm font-normal mr-1">{item.suffix}</span>}
                    </p>
                    <p className={`text-xs mt-1 flex items-center gap-1 ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {item.change.startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {item.change} نسبت به ماه قبل
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

        {/* نمودار درآمدها */}
        <AdvancedScrollAnimation type="slide-up" delay={0.5}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">آمار درآمدها</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">درآمد هفتگی</p>
              </div>
              <button className="text-[#0887CAB2] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                مشاهده همه
                <TrendingUp size={16} className="text-green-500" />
                <span className="text-green-500">+50%</span>
              </button>
            </div>
            
            <div className="flex items-end justify-between gap-2 h-64 mt-4">
              {chartData.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-indigo-500 rounded-lg transition-all duration-500 hover:from-blue-600 hover:to-indigo-600 cursor-pointer"
                    style={{ height: `${(item.amount / maxAmount) * 200}px` }}
                  ></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate w-9">{item.day}</span>
                  <span className="text-[10px] text-gray-400">{(item.amount / 1000000).toFixed(1)}M</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">کل درآمد هفته</span>
                <span className="text-xl font-bold text-gray-800 dark:text-white">۲۲,۸۰۰,۰۰۰ تومان</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">نسبت به هفته قبل</span>
                <span className="text-green-500 text-sm flex items-center gap-1">
                  <ArrowUpRight size={14} />
                  +۱۸%
                </span>
              </div>
            </div>
          </div>
        </AdvancedScrollAnimation>

        {/* جدول رزروها */}
        <AdvancedScrollAnimation type="slide-up" delay={0.6}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2 text-gray-800 dark:text-white">
                    <CalendarCheck size={20} className="text-[#0887CAB2]" />
                    لیست رزروها
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
                    className="pr-9 pl-4 py-2 border border-[#0887CAB2] rounded-xl text-sm w-full sm:w-64 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 p-4">
              {paginatedBookings.length > 0 ? (
                paginatedBookings.map((booking, index) => {
                  const house = houses[booking.houseId];
                  const status = getStatusIcon(booking.status);
                  const StatusIcon = status.icon;
                  
                  let bookingDate = "نامشخص";
                  let bookingTime = "نامشخص";
                  let price = "نامشخص";
                  
                  if (booking.created_at) {
                    bookingDate = formatDate(booking.created_at);
                    bookingTime = formatTime(booking.created_at);
                  } else if (booking.reservedDates && booking.reservedDates[0]) {
                    bookingDate = formatDate(booking.reservedDates[0]);
                  }
                  
                  if (booking.total_price) {
                    price = Number(booking.total_price).toLocaleString("fa-IR");
                  } else if (booking.price) {
                    price = Number(booking.price).toLocaleString("fa-IR");
                  }
                  
                  const checkIn = booking.reservedDates?.[0] ? formatDate(booking.reservedDates[0]) : "نامشخص";
                  const checkOut = booking.reservedDates?.[1] ? formatDate(booking.reservedDates[1]) : "نامشخص";
                  const houseName = house?.title || `ملک شماره ${booking.houseId}`;
                  
                  return (
                    <div 
                      key={booking.id || index} 
                      className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all flex flex-col gap-3 shadow-[0_0_8px] shadow-blue-300/20"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Home size={20} className="text-[#0887CAB2]" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white">{houseName}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">شناسه: #{booking.id}</p>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <MoreHorizontal size={16} className="text-gray-500" />
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs">
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <Calendar size={14} />
                          <span>رزرو: {bookingDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <Clock size={14} />
                          <span>ساعت: {bookingTime}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <Calendar size={14} />
                          <span>ورود: {checkIn}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <Calendar size={14} />
                          <span>خروج: {checkOut}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${status.bg} ${status.color}`}>
                            <StatusIcon size={12} />
                            {status.label}
                          </span>
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

            {/* صفحه‌بندی */}
            {filteredBookings.length > 0 && (
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
          </div>
        </AdvancedScrollAnimation>
      </div>
    </div>
  );
};

export default AdminDashboard;