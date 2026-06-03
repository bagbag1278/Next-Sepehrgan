// components/DeleteModalHotel/DeleteModalHotel.tsx
"use client";
import { X, AlertTriangle } from "lucide-react";

interface DeleteModalHotelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  hotelId: number;
  hotelTitle: string;
  hasBookings?: boolean;
  loading?: boolean;
}

const DeleteModalHotel = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  hotelId, 
  hotelTitle, 
  hasBookings = false,
  loading = false
}: DeleteModalHotelProps) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    // توجه: onClose رو داخل onConfirm صدا نزن، چون اونجا خودش manage میکنه
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-md relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-5">
          <h2 className={`text-xl font-bold ${hasBookings ? "text-yellow-600" : "text-red-600"}`}>
            {hasBookings ? "غیرفعال سازی هتل" : "حذف هتل"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-5 text-center">
          <AlertTriangle size={48} className={`mx-auto mb-4 ${hasBookings ? "text-yellow-500" : "text-red-500"}`} />
          {hasBookings ? (
            <>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                این هتل دارای رزرو فعال است و قابل حذف نمی‌باشد.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                آیا می‌خواهید آن را غیرفعال کنید؟
              </p>
            </>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 mb-2">آیا از حذف این هتل اطمینان دارید؟</p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400">#{hotelId} - {hotelTitle}</p>
        </div>

        <div className="flex gap-3 border-t border-gray-200 dark:border-gray-700 p-5">
          <button 
            onClick={onClose} 
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            انصراف
          </button>
          <button 
            onClick={handleConfirm}
            disabled={loading}
            className={`flex-1 py-2.5 rounded-xl text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              hasBookings 
                ? "bg-yellow-600 hover:bg-yellow-700" 
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "در حال پردازش..." : (hasBookings ? "غیرفعال کن" : "بله، حذف شود")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalHotel;