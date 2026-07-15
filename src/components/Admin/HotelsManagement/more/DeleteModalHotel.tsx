"use client";
import { X, AlertTriangle, Trash2 } from "lucide-react";

interface DeleteModalHotelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  hotelId: number;
  hotelTitle: string;
  loading?: boolean;
}

const DeleteModalHotel = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  hotelId, 
  hotelTitle, 
  loading = false
}: DeleteModalHotelProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-md relative shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
        
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-center gap-2">
            <Trash2 size={20} className="text-red-50" />
            <h2 className="text-xl font-bold text-red-600">حذف هتل</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertTriangle size={40} className="text-red-50" />
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium mb-2">
            آیا از حذف این هتل اطمینان دارید؟
          </p>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            این عمل غیرقابل بازگشت است و تمام اطلاعات مربوط به هتل حذف خواهد شد.
          </p>
          
          <div className="bg-gray-100 dark:bg-gray-700/50 rounded-xl p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">شناسه هتل</p>
            <p className="text-sm font-mono font-bold text-gray-800 dark:text-gray-200">#{hotelId}</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">{hotelTitle}</p>
          </div>
        </div>

        <div className="flex gap-3 border-t border-gray-200 dark:border-gray-700 p-5">
          <button 
            onClick={onClose} 
            disabled={loading}
            className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50 font-medium"
          >
            انصراف
          </button>
          <button 
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                در حال حذف...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                بله، حذف شود
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalHotel;