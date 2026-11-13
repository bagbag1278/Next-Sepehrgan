import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";

interface DashboardStats {
  totalUsers: number;
  totalHouses: number;
  totalBookings: number;
  averageRating: number;
}

interface Booking {
  id: number;
  user_id: number;
  houseId: number;
  status: string;
  total_price?: number;
  price?: number;
  created_at?: string;
  reservedDates?: string[];
  traveler_details?: any[];
  sharedEmail?: string;
  sharedMobile?: string;
}

interface House {
  title: string;
  price: number;
}

export const useAdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalHouses: 0,
    totalBookings: 0,
    averageRating: 0,
  });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [houses, setHouses] = useState<Record<number, House>>({});
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem("accessToken");

  const fetchStats = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/Admin/dashboard`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      const dashboardData = data.data || data;

      setStats({
        totalUsers: dashboardData.totalUsers || 0,
        totalHouses: dashboardData.totalHouses || 0,
        totalBookings: dashboardData.totalBookings || 0,
        averageRating: Number(dashboardData.averageRating) || 0,
      });
    } catch (error) {
      console.error("خطا در دریافت آمار:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/Admin/bookings`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      let bookingsList: Booking[] = data.data || data;
      if (!Array.isArray(bookingsList)) bookingsList = [];
      setBookings(bookingsList);

      const houseIds = [...new Set(bookingsList.map((b: Booking) => b.houseId).filter(Boolean))];
      const housesMap: Record<number, House> = {};

      for (const id of houseIds) {
        try {
          const res = await fetch(`${API_BASE_URL}/houses/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const houseData = await res.json();
            const house = houseData.data || houseData;
            housesMap[id] = {
              title: house.title || `ملک ${id}`,
              price: Number(house.price) || 0,
            };
          } else {
            housesMap[id] = { title: `ملک ${id}`, price: 0 };
          }
        } catch {
          housesMap[id] = { title: `ملک ${id}`, price: 0 };
        }
      }
      setHouses(housesMap);
      setLoading(false);
    } catch (error) {
      console.error("خطا در دریافت رزروها:", error);
      setLoading(false);
    }
  };

  const updateBooking = async (bookingId: number, data: any) => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/Admin/bookings/${bookingId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  };

  const deleteBooking = async (bookingId: number) => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/Admin/bookings/${bookingId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  };

  const getHouseTitle = (houseId: number): string => {
    return houses[houseId]?.title || `ملک شماره ${houseId}`;
  };

  const getHousePrice = (houseId: number): number => {
    return houses[houseId]?.price || 0;
  };

  const getUserName = (userId: number): string => {
    return `کاربر ${userId}`;
  };

  const getUserEmail = (userId: number): string => {
    return "";
  };

  const getUserPhone = (userId: number): string => {
    return "";
  };

  return {
    stats,
    bookings,
    houses,
    loading,
    fetchStats,
    fetchBookings,
    updateBooking,
    deleteBooking,
    getHouseTitle,
    getHousePrice,
    getUserName,
    getUserEmail,
    getUserPhone,
  };
};