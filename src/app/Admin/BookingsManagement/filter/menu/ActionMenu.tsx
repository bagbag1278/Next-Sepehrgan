// components/ActionMenu/ActionMenu.tsx
"use client";
import { useState } from "react";
import { MoreVertical, Eye, Edit, Trash2, CheckCircle } from "lucide-react";

interface ActionMenuProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onAccept?: () => void;
}

const ActionMenu = ({ onView, onEdit, onDelete, onAccept }: ActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
      >
        <MoreVertical size={18} className="text-gray-500 dark:text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div
            className=" inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute  left-0 top-full mt-2 w-44 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
            


            {onView && (
              <button
                onClick={() => {
                  onView();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2.5 text-right text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-all"
              >
                <Eye size={16} className="text-blue-500" />
                <span>جزئیات رزرو</span>
              </button>
            )}

            {onEdit && (
              <button
                onClick={() => {
                  onEdit();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2.5 text-right text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-all"
              >
                <Edit size={16} className="text-yellow-500" />
                <span>ویرایش رزرو</span>
              </button>
            )}

            {onDelete && (
              <button
                onClick={() => {
                  onDelete();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2.5 text-right text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-all border-t border-gray-100 dark:border-gray-700"
              >
                <Trash2 size={16} className="text-red-500" />
                <span>لغو رزرو</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ActionMenu;