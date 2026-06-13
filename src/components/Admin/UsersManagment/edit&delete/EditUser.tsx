"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { X, Edit, UserCog, Store, User as UserIcon, Loader2 } from "lucide-react";

interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  role: "buyer" | "seller" | "admin";
}

interface EditUserProps {
  user: User;
  onEdit: (updatedUser: User, originalUser?: User) => Promise<void>;
  trigger?: React.ReactNode;
}

export default function EditUser({ user, onEdit, trigger }: EditUserProps) {
  const [open, setOpen] = useState(false);
  const [originalRole, setOriginalRole] = useState(user.role);
  const [form, setForm] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
    role: user.role,
  });
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (newRole: "buyer" | "seller" | "admin") => {
    setForm({ ...form, role: newRole });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updatedUser: User = {
        ...user,
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phoneNumber: form.phoneNumber?.trim() || null,
        role: form.role,
      };
      
      await onEdit(updatedUser, { ...user, role: originalRole });
      toast.success("اطلاعات کاربر با موفقیت به‌روز شد");
      setOpen(false);
      setOriginalRole(form.role);
      
    } catch (err: any) {
      console.error("خطا:", err);
      toast.error(err.message || "خطا در ویرایش کاربر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer inline-flex items-center justify-center p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
        {trigger || <Edit size={16} className="text-blue-500" />}
      </span>

      {open && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setOpen(false)}
        >
          <div 
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full mx-auto shadow-xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                ویرایش کاربر
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={18} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  نام کامل
                </label>
                <input
                  type="text"
                  placeholder="نام کامل"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  ایمیل
                </label>
                <input
                  type="email"
                  placeholder="ایمیل"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  شماره تماس
                </label>
                <input
                  dir="rtl"
                  type="tel"
                  placeholder="شماره تماس"
                  value={form.phoneNumber || ""}
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  نقش کاربری
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleRoleChange("buyer")}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border transition-all ${
                      form.role === "buyer"
                        ? "bg-green-50 dark:bg-green-900/30 border-green-500 text-green-600 dark:text-green-400"
                        : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <UserIcon size={16} />
                    <span className="text-sm">کاربر عادی</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange("seller")}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border transition-all ${
                      form.role === "seller"
                        ? "bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Store size={16} />
                    <span className="text-sm">فروشنده</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange("admin")}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border transition-all ${
                      form.role === "admin"
                        ? "bg-purple-50 dark:bg-purple-900/30 border-purple-500 text-purple-600 dark:text-purple-400"
                        : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <UserCog size={16} />
                    <span className="text-sm">ادمین</span>
                  </button>
                </div>
              </div>

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
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading && <Loader2 size={18} className="animate-spin" />}
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