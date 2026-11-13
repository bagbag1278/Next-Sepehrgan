"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Users,
  UserCog,
  Store,
  User as UserIcon,
  Filter,
  X,
  Mail,
  Phone,
  CalendarDays,
  BadgeCheck,
} from "lucide-react";

import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import Pagination from "@/components/Admin/Pagination/PaginationAdmin";
import DeleteUser from "../../UsersManagment/edit&delete/DeleteUsers";
import EditUser from "../../UsersManagment/edit&delete/EditUser";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";

interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  role: "buyer" | "seller" | "admin";
  created_at?: string;
}

const AdminUserMangmentClient = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "seller" | "buyer">("all");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const getToken = () => localStorage.getItem("accessToken");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) {
        console.error("توکن یافت نشد");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/Admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const usersList = response.data?.data || response.data || [];
      setUsers(Array.isArray(usersList) ? usersList : []);
    } catch (error: any) {
      console.error("خطا در دریافت کاربران:", error);
      
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      !search ||
      user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.phoneNumber?.toLowerCase().includes(search.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter]);

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleEdit = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? { ...u, ...updatedUser } : u))
    );
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString("fa-IR");
    } catch {
      return "—";
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return { 
          label: "ادمین", 
          className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
          icon: <BadgeCheck size={14} className="ml-1" />
        };
      case "seller":
        return { 
          label: "فروشنده", 
          className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
          icon: <Store size={14} className="ml-1" />
        };
      default:
        return { 
          label: "کاربر عادی", 
          className: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
          icon: <UserIcon size={14} className="ml-1" />
        };
    }
  };

  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === "admin").length;
  const sellerCount = users.filter((u) => u.role === "seller").length;
  const buyerCount = users.filter((u) => u.role === "buyer").length;

  const resetFilters = () => {
    setSearch("");
    setRoleFilter("all");
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

  return (
    <div dir="rtl" className="p-4 sm:p-6 space-y-4 sm:space-y-6 min-h-screen">
      {/* Header */}
      <AdvancedScrollAnimation type="slide-right" delay={0.1}>
                       <div className="bg-gradient-to-br from-slate-100 via-white to-gray-100 
                dark:from-slate-950 dark:via-gray-900 dark:to-slate-900 
                rounded-tl-[42px] rounded-br-[42px] rounded-2xl p-7 
                shadow-lg shadow-gray-200/70 dark:shadow-none
                border border-gray-200 dark:border-gray-700/50">
  <h1 className="text-3xl font-bold text-gray-900 dark:text-white"> مشاهده و مدریت کاربران ثبت شده </h1>
  <p className="text-gray-500 dark:text-gray-400 mt-2">  به مدیریت  کاربران سیستم خوش امدید</p>
</div>
      </AdvancedScrollAnimation>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <AdvancedScrollAnimation type="fade" delay={0.1}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 sm:p-4 shadow-md">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-[#0887CAB2]" />
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">کل کاربران</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mt-1">{totalUsers}</p>
          </div>
        </AdvancedScrollAnimation>
        
        <AdvancedScrollAnimation type="fade" delay={0.2}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 sm:p-4 shadow-md">
            <div className="flex items-center gap-2">
              <UserCog size={18} className="text-purple-500" />
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">ادمین‌ها</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">{adminCount}</p>
          </div>
        </AdvancedScrollAnimation>
        
        <AdvancedScrollAnimation type="fade" delay={0.3}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 sm:p-4 shadow-md">
            <div className="flex items-center gap-2">
              <Store size={18} className="text-blue-500" />
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">فروشندگان</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{sellerCount}</p>
          </div>
        </AdvancedScrollAnimation>
        
        <AdvancedScrollAnimation type="fade" delay={0.4}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 sm:p-4 shadow-md">
            <div className="flex items-center gap-2">
              <UserIcon size={18} className="text-green-500" />
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">کاربران عادی</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{buyerCount}</p>
          </div>
        </AdvancedScrollAnimation>
      </div>

      {/* Search & Filters */}
      <AdvancedScrollAnimation type="slide-up" delay={0.2}>
        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CAB2]" size={18} />
            <input
              type="text"
              placeholder="جستجوی نام، ایمیل یا شماره تماس..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[48px] pr-10 pl-4 py-2.5 border border-[#0887CAB2] text-gray-700 dark:text-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0887CAB2] transition-all bg-white dark:bg-gray-800"
            />
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2.5 rounded-2xl bg-white dark:bg-gray-800 text-[#0887CAB2] border border-[#0887CAB2] hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
              >
                <Filter size={18} />
                <span>
                  {roleFilter === "all" && "همه نقش‌ها"}
                  {roleFilter === "admin" && "ادمین"}
                  {roleFilter === "seller" && "فروشنده"}
                  {roleFilter === "buyer" && "کاربر عادی"}
                </span>
                <svg className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isOpen && (
                <div className="absolute mt-1 mr-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-10 overflow-hidden">
                  <div
                    onClick={() => { setRoleFilter("all"); setIsOpen(false); }}
                    className="px-4 py-2.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    همه نقش‌ها
                  </div>
                  <div
                    onClick={() => { setRoleFilter("admin"); setIsOpen(false); }}
                    className="px-4 py-2.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    ادمین
                  </div>
                  <div
                    onClick={() => { setRoleFilter("seller"); setIsOpen(false); }}
                    className="px-4 py-2.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    فروشنده
                  </div>
                  <div
                    onClick={() => { setRoleFilter("buyer"); setIsOpen(false); }}
                    className="px-4 py-2.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    کاربر عادی
                  </div>
                </div>
              )}
            </div>
            
            {(roleFilter !== "all" || search) && (
              <button
                onClick={resetFilters}
                className="px-3 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all flex items-center gap-2"
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
        <div className="hidden md:flex items-center justify-between h-[64px] rounded-[16px] px-5 font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 shadow-[0_0_8px] shadow-blue-300/30">
          <div className="w-[25%]">نام کاربر</div>
          <div className="w-[20%]">ایمیل</div>
          <div className="w-[15%]">شماره تماس</div>
          <div className="w-[12%]">نقش</div>
          <div className="w-[15%]">تاریخ عضویت</div>
          <div className="w-[13%] text-center">عملیات</div>
        </div>
      </AdvancedScrollAnimation>

      {/* Users List */}
      <div className="flex flex-col gap-2">
        {paginatedUsers.length > 0 ? (
          paginatedUsers.map((user, idx) => {
            const roleBadge = getRoleBadge(user.role);
            return (
              <AdvancedScrollAnimation key={user.id} type="slide-up" delay={0.4 + idx * 0.05} duration={0.4}>
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 rounded-[16px] bg-white dark:bg-gray-800 hover:shadow-lg transition-all shadow-[0_0_8px] shadow-blue-300/20">
                  
                  {/* Mobile View */}
                  <div className="flex flex-col gap-3 md:hidden">
                    <div className="flex items-center gap-2">
                      <UserIcon size={16} className="text-gray-400" />
                      <span className="font-medium text-gray-800 dark:text-white">{user.fullName || "نامشخص"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400 text-sm break-all">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400 text-sm">{user.phoneNumber || "—"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${roleBadge.className}`}>
                        {roleBadge.label}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <CalendarDays size={14} />
                        {formatDate(user.created_at)}
                      </span>
                    </div>
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <EditUser user={user} onEdit={handleEdit} />
                      <DeleteUser user={user} onDelete={handleDelete} />
                    </div>
                  </div>

                  {/* Desktop View */}
                  <div className="hidden md:flex md:items-center justify-between w-full">
                    <div className="w-[25%] flex items-center gap-2">
                      <UserIcon size={16} className="text-gray-400" />
                      <span className="font-medium text-gray-800 dark:text-white truncate">
                        {user.fullName || "نامشخص"}
                      </span>
                    </div>
                    <div className="w-[20%] flex items-center gap-2">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400 truncate">{user.email}</span>
                    </div>
                    <div className="w-[11%] flex items-center gap-2">
                      <Phone size={16} className="text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">{user.phoneNumber || "—"}</span>
                    </div>
                    <div className="w-[12%]">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${roleBadge.className}`}>
                        {roleBadge.label}
                      </span>
                    </div>
                    <div className="w-[15%] flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <CalendarDays size={14} />
                      <span>{formatDate(user.created_at)}</span>
                    </div>
                    <div className="w-[13%] flex items-center justify-center gap-3">
                      <EditUser user={user} onEdit={handleEdit} />
                      <DeleteUser user={user} onDelete={handleDelete} />
                    </div>
                  </div>
                </div>
              </AdvancedScrollAnimation>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
            <Users size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              {search || roleFilter !== "all" ? "نتیجه‌ای برای جستجوی شما یافت نشد" : "هیچ کاربری یافت نشد"}
            </p>
          </div>
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
};

export default AdminUserMangmentClient;