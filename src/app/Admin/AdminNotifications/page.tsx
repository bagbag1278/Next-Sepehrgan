"use client";

import React, { useState, useEffect } from "react";
import { CheckCheck, Check, Bell, Search, X } from "lucide-react";
import toast from "react-hot-toast";
import Pagination from "../Pagination/PaginationAdmin";

interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: string;
  data: any;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";
const PER_PAGE = 4;

const AdminAnnouncements = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const getToken = () => localStorage.getItem("accessToken");

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = getToken();
      
      if (!token) {
        setError("توکن یافت نشد. لطفاً دوباره وارد شوید.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setError("نشست شما منقضی شده است. لطفاً دوباره وارد شوید.");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      const data = result.data || result;
      setNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("خطا در دریافت اعلان‌ها. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
        toast.success("نوتیفیکیشن خوانده شد");
      } else {
        toast.error("خطا در بروزرسانی");
      }
    } catch (error) {
      console.error("Error marking as read:", error);
      toast.error("خطا در بروزرسانی");
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = getToken();
      const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n.id);
      
      if (unreadIds.length === 0) {
        toast("هیچ اعلان خوانده نشده‌ای وجود ندارد");
        return;
      }

      for (const id of unreadIds) {
        await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      toast.success("همه نوتیفیکیشن‌ها خوانده شد");
    } catch (error) {
      console.error("Error marking all as read:", error);
      toast.error("خطا در بروزرسانی");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("fa-IR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "—";
    }
  };

  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "—";
    }
  };

  const filtered = notifications.filter((n) => {
    const matchSearch =
      !searchTerm ||
      n.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.title?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const resetFilters = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div dir="rtl" className="min-h-screen ">
      <div className="px-4 sm:p-6 lg:px-8 py-6 space-y-6">

        {/* Header */}
        <div
          className="bg-gradient-to-br from-slate-100 via-white to-gray-100
            dark:from-slate-950 dark:via-gray-900 dark:to-slate-900
            rounded-tl-[42px] rounded-br-[42px] rounded-2xl p-7
            shadow-lg shadow-gray-200/70 dark:shadow-none
            border border-gray-200 dark:border-gray-700/50"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#0887CA1A] flex items-center justify-center">
              <Bell size={22} className="text-[#0887CAB2]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                اعلان‌ها
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                لیست اعلان های شما ({notifications.length} مورد
                {unreadCount > 0 && (
                  <span className="mr-1 text-[#0887CAB2] font-medium">
                    — {unreadCount} خوانده نشده
                  </span>
                )}
                )
              </p>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="rounded-2xl shadow-md overflow-hidden ">

          {/* Toolbar */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2 text-gray-800 dark:text-white">
                  <Bell size={20} className="text-[#0887CAB2]" />
                  لیست اعلان‌ها
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  مشاهده و مدیریت اعلان‌های دریافتی
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Search */}
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CAB2]"
                  />
                  <input
                    type="text"
                    placeholder="جستجو..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pr-9 pl-4 py-3 border border-[#0887CAB2] text-[#0887CAB2] rounded-2xl text-sm w-full sm:w-56 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0887CAB2] placeholder:text-[#0887CA80]"
                  />
                </div>

                {/* Mark All as Read */}
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="flex items-center gap-2 bg-[#3730A3] hover:bg-[#312E81] text-white text-sm font-medium px-5 py-3 rounded-2xl transition-colors whitespace-nowrap"
                  >
                    <CheckCheck size={16} />
                    علامت‌گذاری همه
                  </button>
                )}

                {/* Reset Filters */}
                {searchTerm && (
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm font-medium px-3 py-3 rounded-2xl transition-colors"
                  >
                    <X size={16} />
                    پاک کردن
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Table Header */}
          <div className="hidden md:flex items-center h-14 px-5 font-bold text-gray-700 dark:text-gray-300  shadow-[0_0_8px] shadow-blue-300/30 mx-4 mb-2 rounded-2xl">
            <div className="flex-1 relative right-6">اعلان</div>
            <div className="w-32 text-center">تاریخ</div>
            <div className="w-24 text-center">زمان</div>
            <div className="w-44 text-center">وضعیت</div>
          </div>

          {/* Rows */}
          <div className="space-y-3 p-4">
            {loading ? (
              <div className="text-center py-16 text-gray-400 dark:text-gray-500 =rounded-2xl">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0887CAB2] mx-auto mb-3"></div>
                <p>در حال بارگذاری...</p>
              </div>
            ) : error ? (
              <div className="text-center py-16 text-red-500 bg-white dark:bg-gray-800 rounded-2xl">
                <Bell size={40} className="mx-auto mb-3 text-red-300" />
                <p>{error}</p>
                <button
                  onClick={fetchNotifications}
                  className="mt-4 px-4 py-2 bg-[#0887CAB2] text-white rounded-xl text-sm"
                >
                  تلاش مجدد
                </button>
              </div>
            ) : paginated.length === 0 ? (
              <div className="text-center py-16 text-gray-400 dark:text-gray-500 rounded-2xl">
                <Bell size={40} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                <p>اعلانی یافت نشد</p>
              </div>
            ) : (
              paginated.map((notif) => (
                <div
                  key={notif.id}
                  className={`flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 rounded-2xl transition-all shadow-[0_0_8px] shadow-blue-300/20 hover:shadow-blue-300/40 ${
                    notif.isRead
                      ? "bg-white dark:bg-gray-800"
                      : "bg-blue-50/60 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30"
                  }`}
                >
                  {/* Mobile */}
                  <div className="flex flex-col gap-2 md:hidden">
                    <p className="font-medium text-gray-800 dark:text-white text-sm">
                      {notif.title}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2">
                      {notif.message}
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-400">{formatDate(notif.createdAt)}</span>
                      {notif.isRead ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-800 dark:bg-gray-600 text-gray-200 px-3 py-1.5 rounded-lg">
                          <Check size={11} /> خوانده شده
                        </span>
                      ) : (
                        <button
                          onClick={() => markAsRead(notif.id)}
                          className="inline-flex items-center gap-1 text-xs font-medium bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900/40 dark:text-green-300 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <CheckCheck size={11} /> علامت‌گذاری
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Desktop */}
                  <div className="hidden md:flex md:items-center w-full gap-4">
                    {/* نقطه خوانده‌نشده */}
                    <div className="w-2 flex-shrink-0">
                      {!notif.isRead && (
                        <span className="block w-2 h-2 rounded-full bg-[#0887CAB2]" />
                      )}
                    </div>

                    {/* متن */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 dark:text-white text-sm truncate">
                        {notif.title}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 truncate">
                        {notif.message}
                      </p>
                    </div>

                    {/* تاریخ */}
                    <div className="w-32 text-center text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                      {formatDate(notif.createdAt)}
                    </div>

                    {/* زمان */}
                    <div className="w-24 text-center text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                      {formatTime(notif.createdAt)}
                    </div>

                    {/* وضعیت */}
                    <div className="w-44 flex justify-center flex-shrink-0">
                      {notif.isRead ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-gray-800 dark:bg-gray-600 text-gray-200 px-4 py-2 rounded-xl">
                          <Check size={12} />
                          خوانده شده
                        </span>
                      ) : (
                        <button
                          onClick={() => markAsRead(notif.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900/40 dark:text-green-300 px-4 py-2 rounded-xl transition-colors"
                        >
                          <CheckCheck size={12} />
                          علامت‌گذاری به عنوان خوانده شده
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && !loading && !error && (
            <div className="flex justify-start pt-2 pb-4 px-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnnouncements;