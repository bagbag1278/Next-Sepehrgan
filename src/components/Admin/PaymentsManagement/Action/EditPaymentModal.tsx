"use client";

import { useState, useEffect } from "react";
import { X, DollarSign, AlertCircle, Loader2, CreditCard, Hash, FileText } from "lucide-react";
import toast from "react-hot-toast";

interface Payment {
  id: number;
  userId: number;
  amount: string;
  status: string;
  description: string;
  transactionId?: string;
  paymentUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface EditPaymentModalProps {
  isOpen: boolean;
  payment: Payment | null;
  onClose: () => void;
  onSave: (id: number, data: Partial<Payment>) => Promise<void>;
}

const statusOptions = [
  { value: "pending", label: "در انتظار", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400", icon: "" },
  { value: "completed", label: "پرداخت شده", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400", icon: "" },
  { value: "failed", label: "ناموفق", color: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400", icon: "" },
];

const EditPaymentModal = ({ isOpen, payment, onClose, onSave }: EditPaymentModalProps) => {
  const [amount, setAmount] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (payment) {
      setAmount(payment.amount || "");
      setStatus(payment.status || "pending");
      setDescription(payment.description || "");
      setTransactionId(payment.transactionId || "");
    }
  }, [payment]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!payment) return;

    if (!amount) {
      toast.error("لطفاً مبلغ را وارد کنید");
      return;
    }

    if (Number(amount) <= 0) {
      toast.error("مبلغ باید بیشتر از صفر باشد");
      return;
    }

    if (!status) {
      toast.error("لطفاً وضعیت را انتخاب کنید");
      return;
    }

    setLoading(true);
    try {
      await onSave(payment.id, {
        amount,
        status,
        description,
        transactionId: transactionId || undefined,
      });
      onClose();
    } catch (error) {
      console.error("Error saving payment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 h-full bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">ویرایش پرداخت</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">شناسه: #{payment?.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
            >
              <X size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* مبلغ */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              مبلغ (تومان)
            </label>
            <div className="relative">
              <DollarSign size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CA]" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="مبلغ را وارد کنید"
                className="w-full pr-10 pl-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* وضعیت */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              وضعیت پرداخت
            </label>
            <div className="grid grid-cols-3 gap-2">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStatus(opt.value)}
                  className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    status === opt.value
                      ? `${opt.color} shadow-sm ring-1 ring-current`
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <span className="ml-1">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* کد تراکنش */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <span className="flex items-center gap-1">
                <Hash size={14} />
                کد تراکنش
                <span className="text-xs text-gray-400 font-normal">(اختیاری)</span>
              </span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="مانند: TRX-123456"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* توضیحات */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <span className="flex items-center gap-1">
                <FileText size={14} />
                توضیحات
                <span className="text-xs text-gray-400 font-normal">(اختیاری)</span>
              </span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="توضیحات مربوط به پرداخت..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white resize-none"
            />
          </div>

          {/* هشدار */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <span className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                تغییر وضعیت پرداخت ممکن است بر روی آمار مالی و گزارش‌ها تأثیر بگذارد. لطفاً با دقت انجام شود.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 dark:border-gray-800 p-5 bg-gray-50/50 dark:bg-gray-800/50 flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-all disabled:opacity-50"
          >
            انصراف
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-[#0887CA] hover:bg-[#0778B3] text-white font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-sm"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <CreditCard size={18} />
            )}
            {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditPaymentModal;