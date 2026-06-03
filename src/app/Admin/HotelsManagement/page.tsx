"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Home,
  MapPin,
  Star,
  DollarSign,
  X,
  User,
} from "lucide-react";
import toast from "react-hot-toast";
import Pagination from "../Pagination/PaginationAdmin";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import DetailModalHotel from "./more/DetailModalHotel";
import EditModalHotel from "./more/EditModalHotel";
import DeleteModalHotel from "./more/DeleteModalHotel";
import ActionMenu from "./more/ActionMenu";

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

const HotelsManagement = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [hasBookings, setHasBookings] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

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

  useEffect(() => {
    fetchHotels();
  }, []);

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.title?.toLowerCase().includes(search.toLowerCase()) ||
      hotel.address?.toLowerCase().includes(search.toLowerCase()) ||
      hotel.sellerName?.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
  const paginatedHotels = filteredHotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const resetFilters = () => {
    setSearch("");
  };

  const handleView = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsDetailOpen(true);
  };
  
  const handleEdit = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsEditOpen(true);
  };
  
  const handleDelete = async (hotel: Hotel) => {
    setSelectedHotel(hotel);
    const hasExistingBookings = await checkBookings(hotel.id);
    setHasBookings(hasExistingBookings);
    setIsDeleteOpen(true);
  };

  const confirmEdit = async (data: any) => {
    if (!selectedHotel) return;
    
    setEditLoading(true);
    const loadingToast = toast.loading("در حال ویرایش...");
    
    try {
      const token = getToken();
      
      const updateData: any = {};
      if (data.title !== undefined) updateData.title = data.title;
      if (data.address !== undefined) updateData.address = data.address;
      if (data.price !== undefined) updateData.price = Number(data.price);
      if (data.discounted_price !== undefined) updateData.discounted_price = data.discounted_price ? Number(data.discounted_price) : null;
      
      console.log("Updating hotel with data:", updateData);
      
      const response = await axios.patch(
        `${API_BASE_URL}/admin/houses/${selectedHotel.id}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.status === 200 || response.status === 201) {
        toast.success("هتل با موفقیت ویرایش شد", { id: loadingToast });
        await fetchHotels();
        setIsEditOpen(false);
        setSelectedHotel(null);
      } else {
        throw new Error("خطا در ویرایش هتل");
      }
    } catch (error: any) {
      console.error("Error editing hotel:", error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || "خطا در ویرایش هتل";
      toast.error(errorMessage, { id: loadingToast });
    } finally {
      setEditLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedHotel) return;
    
    setDeleteLoading(true);
    const loadingToast = toast.loading("در حال پردازش...");

    try {
      const token = getToken();
      const hotelId = selectedHotel.id;
      
      if (hasBookings) {
        const response = await axios.patch(
          `${API_BASE_URL}/admin/houses/${hotelId}`,
          { status: "inactive" },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (response.status === 200 || response.status === 201) {
          toast.success("هتل با موفقیت غیرفعال شد", { id: loadingToast });
          await fetchHotels();
          setIsDeleteOpen(false);
          setSelectedHotel(null);
        } else {
          throw new Error("خطا در غیرفعال کردن هتل");
        }
      } else {
        const response = await axios.delete(`${API_BASE_URL}/admin/houses/${hotelId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response.status === 200 || response.status === 204) {
          toast.success("هتل با موفقیت حذف شد", { id: loadingToast });
          await fetchHotels();
          setIsDeleteOpen(false);
          setSelectedHotel(null);
        } else {
          throw new Error("خطا در حذف هتل");
        }
      }
    } catch (error: any) {
      console.error("Delete error:", error);
      
      if (error.response?.status === 409 || 
          error.response?.status === 400 ||
          error.response?.data?.name === "SequelizeForeignKeyConstraintError") {
        try {
          const token = getToken();
          const hotelId = selectedHotel.id;
          
          const deactivateResponse = await axios.patch(
            `${API_BASE_URL}/admin/houses/${hotelId}`,
            { status: "inactive" },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          
          if (deactivateResponse.status === 200 || deactivateResponse.status === 201) {
            toast.success("هتل به دلیل وجود رزرو غیرفعال شد", { id: loadingToast });
            await fetchHotels();
            setIsDeleteOpen(false);
            setSelectedHotel(null);
          } else {
            toast.error("خطا در غیرفعال کردن هتل", { id: loadingToast });
          }
        } catch (err2: any) {
          const errorMsg = err2.response?.data?.message || "خطا در غیرفعال کردن هتل";
          toast.error(errorMsg, { id: loadingToast });
        }
      } else {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "خطا در عملیات";
        toast.error(errorMessage, { id: loadingToast });
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0887CAB2] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <AdvancedScrollAnimation type="slide-right" delay={0.1}>
        <div className="bg-gradient-to-l from-blue-700 rounded-tl-[42px] rounded-br-[42px] via-blue-800 to-indigo-900 rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold">مدیریت هتل‌ها</h1>
          <p className="text-blue-100 mt-1">مشاهده و مدیریت هتل‌های ثبت شده</p>
        </div>
      </AdvancedScrollAnimation>

      <AdvancedScrollAnimation type="slide-up" delay={0.2}>
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CAB2]" size={18} />
            <input
              type="text"
              placeholder="جستجوی نام هتل، آدرس یا نام فروشنده..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[48px] pr-10 pl-4 py-2.5 border border-[#0887CAB2] text-gray-700 dark:text-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0887CAB2] transition-all bg-white dark:bg-gray-800"
            />
          </div>
          {search && (
            <button
              onClick={resetFilters}
              className="px-3 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all flex items-center gap-2"
            >
              <X size={18} />
              <span className="hidden sm:inline">پاک کردن</span>
            </button>
          )}
        </div>
      </AdvancedScrollAnimation>

      <AdvancedScrollAnimation type="fade" delay={0.3}>
        <div className="hidden md:flex items-center justify-between h-[64px] rounded-[16px] px-5 font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 shadow-[0_0_8px] shadow-blue-300/30">
          <div className="w-[22%]">نام هتل</div>
          <div className="w-[25%]">آدرس</div>
          <div className="w-[15%]">قیمت</div>
          <div className="w-[10%]">امتیاز</div>
          <div className="w-[18%]">فروشنده</div>
          <div className="w-[10%] text-center">عملیات</div>
        </div>
      </AdvancedScrollAnimation>

      <div className="flex flex-col gap-2">
        {paginatedHotels.length > 0 ? (
          paginatedHotels.map((hotel, idx) => (
            <AdvancedScrollAnimation key={hotel.id} type="slide-up" delay={0.4 + idx * 0.05} duration={0.4}>
              <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 rounded-[16px] bg-white dark:bg-gray-800 hover:shadow-lg transition-all shadow-[0_0_8px] shadow-blue-300/20">
                <div className="flex flex-col gap-2 md:hidden">
                  <div className="flex items-center gap-2">
                    <Home size={16} className="text-gray-400" />
                    <span className="font-medium text-gray-800 dark:text-white">{hotel.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{hotel.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{hotel.sellerName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-gray-700 dark:text-gray-300">{hotel.rate}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#0887CAB2] font-bold">{hotel.price?.toLocaleString()} تومان</span>
                    <ActionMenu
                      onEdit={() => handleEdit(hotel)}
                      onDelete={() => handleDelete(hotel)}
                      onView={() => handleView(hotel)}
                    />
                  </div>
                </div>

                <div className="hidden md:flex md:items-center justify-between w-full">
                  <div className="w-[22%] flex items-center gap-2">
                    <Home size={16} className="text-gray-400" />
                    <span className="truncate text-gray-800 dark:text-white">{hotel.title}</span>
                  </div>
                  <div className="w-[25%] flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="truncate text-gray-600 dark:text-gray-400">{hotel.address}</span>
                  </div>
                  <div className="w-[15%] font-bold text-[#0887CAB2]">{hotel.price?.toLocaleString()} تومان</div>
                  <div className="w-[10%] flex items-center gap-1">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-gray-700 dark:text-gray-300">{hotel.rate}</span>
                  </div>
                  <div className="w-[18%] flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <User size={14} className="text-gray-400" />
                    <span className="truncate">{hotel.sellerName}</span>
                  </div>
                  <div className="w-[10%] flex justify-center">
                    <ActionMenu
                      onEdit={() => handleEdit(hotel)}
                      onDelete={() => handleDelete(hotel)}
                      onView={() => handleView(hotel)}
                    />
                  </div>
                </div>
              </div>
            </AdvancedScrollAnimation>
          ))
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
            <Home size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              {search ? "نتیجه‌ای برای جستجوی شما یافت نشد" : "هتلی یافت نشد"}
            </p>
          </div>
        )}
      </div>

      {filteredHotels.length > 0 && totalPages > 1 && (
        <AdvancedScrollAnimation type="fade" delay={0.6}>
          <div className="flex justify-start pt-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </AdvancedScrollAnimation>
      )}

      <DetailModalHotel 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
        hotel={selectedHotel} 
      />
      
      <EditModalHotel 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        onSave={confirmEdit} 
        hotel={selectedHotel} 
      />
      
      <DeleteModalHotel
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        hotelId={selectedHotel?.id || 0}
        hotelTitle={selectedHotel?.title || ""}
        hasBookings={hasBookings}
        loading={deleteLoading}
      />
    </div>
  );
};

export default HotelsManagement;