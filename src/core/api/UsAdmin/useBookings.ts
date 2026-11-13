import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";

export interface Booking {
  id: number;
  user_id: number;
  houseId: number;
  reservedDates: string[];
  traveler_details: any[];
  status: string;
  sharedEmail: string | null;
  sharedMobile: string | null;
  createdAt: string;
  created_at: string;
  updatedAt: string;
  updated_at: string;
  total_price?: number;
}

export interface House {
  id: number;
  title: string;
  price: number;
  address: string;
  photos: string[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
}

export const useBookings = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [housesMap, setHousesMap] = useState<Map<number, House>>(new Map());
  const [usersMap, setUsersMap] = useState<Map<number, User>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getToken = () => localStorage.getItem("accessToken");

  const fetchHouses = async (houseIds: number[]) => {
    const token = getToken();
    const newMap = new Map<number, House>();

    for (const hid of houseIds) {
      try {
        const res = await fetch(`${API_BASE_URL}/houses/${hid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          const houseData = data.data || data;
          newMap.set(hid, {
            id: houseData.id || hid,
            title: houseData.title || "",
            price: Number(houseData.price) || 0,
            address: houseData.address || "",
            photos: houseData.photos || [],
          });
        }
      } catch {
        newMap.set(hid, { id: hid, title: "", price: 0, address: "", photos: [] });
      }
    }
    setHousesMap(newMap);
  };

  const fetchUsers = async (userIds: number[]) => {
    const token = getToken();
    const newMap = new Map<number, User>();

    for (const uid of userIds) {
      try {
        const res = await fetch(`${API_BASE_URL}/users/${uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          const userData = data.data || data;
          newMap.set(uid, {
            id: userData.id || uid,
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            mobile: userData.mobile || userData.phone || "",
          });
        }
      } catch {
        newMap.set(uid, { id: uid, firstName: "", lastName: "", email: "", mobile: "" });
      }
    }
    setUsersMap(newMap);
  };

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(`${API_BASE_URL}/Admin/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          router.push("/login");
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }

      const result = await res.json();
      const data = result.data || result;
      setBookings(Array.isArray(data) ? data : []);

      if (Array.isArray(data) && data.length) {
        const houseIds = [...new Set(data.map((b: Booking) => b.houseId).filter(Boolean))];
        const userIds = [...new Set(data.map((b: Booking) => b.user_id).filter(Boolean))];
        await Promise.all([fetchHouses(houseIds), fetchUsers(userIds)]);
      }
    } catch (err) {
      setError("خطا در دریافت رزروها");
    } finally {
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

  return {
    bookings,
    housesMap,
    usersMap,
    loading,
    error,
    fetchBookings,
    updateBooking,
    deleteBooking,
    getHouseTitle: (houseId: number) => housesMap.get(houseId)?.title || `ملک شماره ${houseId}`,
    getHousePrice: (houseId: number) => housesMap.get(houseId)?.price || 0,
    getUserName: (userId: number, booking?: Booking) => {
      const user = usersMap.get(userId);
      if (user?.firstName || user?.lastName) {
        return `${user.firstName || ""} ${user.lastName || ""}`.trim();
      }
      if (booking?.traveler_details?.[0]?.firstName) {
        return `${booking.traveler_details[0].firstName} ${booking.traveler_details[0].lastName || ""}`;
      }
      return `کاربر ${userId}`;
    },
    getUserEmail: (userId: number) => usersMap.get(userId)?.email || "",
    getUserMobile: (userId: number) => usersMap.get(userId)?.mobile || "",
  };
};