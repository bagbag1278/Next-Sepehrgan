"use client";
import { useState, useEffect } from "react";
import { X, DollarSign, Calendar, Clock, CheckCircle, XCircle, AlertCircle, CreditCard } from "lucide-react";
import Link from "next/link";

interface Payment {
  id: number;
  userId: number;
  bookingId: number | null;
  amount: number;
  description: string;
  status: "pending" | "success" | "failed";
  paymentUrl: string;
  transactionId: string;
  createdAt: string | null;
  updatedAt: string | null;
}

interface PaymentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";

const PaymentsModal = ({ isOpen, onClose, bookingId }: PaymentsModalProps) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getToken = () => localStorage.getItem("accessToken");

  useEffect(() => {
    if (!isOpen || !bookingId) return;

    const fetchPayments = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getToken();
        if (!token) {
          setError("توکن یافت نشد");
          setLoading(false);
          return;
        }

        // دریافت تمام پرداخت‌ها و فیلتر بر اساس bookingId
        const response = await fetch(`${API_BASE_URL}/admin/payments`, {
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
        let paymentsData = result.data || result;
        if (!Array.isArray(paymentsData)) paymentsData = [];

        // فیلتر پرداخت‌های مربوط به این رزرو
        const filteredPayments = paymentsData.filter((p: any) => p.bookingId === bookingId);
        
        // نرمالایز کردن داده‌ها
        const normalizedPayments = filteredPayments.map((p: any) => ({
          id: p.id,
          userId: p.userId,
          bookingId: p.bookingId,
          amount: Number(p.amount),
          description: p.description || "",
          status: p.status === "success" ? "success" : p.status === "failed" ? "failed" : "pending",
          paymentUrl: p.paymentUrl || "",
          transactionId: p.transactionId || "نامشخص",
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
        }));

        setPayments(normalizedPayments);
      } catch (err) {
        console.error("خطا در دریافت پرداخت‌ها:", err);
        setError("خطا در دریافت اطلاعات پرداخت");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [isOpen, bookingId]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle size={16} className="text-green-500" />;
      case "pending": return <AlertCircle size={16} className="text-yellow-500" />;
      case "failed": return <XCircle size={16} className="text-red-500" />;
      default: return <AlertCircle size={16} className="text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "success": return "پرداخت شده";
      case "pending": return "در انتظار";
      case "failed": return "ناموفق";
      default: return status;
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "نامشخص";
    try {
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? "نامشخص" : date.toLocaleDateString("fa-IR");
    } catch {
      return "نامشخص";
    }
  };

  const formatTime = (dateStr: string | null) => {
    if (!dateStr) return "نامشخص";
    try {
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? "نامشخص" : date.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "نامشخص";
    }
  };

  const totalPaid = payments.filter(p => p.status === "success").reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white dark:bg-gray-800 rounded-t-2xl border-b border-gray-200 dark:border-gray-700 p-5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">پرداختی‌های رزرو #{bookingId}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all">
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-5">
          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0887CAB2]"></div>
            </div>
          )}
          
          {error && (
            <div className="text-center py-8 text-red-500 dark:text-red-400">{error}</div>
          )}
          
          {!loading && !error && payments.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              هیچ پرداختی برای این رزرو یافت نشد.
            </div>
          )}
          
          {!loading && !error && payments.length > 0 && (
            <div className="flex flex-col gap-3">
              {/* خلاصه پرداخت‌ها */}
              <div className="flex gap-3 mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="flex-1 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">مجموع پرداخت شده</p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">{totalPaid.toLocaleString()} تومان</p>
                </div>
                <div className="w-px bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex-1 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">در انتظار پرداخت</p>
                  <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{totalPending.toLocaleString()} تومان</p>
                </div>
              </div>

              {/* لیست پرداخت‌ها */}
              {payments.map((payment) => (
                <div key={payment.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 shadow-[0_0_8px] shadow-blue-300/30 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <DollarSign size={18} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{payment.amount.toLocaleString()} تومان</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">{getStatusIcon(payment.status)}{getStatusText(payment.status)}</span>
                        </div>
                      </div>
                    </div>
                    {payment.paymentUrl && payment.status === "pending" && (
                      <Link
                        href={payment.paymentUrl}
                        target="_blank"
                        className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-all flex items-center gap-1"
                      >
                        <CreditCard size={14} />
                        پرداخت
                      </Link>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap justify-between gap-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600 pt-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{formatDate(payment.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{formatTime(payment.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>کد پیگیری: {payment.transactionId}</span>
                    </div>
                  </div>
                  
                  {payment.description && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">توضیحات: {payment.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <button onClick={onClose} className="w-full py-2.5 rounded-xl bg-[#0887CAB2] text-white hover:bg-[#0887CA]/90 transition-all">
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsModal;