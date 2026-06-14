"use client";
import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { PaymentStatus, Payment } from "@/core/service/paymentService";

interface EditPaymentModalProps {
  isOpen: boolean;
  payment: Payment | null;
  onClose: () => void;
  onSave: (id: number, data: Partial<Payment>) => Promise<void>;
}

const statusOptions: { value: PaymentStatus; label: string }[] = [
  { value: "pending", label: "در انتظار" },
  { value: "completed", label: "پرداخت شده" },
  { value: "failed", label: "ناموفق" },
];

const EditPaymentModal = ({ isOpen, payment, onClose, onSave }: EditPaymentModalProps) => {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<PaymentStatus>("pending");
  const [description, setDescription] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (payment) {
      setAmount(payment.amount);
      setStatus(payment.status);
      setDescription(payment.description);
      setTransactionId(payment.transactionId || "");
    }
  }, [payment]);

  if (!isOpen || !payment) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("مبلغ باید معتبر باشد");
      return;
    }
    setSubmitting(true);
    try {
      await onSave(payment.id, {
        amount,
        status,
        description,
        transactionId: transactionId || null,
      });
      toast.success("پرداخت با موفقیت ویرایش شد");
      onClose();
    } catch (error) {
      toast.error("خطا در ویرایش پرداخت");
    } finally {
      setSubmitting(false);
    }
  };

  // کلاس مشترک برای ورودی‌ها با پشتیبانی کامل دارک مود
  const inputClass = `
    w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 
    border border-gray-200 dark:border-gray-700 
    rounded-2xl text-gray-800 dark:text-gray-100
    focus:outline-none focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA]
    transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500
  `;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 h-full bg-black/70 backdrop-blur-md z-50" 
        onClick={onClose} 
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl z-[60] overflow-hidden border border-gray-100 dark:border-gray-700">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">ویرایش پرداخت</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">شناسه: #{payment.id}</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-all active:scale-95"
          >
            <X size={22} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* مبلغ */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              مبلغ (تومان)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={inputClass}
              placeholder="مبلغ را وارد کنید"
              required
            />
          </div>

          {/* وضعیت */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              وضعیت پرداخت
            </label>
            <div className="grid grid-cols-3 gap-3">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStatus(opt.value)}
                  className={`py-3.5 px-4 rounded-2xl text-sm font-medium border transition-all duration-200 ${
                    status === opt.value
                      ? "bg-[#0887CA] text-white border-[#0887CA] shadow-md"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* کد تراکنش */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              کد تراکنش
            </label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className={inputClass}
              placeholder="کد تراکنش را وارد کنید"
            />
          </div>

          {/* توضیحات */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              توضیحات
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={`${inputClass} resize-y min-h-[100px]`}
              placeholder="توضیحات پرداخت را وارد کنید"
            />
          </div>

          {/* دکمه‌ها */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 py-3.5 rounded-2xl border border-gray-300 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-[0.985] disabled:opacity-50"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3.5 rounded-2xl bg-[#0887CA] hover:bg-[#0778B3] text-white font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.985] disabled:opacity-70 shadow-lg shadow-[#0887CA]/30"
            >
              {submitting && <Loader2 size={20} className="animate-spin" />}
              {submitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPaymentModal;