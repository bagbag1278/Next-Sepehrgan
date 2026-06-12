"use client";
import { useState } from "react";
import { Trash2, Loader2, X, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

interface DeletePaymentButtonProps {
  paymentId: number;
  paymentTitle: string;
  onDelete: (id: number) => Promise<void>;
  className?: string;
}

const DeletePaymentButton = ({
  paymentId,
  paymentTitle,
  onDelete,
  className = "",
}: DeletePaymentButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(paymentId);
      toast.success("پرداخت با موفقیت حذف شد");
      setShowModal(false);
    } catch {
      toast.error("خطا در حذف پرداخت");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={isDeleting}
        className={`p-2 rounded-lg  transition-colors disabled:opacity-50 group ${className}`}
      >
        <Trash2 size={16} className="text-red-500 transition-transform duration-200 group-hover:scale-110" />
      </button>

      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 p-6">
            
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">حذف پرداخت</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col items-center text-center gap-4 py-2">
              <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle size={28} className="text-red-200" />
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  آیا از حذف
                  <span className="font-bold text-gray-900 dark:text-white mx-1">«{paymentTitle}»</span>
                  اطمینان دارید؟
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">این عملیات قابل بازگشت نیست</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                {isDeleting ? "در حال حذف..." : "حذف کن"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                انصراف
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DeletePaymentButton;