import { X, AlertTriangle, Trash2 } from "lucide-react";
import { createPortal } from "react-dom";

interface ClearChatModalProps {
  isOpen: boolean;
  roomName?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const ClearChatModal = ({ isOpen, roomName, onClose, onConfirm }: ClearChatModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div dir="rtl" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">پاک کردن گفتگو</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>
        <div className="text-center py-4">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
          <p className="text-gray-700 text-sm">
            آیا از پاک کردن تمام پیام‌های
            <span className="font-bold mx-1">«گفتگو #{roomName}»</span>
            اطمینان دارید؟
          </p>
          <p className="text-gray-400 text-xs mt-1">این عملیات قابل بازگشت نیست</p>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onConfirm} className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium flex items-center justify-center gap-2">
            <Trash2 size={16} /> پاک کن
          </button>
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200">
            انصراف
          </button>
        </div>
      </div>
    </>,
    document.body
  );
};