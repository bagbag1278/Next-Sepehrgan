"use client";
import { useState, useEffect } from "react";
import { X, DollarSign, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface Payment {
  id: number;
  amount: number;
  status: "paid" | "pending" | "failed";
  method: string;
  date: string;
  transactionId: string;
}

interface PaymentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: number;
}

const PaymentsModal = ({ isOpen, onClose, bookingId }: PaymentsModalProps) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !bookingId) return;

    const fetchPayments = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("accessToken");
        // ⚠️ مسیر API را مطابق با مستندات واقعی خود تنظیم کنید
        const response = await fetch(`/api-proxy/admin/payments?bookingId=${bookingId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const result = await response.json();
        let paymentsData = result.data || result;
        if (!Array.isArray(paymentsData)) paymentsData = [];

        const normalizedPayments = paymentsData.map((p: any) => ({
          id: p.id,
          amount: Number(p.amount),
          status: p.status,
          method: p.method || p.paymentMethod || "نامشخص",
          date: p.date || p.createdAt || p.created_at,
          transactionId: p.transactionId || p.transaction_id || "",
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
      case "paid": return <CheckCircle size={16} className="text-green-500" />;
      case "pending": return <AlertCircle size={16} className="text-yellow-500" />;
      case "failed": return <XCircle size={16} className="text-red-500" />;
      default: return <AlertCircle size={16} className="text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid": return "پرداخت شده";
      case "pending": return "در انتظار";
      case "failed": return "ناموفق";
      default: return status;
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "نامشخص";
    const date = new Date(dateStr);
    return date.toLocaleDateString("fa-IR");
  };

  const formatTime = (dateStr: string) => {
    if (!dateStr) return "نامشخص";
    const date = new Date(dateStr);
    return date.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
  };

  const totalPaid = payments.filter(p => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white dark:bg-gray-800 rounded-t-2xl border-b border-gray-200 dark:border-gray-700 p-5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">پرداختی‌های رزرو #{bookingId}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-5">
          {loading && <div className="flex justify-center py-8 text-gray-500">در حال بارگذاری...</div>}
          {error && <div className="text-center py-8 text-red-500">{error}</div>}
          {!loading && !error && payments.length === 0 && (
            <div className="text-center py-8 text-gray-500">هیچ پرداختی برای این رزرو یافت نشد.</div>
          )}
          {!loading && !error && payments.length > 0 && (
            <>


              <div className="flex flex-col gap-3">
                {payments.map((payment) => (
                  <div key={payment.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 shadow-[0_0_8px] shadow-blue-300/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <DollarSign size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{payment.amount.toLocaleString()} تومان</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{payment.method}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">{getStatusIcon(payment.status)}{getStatusText(payment.status)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{formatDate(payment.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{formatTime(payment.date)}</span>
                      </div>
                      <p>کد پیگیری: {payment.transactionId}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
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