"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Clock,
  User,
  Filter,
  X,
  DollarSign,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Link as LinkIcon,
  Edit2,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Pagination from "../Pagination/PaginationAdmin";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import {
  paymentService,
  Payment,
  UpdatePaymentData,
} from "@/core/service/paymentService";
import DeletePaymentButton from "./Action/DeletePaymentButton";
import EditPaymentModal from "./Action/EditPaymentModal";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";

const PaymentsManagement = () => {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [usersMap, setUsersMap] = useState<Map<number, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const itemsPerPage = 10;

  const fetchUsers = async (userIds: number[]) => {
    try {
      const token = localStorage.getItem("accessToken");
      const newMap = new Map<number, string>();

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
            const name =
              userData.firstName && userData.lastName
                ? `${userData.firstName} ${userData.lastName}`
                : userData.email?.split("@")[0] || `کاربر ${uid}`;
            newMap.set(uid, name);
          } else {
            newMap.set(uid, `کاربر ${uid}`);
          }
        } catch {
          newMap.set(uid, `کاربر ${uid}`);
        }
      }
      setUsersMap(newMap);
    } catch (err) {
      console.error("خطا در دریافت اطلاعات کاربران:", err);
    }
  };

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const paymentsData = await paymentService.getPayments();
      setPayments(paymentsData);

      if (paymentsData.length) {
        const userIds = [
          ...new Set(
            paymentsData.map((p: Payment) => p.userId).filter(Boolean),
          ),
        ];
        await fetchUsers(userIds);
      }
    } catch (error) {
      console.error(error);
      toast.error("خطا در دریافت اطلاعات پرداخت‌ها");
    } finally {
      setLoading(false);
    }
  };
  const handleUpdatePayment = async (id: number, data: Partial<Payment>) => {
    try {
      await paymentService.updatePayment(id, data as UpdatePaymentData);
      setPayments((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...data } : p)),
      );
      toast.success("پرداخت با موفقیت ویرایش شد");
    } catch (error) {
      console.error("Error updating payment:", error);
      toast.error("خطا در ویرایش پرداخت");
      throw error;
    }
  };
  const handleDeletePayment = async (id: number) => {
    try {
      await paymentService.deletePayment(id);
      setPayments((prev) => prev.filter((p) => p.id !== id));
      toast.success("پرداخت با موفقیت حذف شد");
    } catch (error) {
      console.error("Error deleting payment:", error);
      toast.error("خطا در حذف پرداخت");
      throw error;
    }
  };

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/30", label: "پرداخت شده" };
    case "pending":
      return { icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/30", label: "در انتظار" };
    case "failed":
      return { icon: XCircle, color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/30", label: "ناموفق" };
    default:
      return { icon: AlertCircle, color: "text-gray-600", bg: "bg-gray-50 dark:bg-gray-800", label: "نامشخص" };
  }
};
  const getUserName = (userId: number) => {
    return usersMap.get(userId) || `کاربر ${userId}`;
  };

  const formatDate = (str: string) => {
    try {
      const date = new Date(str);
      return date.toLocaleDateString("fa-IR");
    } catch {
      return "-";
    }
  };

  const formatTime = (str: string) => {
    try {
      const date = new Date(str);
      return date.toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "-";
    }
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  const handleEdit = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowEditModal(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) router.push("/login");
    else fetchPayments();
  }, []);

  const filteredPayments = payments.filter((payment) => {
    const userName = getUserName(payment.userId);
    const matchSearch =
      userName.toLowerCase().includes(search.toLowerCase()) ||
      String(payment.id).includes(search) ||
      (payment.transactionId &&
        payment.transactionId.toLowerCase().includes(search.toLowerCase())) ||
      payment.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" || payment.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalAmount = filteredPayments.reduce(
    (sum, p) => sum + (parseFloat(p.amount) || 0),
    0,
  );
  const paidAmount = filteredPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  const pendingAmount = filteredPayments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);

  const statusOptions = [
    { value: "all", label: "همه" },
    { value: "completed", label: "پرداخت شده" },
    { value: "pending", label: "در انتظار" },
    { value: "failed", label: "ناموفق" },
  ];
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="text-center">
          <Loader2
            size={40}
            className="animate-spin text-[#0887CAB2] mx-auto mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="px-4 sm:px-8 py-6 space-y-6 min-h-screen"
    >
      {/* Header */}
      <AdvancedScrollAnimation type="slide-right" delay={0.1}>
        <div className="bg-gradient-to-l from-blue-700 rounded-tl-[42px] rounded-br-[42px] via-blue-800 to-indigo-900 rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold">مدیریت پرداخت‌ها</h1>
          <p className="text-blue-100 mt-1">مشاهده و مدیریت تراکنش‌های مالی</p>
        </div>
      </AdvancedScrollAnimation>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AdvancedScrollAnimation type="fade" delay={0.1}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
              <CreditCard size={20} className="text-[#0887CAB2]" />
            </div>
            <div className="min-w-0">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                کل تراکنش‌ها
              </p>
              <p className="text-lg font-bold text-gray-800 dark:text-white">
                {filteredPayments.length}
              </p>
            </div>
          </div>
        </AdvancedScrollAnimation>

        <AdvancedScrollAnimation type="fade" delay={0.2}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-green-200 dark:bg-green-900/20 flex items-center justify-center shrink-0">
              <TrendingUp size={20} className="text-[#0887CAB2]" />
            </div>
            <div className="min-w-0">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                مجموع مبلغ
              </p>
              <p
                dir="ltr"
                className="text-lg font-bold text-[#0887CAB2] truncate"
              >
                {totalAmount.toLocaleString()} تومان
              </p>
            </div>
          </div>
        </AdvancedScrollAnimation>

        <AdvancedScrollAnimation type="fade" delay={0.3}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-green-200 dark:bg-green-900/20 flex items-center justify-center shrink-0">
              <CheckCircle size={20} className="text-[#0887CAB2]" />
            </div>
            <div className="min-w-0">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                پرداخت شده
              </p>
              <p
                dir="ltr"
                className="text-lg font-bold text-[#0887CAB2] truncate"
              >
                {paidAmount.toLocaleString()} تومان
              </p>
            </div>
          </div>
        </AdvancedScrollAnimation>

        <AdvancedScrollAnimation type="fade" delay={0.4}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center shrink-0">
              <AlertCircle size={20} className="text-[#0887CAB2]" />
            </div>
            <div className="min-w-0">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                در انتظار
              </p>
              <p
                dir="ltr"
                className="text-lg font-bold text-[#0887CAB2] truncate"
              >
                {pendingAmount.toLocaleString()} تومان
              </p>
            </div>
          </div>
        </AdvancedScrollAnimation>
      </div>

      <AdvancedScrollAnimation type="slide-up" delay={0.2}>
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <div className="relative w-full sm:w-96">
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CAB2] "
              size={18}
            />
            <input
              type="text"
              placeholder="جستجوی نام کاربر، کد تراکنش یا توضیحات..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pr-10 pl-4 border border-[#0887CAB2] text-[#0887CAB2]  rounded-2xl bg-white dark:bg-gray-800  dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className="px-4 py-3 rounded-2xl bg-white text-[#0887CAB2]  dark:bg-gray-800 dark:text-gray-300 border border-[#0887CAB2] hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2"
              >
                <Filter size={16} className="text-[#0887CAB2]" />
                <span>
                  وضعیت:{" "}
                  {statusOptions.find((o) => o.value === statusFilter)?.label ||
                    "همه"}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${isStatusOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isStatusOpen && (
                <div className="absolute mt-1 mr-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-10 overflow-hidden">
                  {statusOptions.map((opt) => (
                    <div
                      key={opt.value}
                      onClick={() => {
                        setStatusFilter(opt.value);
                        setIsStatusOpen(false);
                      }}
                      className="px-4 py-2 cursor-pointer text-[#0887CAB2]  hover:bg-gray-100 dark:hover:bg-gray-700  dark:text-gray-300"
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {(statusFilter !== "all" || search) && (
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

      <AdvancedScrollAnimation type="fade" delay={0.3}>
        <div className="hidden md:flex items-center justify-between h-16 rounded-xl px-5 font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 shadow-[0_0_8px] shadow-blue-300/30">
          <div className="w-[8%]">شناسه</div>
          <div className="w-[15%]">کاربر</div>
          <div className="w-[12%]">مبلغ</div>
          <div className="w-[12%]">وضعیت</div>
          <div className="w-[10%]">تاریخ</div>
          <div className="w-[8%]">زمان</div>
          <div className="w-[15%]">توضیحات</div>
          <div className="w-[10%]">کد تراکنش</div>
          <div className="w-[10%] text-center">عملیات</div>
        </div>
      </AdvancedScrollAnimation>

      {/* Payments List */}
      <div className="flex flex-col gap-3">
        {paginatedPayments.map((payment, idx) => {
          const status = getStatusIcon(payment.status);
          const StatusIcon = status.icon;
          const userName = getUserName(payment.userId);

          return (
            <AdvancedScrollAnimation
              key={payment.id}
              type="slide-up"
              delay={0.4 + idx * 0.05}
              duration={0.4}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all shadow-[0_0_8px] shadow-blue-300/20">
                {/* Mobile View */}
                <div className="flex flex-col gap-3 md:hidden">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800 dark:text-white">
                      #{payment.id}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(payment)}
                        className="p-2 rounded-lg  dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                      >
                        <Edit2 size={16} className="text-[#0887CAB2]" />
                      </button>
                      <DeletePaymentButton
                        paymentId={payment.id}
                        paymentTitle={`پرداخت ${userName}`}
                        onDelete={handleDeletePayment}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium ${status.bg} ${status.color}`}
                    >
                      <StatusIcon size={12} />
                      {status.label}
                    </span>
                    <span className="text-[#0887CAB2] font-bold">
                      {parseFloat(payment.amount).toLocaleString()} تومان
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span className="text-gray-800 dark:text-white">
                      {userName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Calendar size={12} />
                    <span>{formatDate(payment.createdAt)}</span>
                    <Clock size={12} className="mr-2" />
                    <span>{formatTime(payment.createdAt)}</span>
                  </div>
                  <div className="text-xs text-gray-500 line-clamp-2">
                    {payment.description}
                  </div>
                  {payment.transactionId && (
                    <div className="text-xs text-gray-400">
                      کد تراکنش: {payment.transactionId}
                    </div>
                  )}
                  {payment.paymentUrl && (
                    <a
                      href={payment.paymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0887CAB2] text-xs flex items-center gap-1"
                    >
                      <LinkIcon size={12} /> لینک پرداخت
                    </a>
                  )}
                </div>

                {/* Desktop View */}
                <div className="hidden md:flex md:items-center justify-between">
                  <div className="w-[8%] font-mono text-gray-800 dark:text-white">
                    #{payment.id}
                  </div>
                  <div className="w-[15%] text-gray-800 dark:text-white truncate">
                    {userName}
                  </div>
                  <div className="w-[12%] truncate font-bold text-[#0887CAB2]">
                    {parseFloat(payment.amount).toLocaleString()} تومان
                  </div>
                  <div className="w-[12%]">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${status.bg} ${status.color}`}
                    >
                      <StatusIcon size={12} />
                      {status.label}
                    </span>
                  </div>
                  <div className="w-[10%] text-gray-500 text-sm">
                    {formatDate(payment.createdAt)}
                  </div>
                  <div className="w-[8%] text-gray-500 text-sm">
                    {formatTime(payment.createdAt)}
                  </div>
                  <div className="w-[15%] text-gray-500 text-sm truncate">
                    {payment.description}
                  </div>
                  <div className="w-[10%] text-gray-500 text-sm truncate">
                    {payment.transactionId || "-"}
                  </div>
                  <div className="w-[10%] flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(payment)}
                      className="p-2 rounded-lg  dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                      title="ویرایش"
                    >
                      <Edit2 size={16} className="text-[#0887CAB2]" />
                    </button>
                    <DeletePaymentButton
                      paymentId={payment.id}
                      paymentTitle={`پرداخت ${userName}`}
                      onDelete={handleDeletePayment}
                    />
                  </div>
                </div>
              </div>
            </AdvancedScrollAnimation>
          );
        })}
      </div>

      {filteredPayments.length > 0 && (
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

      {filteredPayments.length === 0 && !loading && (
        <AdvancedScrollAnimation type="scale" delay={0.2}>
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <DollarSign
              size={48}
              className="mx-auto text-gray-300 dark:text-gray-600 mb-3"
            />
            <p className="text-gray-500 dark:text-gray-400">
              هیچ پرداختی یافت نشد
            </p>
          </div>
        </AdvancedScrollAnimation>
      )}

      {/* Edit Modal */}
      <EditPaymentModal
        isOpen={showEditModal}
        payment={selectedPayment}
        onClose={() => {
          setShowEditModal(false);
          setSelectedPayment(null);
        }}
        onSave={handleUpdatePayment}
      />
    </div>
  );
};

export default PaymentsManagement;
