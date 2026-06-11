"use client";
import { useState } from "react";
import { MoreVertical, Eye, Edit, Trash2, CheckCircle, Ban } from "lucide-react";

interface ActionMenuProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onAccept?: () => void;
  onCancel?: () => void;
}

const ActionMenu = ({ onView, onEdit, onDelete, onAccept, onCancel }: ActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
      >
        <MoreVertical size={18} className="text-gray-500 dark:text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
            
            {/* تایید رزرو */}
            {onAccept && (
              <button
                onClick={() => {
                  onAccept();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-right text-sm text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 flex items-center gap-3 transition-all border-b border-gray-100 dark:border-gray-700"
              >
                <div className="w-6 flex justify-center">
                  <CheckCircle size={16} className="text-green-500" />
                </div>
                <span>تایید رزرو</span>
              </button>
            )}

            {/* لغو رزرو */}
            {onCancel && (
              <button
                onClick={() => {
                  onCancel();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-right text-sm text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 flex items-center gap-3 transition-all border-b border-gray-100 dark:border-gray-700"
              >
                <div className="w-6 flex justify-center">
                  <Ban size={16} className="text-orange-500" />
                </div>
                <span>لغو رزرو</span>
              </button>
            )}

            {/* جزئیات رزرو */}
            {onView && (
              <button
                onClick={() => {
                  onView();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-all border-b border-gray-100 dark:border-gray-700"
              >
                <div className="w-6 flex justify-center">
                  <Eye size={16} className="text-blue-500" />
                </div>
                <span>جزئیات رزرو</span>
              </button>
            )}

            {/* ویرایش رزرو */}
            {onEdit && (
              <button
                onClick={() => {
                  onEdit();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-all border-b border-gray-100 dark:border-gray-700"
              >
                <div className="w-6 flex justify-center">
                  <Edit size={16} className="text-yellow-500" />
                </div>
                <span>ویرایش رزرو</span>
              </button>
            )}

            {/* حذف رزرو */}
            {onDelete && (
              <button
                onClick={() => {
                  onDelete();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-right text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-all"
              >
                <div className="w-6 flex justify-center">
                  <Trash2 size={16} className="text-red-500" />
                </div>
                <span>حذف رزرو</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ActionMenu;