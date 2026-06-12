import { useState } from "react";
import toast from "react-hot-toast";

export interface Notification {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getToken = () => localStorage.getItem("accessToken");

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    
    const token = getToken();
    
    if (!token) {
      setError("توکن یافت نشد. لطفاً وارد شوید.");
      setLoading(false);
      return;
    }

    try {
      const url = `${API_BASE_URL}/api/notifications`;
      console.log("📡 آدرس:", url);
      
      const response = await fetch(url, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      console.log("📥 وضعیت:", response.status);

      if (response.status === 401) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      console.log("📦 پاسخ کامل:", result);

      const data = result.data || result;
      console.log("✅ داده استخراج شده:", data);
      
      setNotifications(Array.isArray(data) ? data : []);
      
    } catch (err: any) {
      console.error("❌ خطا:", err);
      setError(err.message || "خطا در دریافت اعلان‌ها");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/api/notifications/${id}/read`, {
        method: "PUT",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        setNotifications(prev =>
          prev.map(n => n.id === id ? { ...n, isRead: true } : n)
        );
        toast.success("اعلان خوانده شد");
      }
    } catch (err) {
      toast.error("خطا در بروزرسانی");
    }
  };

  const markAllAsRead = async (notificationsList: Notification[]) => {
    const unreadIds = notificationsList.filter(n => !n.isRead).map(n => n.id);
    if (unreadIds.length === 0) {
      toast("هیچ اعلان خوانده نشده‌ای وجود ندارد");
      return;
    }

    try {
      const token = getToken();
      for (const id of unreadIds) {
        await fetch(`${API_BASE_URL}/api/notifications/${id}/read`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      toast.success("همه اعلان‌ها خوانده شد");
    } catch (err) {
      toast.error("خطا در بروزرسانی");
    }
  };

  return {
    notifications,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
  };
};