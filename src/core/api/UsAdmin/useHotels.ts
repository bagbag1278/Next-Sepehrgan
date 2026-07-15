import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";

interface Hotel {
  id: number;
  title: string;
  address: string;
  price: number;
  discounted_price: number | null;
  rate: number;
  photos: string[];
  created_at: string;
  sellerName?: string;
  sellerId?: number;
  status?: string;
}

export const useHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getToken = () => localStorage.getItem("accessToken");

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) {
        toast.error("لطفا وارد شوید");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/admin/houses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const hotelsData = response.data?.data || response.data || [];

      const hotelsWithSeller = hotelsData.map((hotel: any) => ({
        ...hotel,
        sellerName: hotel.sellerName || hotel.seller_name || `فروشنده ${hotel.sellerId || hotel.user_id || "نامشخص"}`,
      }));

      setHotels(hotelsWithSeller);
    } catch (error: any) {
      console.error("خطا در دریافت هتل‌ها:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
      } else {
        toast.error("خطا در دریافت لیست هتل‌ها");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateHotel = async (hotelId: number, data: any) => {
    const token = getToken();

    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.address !== undefined) updateData.address = data.address;
    if (data.price !== undefined) updateData.price = Number(data.price);
    if (data.discounted_price !== undefined) updateData.discounted_price = data.discounted_price ? Number(data.discounted_price) : null;
    if (data.rate !== undefined) updateData.rate = Number(data.rate);

    const response = await axios.put(
      `${API_BASE_URL}/admin/houses/${hotelId}`,
      updateData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response;
  };

  const deleteHotel = async (hotelId: number, hasBookings: boolean) => {
    const token = getToken();

    if (hasBookings) {
      const response = await axios.patch(
        `${API_BASE_URL}/admin/houses/${hotelId}`,
        { status: "inactive" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response;
    } else {
      const response = await axios.delete(`${API_BASE_URL}/admin/houses/${hotelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    }
  };

  const checkBookings = async (houseId: number) => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_BASE_URL}/admin/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { houseId },
      });
      const bookings = response.data?.data || response.data || [];
      return bookings.length > 0;
    } catch (error) {
      console.error("Error checking bookings:", error);
      return false;
    }
  };

  return {
    hotels,
    loading,
    search,
    setSearch,
    fetchHotels,
    updateHotel,
    deleteHotel,
    checkBookings,
  };
};