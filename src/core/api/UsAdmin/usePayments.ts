import { useState } from "react";
import { paymentService, Payment, UpdatePaymentData } from "@/core/service/paymentService";
import toast from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";

export const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [usersMap, setUsersMap] = useState<Map<number, string>>(new Map());
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem("accessToken");

  const fetchUsers = async (userIds: number[]) => {
    try {
      const token = getToken();
      const newMap = new Map<number, string>();

      for (const uid of userIds) {
        try {
          const res = await fetch(`${API_BASE_URL}/users/${uid}`, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          });

          if (res.ok) {
            const data = await res.json();
            const userData = data.data || data;
            const name = userData.firstName && userData.lastName
              ? `${userData.firstName} ${userData.lastName}`
              : userData.email?.split("@")[0] || `کاربر ${uid}`;
            newMap.set(uid, name);
          } else {
            newMap.set(uid, `کاربر ${uid}`);
          }
        } catch {
          newMap.set(uid, `کاربر ${uid}`);
        }
      }
      setUsersMap(newMap);
    } catch (err) {
      console.error("خطا در دریافت اطلاعات کاربران:", err);
    }
  };

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const paymentsData = await paymentService.getPayments();
      setPayments(paymentsData);

      if (paymentsData.length) {
        const userIds = [...new Set(paymentsData.map((p: Payment) => p.userId).filter(Boolean))];
        await fetchUsers(userIds);
      }
    } catch (error) {
      console.error(error);
      toast.error("خطا در دریافت اطلاعات پرداخت‌ها");
    } finally {
      setLoading(false);
    }
  };

  const updatePayment = async (id: number, data: Partial<Payment>) => {
    try {
      await paymentService.updatePayment(id, data as UpdatePaymentData);
      setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
      toast.success("پرداخت با موفقیت ویرایش شد");
    } catch (error) {
      console.error("Error updating payment:", error);
      toast.error("خطا در ویرایش پرداخت");
      throw error;
    }
  };

  const deletePayment = async (id: number) => {
    try {
      await paymentService.deletePayment(id);
      setPayments((prev) => prev.filter((p) => p.id !== id));
      toast.success("پرداخت با موفقیت حذف شد");
    } catch (error) {
      console.error("Error deleting payment:", error);
      toast.error("خطا در حذف پرداخت");
      throw error;
    }
  };

  const getUserName = (userId: number) => {
    return usersMap.get(userId) || `کاربر ${userId}`;
  };

  return {
    payments,
    usersMap,
    loading,
    fetchPayments,
    updatePayment,
    deletePayment,
    getUserName,
  };
};