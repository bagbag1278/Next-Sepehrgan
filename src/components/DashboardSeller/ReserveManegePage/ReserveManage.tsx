"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import CirclesIcon from '../Icon/CirclesIcon';
import {
    CheckCircle2,
    MinusCircle,
    MoreVertical,
    Search,
    ChevronDown,
    Info,
    Ban,
    Check,
    Trash2,
    XCircle
} from 'lucide-react';
import GetBookingsCustomers, { IBooking } from '@/core/api/DashboardSeller/GetBookingsCustomers';
import DeleteBooking from "@/core/api/DashboardSeller/DeleteBooking";
import ContinueBooking from "@/core/api/DashboardSeller/ContinueBooking";
import CancelBooking from "@/core/api/DashboardSeller/CancelBooking";
import ReserveDropdown from "./ReserveDropdown";
import { formatReservationDate } from '@/core/Untils/date';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Pagination from './Pagination';
import toast from 'react-hot-toast';
import ReserveDetailsModal from './ReserveDetailsModal';

const ReserveManage = () => {
    const [openReserveMenu, setOpenReserveMenu] = useState<number | null>(null);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const reserveMenuRef = useRef<HTMLDivElement | null>(null);

    const [allBookings, setAllBookings] = useState<IBooking[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const limit = 4;

    const status = searchParams.get("status") || "";
    const houseId = searchParams.get("houseId") || "";
    const reserveDate = searchParams.get("reserveDate") || "";
    const reserveTime = searchParams.get("reserveTime") || "";
    const reservationStatus = searchParams.get("reservationStatus") || "";

    const [modalFilters, setModalFilters] = useState({
        reserveDate,
        reserveTime,
        reservationStatus,
    });

    // فیلتر جستجوی زنده
    const filteredBookings = useMemo(() => {
        if (!searchTerm.trim()) return allBookings;

        const term = searchTerm.toLowerCase().trim();
        return allBookings.filter(booking => {
            const fullName = `${booking.traveler_details?.[0]?.firstName || ''} ${booking.traveler_details?.[0]?.lastName || ''}`.toLowerCase();
            return fullName.includes(term);
        });
    }, [allBookings, searchTerm]);

    const paginatedBookings = useMemo(() => {
        const start = (page - 1) * limit;
        return filteredBookings.slice(start, start + limit);
    }, [filteredBookings, page, limit]);

    const totalPages = Math.ceil(filteredBookings.length / limit);

    // جستجوی زنده + ذخیره در URL
    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        const params = new URLSearchParams(searchParams.toString());
        if (value.trim()) {
            params.set("search", value.trim());
        } else {
            params.delete("search");
        }
        params.set("page", "1");
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    // بستن منو با کلیک خارج
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (reserveMenuRef.current && !reserveMenuRef.current.contains(event.target as Node)) {
                setOpenReserveMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // دریافت داده‌ها
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetBookingsCustomers({
                    page: 1,
                    limit: 100,
                    status: status || undefined,
                    houseId: houseId ? Number(houseId) : undefined,
                });
                setAllBookings(data.bookings || []);
                setTotalCount(data.totalCount || 0);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setAllBookings([]);
                setTotalCount(0);
            }
        };
        fetchData();
    }, [status, houseId]);

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(newPage));
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const openFilterModal = () => {
        setModalFilters({ reserveDate, reserveTime, reservationStatus });
        setShowFilterModal(true);
    };

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (modalFilters.reserveDate) params.set("reserveDate", modalFilters.reserveDate);
        else params.delete("reserveDate");
        if (modalFilters.reserveTime) params.set("reserveTime", modalFilters.reserveTime);
        else params.delete("reserveTime");
        if (modalFilters.reservationStatus) params.set("reservationStatus", modalFilters.reservationStatus);
        else params.delete("reservationStatus");

        params.set("page", "1");
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        setShowFilterModal(false);
    };

    const resetFilters = () => {
        setModalFilters({ reserveDate: "", reserveTime: "", reservationStatus: "" });
        const params = new URLSearchParams(searchParams.toString());
        params.delete("reserveDate");
        params.delete("reserveTime");
        params.delete("reservationStatus");
        params.set("page", "1");
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        setShowFilterModal(false);
    };

    // عملیات رزرو
    const handleContinueBooking = async (bookingId: number) => {
        try {
            await ContinueBooking(bookingId);
            setAllBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: "confirmed" } : b));
            toast.success("رزرو تایید شد");
            setOpenReserveMenu(null);
        } catch (error) {
            toast.error("خطا در تایید رزرو");
        }
    };

    const handleCancelBooking = async (bookingId: number, currentStatus: string) => {
        if (currentStatus !== "pending") {
            toast.error("فقط رزروهای در انتظار قابل لغو هستند");
            return;
        }
        try {
            await CancelBooking(bookingId);
            setAllBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: "canceled" } : b));
            toast.success("رزرو لغو شد");
            setOpenReserveMenu(null);
        } catch (error) {
            toast.error("خطا در لغو رزرو");
        }
    };

    const handleDeleteBooking = async (bookingId: number) => {
        try {
            await DeleteBooking(bookingId);
            setAllBookings(prev => prev.filter(b => b.id !== bookingId));
            toast.success("رزرو حذف شد");
            setOpenReserveMenu(null);
        } catch (error) {
            toast.error("حذف رزرو ناموفق بود");
        }
    };

    // For Reservedropdown 
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                reserveMenuRef.current &&
                !reserveMenuRef.current.contains(event.target as Node)
            ) {
                setOpenReserveMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    return (
        <div>
            {/* PAGE TITLE */}
            <div className="w-full h-14 flex gap-1 mb-6">
                <div className="w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse scale-x-[-1]">
                    <CirclesIcon />
                </div>
                <div className="dark:text-blue-500 text-blue-200 text-[18px] font-bold">مدیریت رزروها</div>
                <div className="w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse">
                    <CirclesIcon />
                </div>
            </div>

            {/* Header + Filters */}
            <div className='flex flex-wrap justify-between items-center mb-5'>
                <div className='flex gap-2 text-[14px] text-blue-400 dark:text-blue-500'>
                    <span>لیست رزرو های مشتریان</span>
                    <div className='text-gray-500'>({totalCount})</div>
                </div>

                <div className="flex flex-wrap justify-end gap-4 items-center">
                    {/* Live Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" size={25} />
                        <input
                            type="text"
                            placeholder="جستجو نام مسافر..."
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="w-112.5 text-[#0887CAB2] h-12 rounded-2xl pr-3 dark:bg-slate-800 border border-[#0887CAB2]/70 outline-none focus:border-[#0887CAB2] focus:ring-[#0887CAB2]/30"
                        />
                    </div>

                    {/* Filter Button */}
                    <button
                        onClick={openFilterModal}
                        className="h-12 bg-white dark:bg-slate-800 border text-[#0887CAB2] border-[#0887CAB2]/70 dark:border-slate-600 rounded-xl px-4 py-2.5 text-sm w-52 flex items-center justify-between hover:border-[#0887CAB2] transition-all"
                    >
                        <span className="truncate">
                            {houseId || reserveDate || reserveTime || reservationStatus ? "فیلتر فعال" : "فیلتر"}
                        </span>
                        <ChevronDown size={18} />
                    </button>
                </div>
            </div>

            {/* Table Header */}
            <div className="flex justify-center h-16 items-center bg-white dark:bg-slate-800 mx-2 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 px-6 py-4 text-gray-500 dark:text-gray-300 text-sm mb-2">
                <div className="w-full flex justify-between">
                    <span className="w-30">نام اقامتگاه</span>
                    <span className="w-25">قیمت</span>
                    <span>نام مسافر</span>
                    <span className="w-30 text-center">زمان رزرو</span>
                    <span>تاریخ رزرو</span>
                    <span>وضعیت</span>
                    <span className="w-12">عملیات</span>
                </div>
            </div>

            {/* Table Rows */}
            <div className="">
                {paginatedBookings.length > 0 ? (
                    paginatedBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="flex items-center flex-row-reverse justify-around h-16 mt-2 mx-2 mb-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/40 hover:border-blue-500/40 transition-all duration-200"
                        >
                            {/* Operations Menu */}
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setOpenReserveMenu(openReserveMenu === booking.id ? null : booking.id
                                        )
                                    }
                                >
                                    <MoreVertical size={18} />
                                </button>

                                {openReserveMenu === booking.id && (
                                    <ReserveDropdown
                                        bookingId={booking.id}
                                        status={booking.status}
                                        onContinue={handleContinueBooking}
                                        onCancel={handleCancelBooking}
                                        onDelete={handleDeleteBooking}
                                        onDetails={(id) => {
                                            setSelectedBookingId(id);
                                            setShowDetailsModal(true);
                                            setOpenReserveMenu(null);
                                        }}
                                    />
                                )}

                                <ReserveDetailsModal
                                    isOpen={showDetailsModal}
                                    onClose={() => {
                                        setShowDetailsModal(false);
                                        setSelectedBookingId(null);

                                    }}
                                />
                            </div>

                            {/* Status */}
                            <div className="w-20 flex justify-center">
                                {booking.status === "confirmed" ? <CheckCircle2 className="text-green-500" /> :
                                    booking.status === "pending" ? <MinusCircle className="text-yellow-500" /> :
                                        booking.status === "canceled" ? <XCircle className="text-red-500" /> : null}
                            </div>

                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                {formatReservationDate(booking.createdAt)}
                            </span>

                            <span className="w-30 justify-center flex gap-1 text-sm text-gray-600 dark:text-gray-300">
                                {booking.reservedDates?.[0] ? formatReservationDate(booking.reservedDates[0]) : "بدون تاریخ"}
                            </span>

                            <span className="flex gap-1 text-sm text-gray-600 dark:text-gray-300">
                                {booking.traveler_details?.[0]?.firstName} {booking.traveler_details?.[0]?.lastName}
                            </span>

                            <span className="text-blue-800 dark:text-blue-300 font-medium text-sm">
                                {Number(booking.house?.price || 0).toLocaleString("fa-IR")} تومان
                            </span>

                            <div className="flex items-center gap-2">
                                <span className="w-20 text-sm text-gray-800 dark:text-gray-200">
                                    {booking.house?.title}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                        {searchTerm ? "هیچ رزروی با این نام یافت نشد" : "رزروی یافت نشد"}
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="w-full flex justify-start mt-6">
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>

            {/* Filter Modal */}
            {showFilterModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-100">
                    <div className="bg-white px-4 dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden" style={{ width: "360px", height: "400px" }}>
                        <div className="px-5 py-5 border-b dark:border-slate-700 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">فیلترها</h3>
                            <button onClick={() => setShowFilterModal(false)} className="text-2xl text-gray-400 hover:text-gray-600">×</button>
                        </div>

                        <div className="p-6 space-y-5" style={{ height: "calc(370px - 140px)" }}>
                            <div>
                                <select value={modalFilters.reserveDate} onChange={(e) => setModalFilters({ ...modalFilters, reserveDate: e.target.value })} className="w-full h-12 bg-white dark:bg-slate-800 border border-blue-300 text-blue-300 dark:border-slate-600 rounded-xl px-4 appearance-none">
                                    <option value="" disabled>تاریخ رزرو</option>
                                    <option value="">همه تاریخ‌ها</option>
                                    <option value="today">امروز</option>
                                    <option value="thisWeek">این هفته</option>
                                    <option value="lastWeek">هفته گذشته</option>
                                    <option value="thisMonth">این ماه</option>
                                </select>
                            </div>

                            <div>
                                <select value={modalFilters.reserveTime} onChange={(e) => setModalFilters({ ...modalFilters, reserveTime: e.target.value })} className="w-full h-12 bg-white dark:bg-slate-800 border border-blue-300 text-blue-300 dark:border-slate-600 rounded-xl px-4 appearance-none">
                                    <option value="" disabled>زمان رزرو</option>
                                    <option value="">همه زمان‌ها</option>
                                    <option value="morning">صبح</option>
                                    <option value="afternoon">ظهر</option>
                                    <option value="evening">عصر</option>
                                    <option value="night">شب</option>
                                </select>
                            </div>

                            <div>
                                <select value={modalFilters.reservationStatus} onChange={(e) => setModalFilters({ ...modalFilters, reservationStatus: e.target.value })} className="w-full h-12 bg-white dark:bg-slate-800 border border-blue-300 text-blue-300 dark:border-slate-600 rounded-xl px-4 appearance-none">
                                    <option value="" disabled>وضعیت رزرو</option>
                                    <option value="">همه وضعیت‌ها</option>
                                    <option value="pending">در انتظار</option>
                                    <option value="confirmed">تأیید شده</option>
                                    <option value="canceled">لغو شده</option>
                                </select>
                            </div>
                        </div>

                        <div className="px-6 py-5 border-t dark:border-slate-700 flex gap-3">
                            <button onClick={resetFilters} className="flex-1 h-11 rounded-2xl border border-gray-300 dark:border-slate-600 text-sm font-medium">پاک کردن</button>
                            <button onClick={applyFilters} className="flex-1 h-11 rounded-2xl bg-[#0887CAB2] text-white text-sm font-medium hover:bg-[#0778b3]">اعمال فیلتر</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReserveManage;