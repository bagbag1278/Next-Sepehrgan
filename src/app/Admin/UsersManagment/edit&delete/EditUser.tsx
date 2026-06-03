"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { X, Edit } from "lucide-react";

interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  role: "buyer" | "seller" | "admin";
}

interface EditUserProps {
  user: User;
  onEdit: (updatedUser: User) => void;
  trigger?: React.ReactNode;
}

export default function EditUser({ user, onEdit, trigger }: EditUserProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      
      const response = await axios.put(
        `http://next.genzuni.website/api/admin/users/${user.id}`,
        {
          full_name: form.fullName,
          email: form.email,
          phone: form.phoneNumber,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("پاسخ سرور:", response.data);

      const updatedData = response.data?.data || response.data;
      
      const updatedUser: User = {
        ...user,
        fullName: updatedData.full_name || updatedData.fullName || form.fullName,
        email: updatedData.email || form.email,
        phoneNumber: updatedData.phone || updatedData.phoneNumber || form.phoneNumber,
      };

      toast.success("اطلاعات کاربر با موفقیت به‌روز شد");
      onEdit(updatedUser);
      setOpen(false);
    } catch (err: any) {
      console.error("خطا:", err.response?.data);
      toast.error(err.response?.data?.message || "خطا در ویرایش");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {trigger || <Edit size={16} className="text-blue-500" />}
      </span>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div 
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full mx-4 shadow-lg transition-all"
            style={{ boxShadow: "0 4px 12px #0887CA4D" }}
          >
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">ویرایش کاربر</h3>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={18} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <input
                type="text"
                placeholder="نام کامل"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />

              <input
                type="email"
                placeholder="ایمیل"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />

              <input
                dir="rtl"
                type="tel"
                placeholder="شماره تماس"
                value={form.phoneNumber}
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "در حال ذخیره..." : "ذخیره"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}