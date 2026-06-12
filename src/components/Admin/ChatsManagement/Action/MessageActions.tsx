"use client";
import { useState } from "react";
import { Edit2, Trash2, Check, X, AlertTriangle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";

interface MessageActionsProps {
  messageId: number;
  originalMessage: string;
  onEdit: (messageId: number, newMessage: string) => Promise<void>;
  onDelete: (messageId: number) => Promise<void>;
  isAdmin?: boolean;
}

const MessageActions = ({
  messageId,
  originalMessage,
  onEdit,
  onDelete,
  isAdmin = true,
}: MessageActionsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedMessage, setEditedMessage] = useState(originalMessage);
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    if (!editedMessage.trim()) {
      toast.error("پیام نمی‌تواند خالی باشد");
      return;
    }
    if (editedMessage === originalMessage) {
      setIsEditing(false);
      return;
    }
    setLoading(true);
    try {
      await onEdit(messageId, editedMessage);
      setIsEditing(false);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete(messageId);
      setShowDeleteModal(false);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditedMessage(originalMessage);
  };

  if (!isAdmin) return null;

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 mt-2">
        <input
          type="text"
          value={editedMessage}
          onChange={(e) => setEditedMessage(e.target.value)}
          className="flex-1 px-3 py-1 text-sm border border-[#0887CAB2] rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
          autoFocus
          disabled={loading}
        />
        <button
          onClick={handleEdit}
          disabled={loading}
          className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Check size={18} />}
        </button>

      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-1">
        <button
          onClick={() => setIsEditing(true)}
          className="p-1 text-gray-500 hover:text-[#0887CAB2] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          title="ویرایش پیام"
        >
          <Edit2 size={14} />
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          title="حذف پیام"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {showDeleteModal && createPortal(
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowDeleteModal(false)} />
          <div dir="rtl" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 p-6">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">حذف پیام</h2>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col items-center text-center gap-4 py-2">
              <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle size={28} className="text-red-300" />
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">آیا از حذف این پیام اطمینان دارید؟</p>
                <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">این عملیات قابل بازگشت نیست</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                {loading ? "در حال حذف..." : "حذف کن"}
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                انصراف
              </button>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
};

export default MessageActions;