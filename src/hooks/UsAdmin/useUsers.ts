import { useState } from "react";
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

  const fetchUsers = async () => {
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
      
      let usersList: User[] = [];
      if (response.data?.data && Array.isArray(response.data.data)) {
        usersList = response.data.data;
      } else if (Array.isArray(response.data)) {
        usersList = response.data;
      } else {
        usersList = [];
      }
      
      const formattedUsers = usersList.map((user: any) => ({
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
  };

  const handleDelete = async (id: number) => {
    try {
      const token = getToken();
      
      await axios.delete(`${API_BASE_URL}/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      await fetchUsers();
      toast.success("کاربر با موفقیت حذف شد");
    } catch (error: any) {
      console.error("خطا در حذف کاربر:", error);
      toast.error(error.response?.data?.message || "خطا در حذف کاربر");
    }
  };

const handleEdit = async (updatedUser: User) => {
  try {
    const token = getToken();
    
    const fullNameParts = updatedUser.fullName?.trim().split(" ") || [];
    const firstName = fullNameParts[0] || "";
    const lastName = fullNameParts.slice(1).join(" ") || "";
    
    const payload = {
      firstName: firstName,
      lastName: lastName,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber || "",
      emailVerified: false,
      membershipDate: new Date().toISOString(),
      profilePicture: "",
    };
    
    console.log(" ارسال داده برای ویرایش:", payload);
    
    const response = await axios.put(`${API_BASE_URL}/admin/users/${updatedUser.id}`, payload, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });
    
    console.log("پاسخ سرور:", response.data);
    
    await fetchUsers();
    toast.success("کاربر با موفقیت ویرایش شد");
    
  } catch (error: any) {
    console.error(" خطا در ویرایش کاربر:", error);
    console.error("پاسخ خطا:", error.response?.data);
    
    const errorMessage = error.response?.data?.message || error.response?.data?.error || "خطا در ویرایش کاربر";
    toast.error(errorMessage);
    throw error;
  }
};

  return {
    users,
    loading,
    error,
    fetchUsers,
    handleDelete,
    handleEdit,
  };
};