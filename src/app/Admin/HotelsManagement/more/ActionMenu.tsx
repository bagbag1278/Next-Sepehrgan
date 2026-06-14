"use client";
import { useState } from "react";
import { Eye, Edit, Trash2, MoreVertical } from "lucide-react";

interface ActionMenuProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ActionMenu = ({ onView, onEdit, onDelete }: ActionMenuProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
      >
        <MoreVertical size={18} className="text-gray-500" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-xl shadow-[0_0_8px] shadow-blue-300/30 bo z-50 overflow-hidden ">
            <button
              onClick={() => {
                onView();
                setOpen(false);
              }}
              className="w-full px-4 py-2 text-right text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
            >
              <Eye size={16} className="text-blue-500" /> جزئیات
            </button>
            <button
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
              className="w-full px-4 py-2 text-right text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 "
            >
              <Edit size={16} className="text-green-500" /> ویرایش
            </button>
            <button
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
              className="w-full px-4 py-2 text-right text-sm hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
            >
              <Trash2 size={16} className="text-red-500" /> حذف
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ActionMenu;