// useUsers.ts
import { useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  role: "buyer" | "seller" | "admin";
  created_at?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getToken = () => localStorage.getItem("accessToken");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        setError("لطفا وارد شوید");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/admin/users`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      
      let usersList: any[] = [];
      if (response.data?.data && Array.isArray(response.data.data)) {
        usersList = response.data.data;
      } else if (Array.isArray(response.data)) {
        usersList = response.data;
      } else {
        usersList = [];
      }
      
      const formattedUsers: User[] = usersList.map((user: any) => ({
        id: user.id,
        fullName: user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email?.split("@")[0] || "کاربر ناشناس",
        email: user.email,
        phoneNumber: user.phoneNumber || user.mobile || null,
        role: user.role || "buyer",
        created_at: user.created_at || user.createdAt,
      }));
      
      setUsers(formattedUsers);
    } catch (error: any) {
      console.error("خطا در دریافت کاربران:", error);
      
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
      } else {
        setError(error.response?.data?.message || "خطا در دریافت کاربران");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    try {
      const token = getToken();
      
      const response = await axios.delete(`${API_BASE_URL}/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.status === 200 || response.status === 204) {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        toast.success("کاربر با موفقیت حذف شد");
      }
    } catch (error: any) {
      console.error("خطا در حذف کاربر:", error);
      
      if (error.response?.status === 400) {
        toast.error("این کاربر دارای رزرو فعال است و قابل حذف نمی‌باشد");
      } else if (error.response?.status === 404) {
        toast.error("کاربر یافت نشد");
      } else if (error.response?.status === 403) {
        toast.error("شما دسترسی حذف کاربر را ندارید");
      } else {
        toast.error(error.response?.data?.message || "خطا در حذف کاربر");
      }
    }
  }, []);

  const handleEdit = useCallback(async (updatedUser: User, originalUser?: User) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("توکن یافت نشد");
        return;
      }
      
      const fullNameParts = updatedUser.fullName?.trim().split(" ") || [];
      const firstName = fullNameParts[0] || "";
      const lastName = fullNameParts.slice(1).join(" ") || "";
      
      const userInfoPayload = {
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: updatedUser.phoneNumber || "",
        emailVerified: 1,
        membershipDate: new Date().toISOString(),
        profilePicture: ""
      };
      
      const url = `${API_BASE_URL}/admin/users/${updatedUser.id}`;
      console.log("📡 درخواست ویرایش اطلاعات:", url);
      console.log("📦 payload:", userInfoPayload);
      
      await axios.put(url, userInfoPayload, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      
      console.log("✅ اطلاعات کاربر با موفقیت ویرایش شد");
      
      if (originalUser && originalUser.role !== updatedUser.role) {
        const rolePayload = { role: updatedUser.role };
        const roleUrl = `${API_BASE_URL}/admin/users/${updatedUser.id}/role`;
        
        console.log("📡 درخواست تغییر نقش:", roleUrl);
        console.log("📦 payload نقش:", rolePayload);
        
        await axios.put(roleUrl, rolePayload, {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });
        
        console.log("✅ نقش کاربر با موفقیت تغییر کرد");
      } else {
        console.log("ℹ نقش کاربر تغییر نکرده است");
      }
      
      setUsers(prevUsers => {
        const newUsers = prevUsers.map(user =>
          user.id === updatedUser.id
            ? {
                ...user,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                phoneNumber: updatedUser.phoneNumber,
                role: updatedUser.role,
              }
            : user
        );
        return [...newUsers];
      });
      
      toast.success("کاربر با موفقیت ویرایش شد");
      
    } catch (error: any) {
      console.error("❌ خطا در ویرایش کاربر:", error);
      console.log("وضعیت خطا:", error.response?.status);
      console.log("پیام خطا:", error.response?.data?.message);
      
      if (error.response?.status === 404) {
        toast.error("کاربر یافت نشد");
      } else if (error.response?.status === 403) {
        toast.error("شما دسترسی ویرایش این کاربر را ندارید");
      } else if (error.response?.status === 400) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "داده‌های ارسالی معتبر نیست";
        toast.error(errorMessage);
      } else {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "خطا در ویرایش کاربر";
        toast.error(errorMessage);
      }
      throw error;
    }
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    handleDelete,
    handleEdit,
  };
};