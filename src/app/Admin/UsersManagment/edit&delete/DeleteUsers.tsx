"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { X, Trash2, AlertTriangle } from "lucide-react";

interface User {
  id: number;
  fullName: string;
}

interface DeleteUserProps {
  user: User;
  onDelete: (userId: number) => void;
  trigger?: React.ReactNode; 
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";

const DeleteUser = ({ user, onDelete, trigger }: DeleteUserProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getToken = () => localStorage.getItem("accessToken");

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) {
        toast.error("توکن یافت نشد");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/admin/users/${user.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 400) {
          toast.error("این کاربر دارای رزرو فعال است و قابل حذف نیست");
        } else if (response.status === 401) {
          toast.error("نشست شما منقضی شده است");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          setTimeout(() => window.location.reload(), 1500);
        } else {
          toast.error(`خطا: ${response.status}`);
        }
        return;
      }

      toast.success(`کاربر ${user.fullName} با موفقیت حذف شد`);
      onDelete(user.id);
      setOpen(false);
      
    } catch (err: any) {
      console.error("خطا:", err);
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <span 
        onClick={() => setOpen(true)} 
        className="cursor-pointer inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all group"
      >
        {trigger || <Trash2 size={18} className="text-red-500 dark:text-red-400" />}
      </span>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setOpen(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-md relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-5">
              <h2 className="text-xl font-bold text-red-600">حذف کاربر</h2>
              <button onClick={() => setOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-5 text-center">
              <Trash2 size={48} className="mx-auto text-red-500 mb-4" />
              <p className="text-gray-700 dark:text-gray-300 mb-2">آیا از حذف این کاربر اطمینان دارید؟</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">نام کاربر: {user.fullName}</p>
            </div>

            <div className="flex gap-3 border-t border-gray-200 dark:border-gray-700 p-5">
              <button onClick={() => setOpen(false)} className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-500 transition-all">
                انصراف
              </button>
              <button 
                onClick={handleDelete} 
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl text-white bg-red-600 hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {loading ? "در حال حذف..." : "بله حذف شود"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteUser;