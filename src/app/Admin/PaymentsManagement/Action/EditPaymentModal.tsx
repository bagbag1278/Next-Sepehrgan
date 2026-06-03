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
  { value: "pending",   label: "در انتظار" },
  { value: "completed", label: "پرداخت شده" },
  { value: "failed",    label: "ناموفق" },
];

const EditPaymentModal = ({ isOpen, payment, onClose, onSave }: EditPaymentModalProps) => {
  const [amount, setAmount]               = useState("");
  const [status, setStatus]               = useState<PaymentStatus>("pending");
  const [description, setDescription]     = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [submitting, setSubmitting]       = useState(false);

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
    } catch {
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = `
    w-full px-4 py-3 border border-[#0887CAB2] rounded-2xl
    bg-white  text-[#0887CAB2] 
 focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]
  `;

  return (
    <>
      <div className="fixed h-full inset-0 z-50 bg-black/50 " onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">ویرایش پرداخت</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* مبلغ */}
          <div>
            <label className="block text-sm font-medium text-[#0887CAB2] mb-1">مبلغ (تومان)</label>
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">وضعیت</label>
            <div className="flex gap-2">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStatus(opt.value)}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all ${
                    status === opt.value
                      ? "bg-[#0887CAB2] text-white border-[#0887CAB2]"
                      : "bg-white dark:bg-gray-700 text-[#0887CAB2] border-[#0887CAB2] hover:bg-[#0887CA]/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* کد تراکنش */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">کد تراکنش</label>
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">توضیحات</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={inputClass}
              placeholder="توضیحات را وارد کنید"
            />
          </div>

          {/* دکمه‌ها */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 rounded-xl bg-[#0887CAB2] text-white hover:bg-[#0887CA]/90 transition-all disabled:opacity-50 flex items-center justify-center"
            >
              {submitting ? <Loader2 size={18} className="animate-spin" /> : "ذخیره تغییرات"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPaymentModal;