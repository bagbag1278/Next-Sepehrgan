"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { X, Trash2 } from "lucide-react";

interface User {
  id: number;
  fullName: string;
}

interface DeleteUserProps {
  user: User;
  onDelete: (userId: number) => void;
  trigger?: React.ReactNode; 
}

export default function DeleteUser({ user, onDelete, trigger }: DeleteUserProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://next.genzuni.website/api/admin/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`کاربر ${user.fullName} حذف شد`);
      onDelete(user.id);
      setOpen(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "خطا در حذف");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {trigger || <Trash2 size={16} className="text-red-500" />}
      </span>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-red-600">حذف کاربر</h3>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <p className="mb-6">
              آیا از حذف <span className="font-bold">{user.fullName}</span> مطمئن هستید؟
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setOpen(false)} className="px-4 py-2 border rounded-xl">
                انصراف
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-xl disabled:opacity-50"
              >
                {loading ? "در حال حذف..." : "حذف"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}