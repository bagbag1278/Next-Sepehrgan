// components/AcceptBookingModal/AcceptBookingModal.tsx
"use client";
import { X, CheckCircle } from "lucide-react";

interface AcceptBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookingId: number;
}

const AcceptBookingModal = ({ isOpen, onClose, onConfirm, bookingId }: AcceptBookingModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-md relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-5">
          <h2 className="text-xl font-bold text-green-600">تایید رزرو</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-5 text-center">
          <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
          <p className="text-gray-700 dark:text-gray-300 mb-2">آیا از تایید این رزرو اطمینان دارید؟</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">کد رزرو: #{bookingId}</p>
        </div>

        <div className="flex gap-3 border-t border-gray-200 dark:border-gray-700 p-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-all">
            انصراف
          </button>
          <button onClick={() => { onConfirm(); onClose(); }} className="flex-1 py-2.5 rounded-xl text-white bg-green-600 hover:bg-green-700 transition-all">
            بله، تایید شود
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptBookingModal;