"use client";

import { useState, useEffect } from "react";
import { Bell, Check, CheckCheck, Search, X } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import Pagination from "../../Pagination/PaginationAdmin";

interface Notification {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const API_BASE_URL = "http://188.121.111.8:3003";

 const AdminNotificationClient =() => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PER_PAGE = 5;

  const getToken = (): string | null => localStorage.getItem("accessToken");

  const fetchNotifications = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    const token = getToken();
    
    if (!token) {
      setError("توکن یافت نشد");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.ok) {
        const result = await response.json();
        const data: Notification[] = result.data || result;
        setNotifications(Array.isArray(data) ? data : []);
      } else {
        setError(`خطا: ${response.status}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number): Promise<void> => {
    try {
      const token = getToken();
      await fetch(`${API_BASE_URL}/api/notifications/${id}/read`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setNotifications((prev: Notification[]) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async (): Promise<void> => {
    const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n.id);
    if (unreadIds.length === 0) return;
    
    const token = getToken();
    for (const id of unreadIds) {
      await fetch(`${API_BASE_URL}/api/notifications/${id}/read`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    setNotifications((prev: Notification[]) => prev.map((n) => ({ ...n, isRead: true })));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const filtered = notifications.filter((n: Notification) => {
    const matchSearch =
      !searchTerm ||
      n.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.title?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const unreadCount = notifications.filter((n: Notification) => !n.isRead).length;

  const formatDate = (dateStr: string): string => {
    try {
      return new Date(dateStr).toLocaleDateString("fa-IR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "—";
    }
  };

  const formatTime = (dateStr: string): string => {
    try {
      return new Date(dateStr).toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "—";
    }
  };

  const resetFilters = (): void => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0887CAB2] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <Bell size={48} className="mx-auto text-red-500 mb-4" />
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchNotifications}
            className="px-4 py-2 bg-[#0887CAB2] text-white rounded-xl"
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
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#0887CA1A] flex items-center justify-center">
              <Bell size={22} className="text-[#0887CAB2]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">اعلان‌ها</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                لیست اعلان‌های شما ({notifications.length} مورد
                {unreadCount > 0 && (
                  <span className="mr-1 text-[#0887CAB2] font-medium">— {unreadCount} خوانده نشده</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </AdvancedScrollAnimation>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AdvancedScrollAnimation type="fade" delay={0.1}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">کل اعلان‌ها</p>
                <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">{notifications.length}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <Bell size={20} className="text-blue-600" />
              </div>
            </div>
          </div>
        </AdvancedScrollAnimation>
        <AdvancedScrollAnimation type="fade" delay={0.2}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">خوانده شده</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{notifications.length - unreadCount}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                <Check size={20} className="text-green-600" />
              </div>
            </div>
          </div>
        </AdvancedScrollAnimation>
        <AdvancedScrollAnimation type="fade" delay={0.3}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">خوانده نشده</p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">{unreadCount}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center">
                <Bell size={20} className="text-yellow-600" />
              </div>
            </div>
          </div>
        </AdvancedScrollAnimation>
      </div>

      {/* Search & Actions */}
      <AdvancedScrollAnimation type="slide-up" delay={0.2}>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CAB2]" size={18} />
            <input
              type="text"
              placeholder="جستجوی عنوان یا متن اعلان..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-12 pr-10 pl-4 border border-[#0887CAB2] rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
            />
          </div>
          <div className="flex gap-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white transition flex items-center gap-2"
              >
                <CheckCheck size={18} />
                علامت‌گذاری همه
              </button>
            )}
            {searchTerm && (
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

      {/* Table Header */}
      <AdvancedScrollAnimation type="fade" delay={0.3}>
        <div className="hidden md:flex items-center justify-between h-16 rounded-xl px-5 font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 shadow-[0_0_8px] shadow-blue-300/30">
          <div className="flex-1">اعلان</div>
          <div className="w-32 text-center">تاریخ</div>
          <div className="w-24 text-center">زمان</div>
          <div className="w-32 text-center">وضعیت</div>
        </div>
      </AdvancedScrollAnimation>

      {/* Notifications List */}
      <div className="flex flex-col gap-3">
        {paginated.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <Bell size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? "نتیجه‌ای برای جستجوی شما یافت نشد" : "هیچ اعلانی یافت نشد"}
            </p>
          </div>
        ) : (
          paginated.map((notif: Notification, idx: number) => (
            <AdvancedScrollAnimation key={notif.id} type="slide-up" delay={0.4 + idx * 0.05} duration={0.4}>
              <div className={`rounded-2xl p-4 border transition-all shadow-[0_0_8px] shadow-blue-300/20 hover:shadow-blue-300/40 ${
                !notif.isRead
                  ? "bg-blue-50/60 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800/30"
                  : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700"
              }`}>
                
                {/* Mobile View */}
                <div className="flex flex-col gap-2 md:hidden">
                  <p className="font-medium text-gray-800 dark:text-white text-sm">{notif.title || "بدون عنوان"}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2">{notif.message}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-400">{formatDate(notif.createdAt)}</span>
                    {!notif.isRead ? (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs transition-colors"
                      >
                        <CheckCheck size={12} className="inline ml-1" />
                        خوانده شد
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-xs">
                        <Check size={12} className="inline ml-1" />
                        خوانده شده
                      </span>
                    )}
                  </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:flex md:items-center justify-between w-full">
                  <div className="w-2 flex-shrink-0">
                    {!notif.isRead && <span className="block w-2 h-2 rounded-full bg-[#0887CAB2]" />}
                  </div>
                  <div className="flex-1 min-w-0 px-3">
                    <p className="font-medium text-gray-800 dark:text-white text-sm truncate">{notif.title || "بدون عنوان"}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 truncate">{notif.message}</p>
                  </div>
                  <div className="w-32 text-center text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(notif.createdAt)}
                  </div>
                  <div className="w-24 text-center text-sm text-gray-500 dark:text-gray-400">
                    {formatTime(notif.createdAt)}
                  </div>
                  <div className="w-32 flex justify-center">
                    {!notif.isRead ? (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs transition-colors flex items-center gap-1"
                      >
                        <CheckCheck size={12} />
                        خوانده شد
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-xs flex items-center gap-1">
                        <Check size={12} />
                        خوانده شده
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </AdvancedScrollAnimation>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
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
  );
}

export default AdminNotificationClient