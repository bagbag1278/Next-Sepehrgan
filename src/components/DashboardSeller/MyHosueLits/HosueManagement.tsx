'use client'

import React, {
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react'

import {
    CheckCircle2,
    MoreVertical,
    StarIcon,
    Pencil,
    Trash2,
    PlusIcon,
} from 'lucide-react'
import CirclesIcon from '../Icon/CirclesIcon'
import FilterSec from './FilterSec'
import Link from 'next/link'

import GetHousesUser, { IHouse } from "@/core/api/DashboardSeller/GetHousesUser";
import DeleteHouseModal from "../DeleteHouse/DeleteHouseModal";
import DeleteHouse from "@/core/api/DashboardSeller/DeleteHouse";
import toast from "react-hot-toast";
import formatDate from '@/components/Untils/FormData'
import EditHouseModal from '../EditHouse/EditHouseModal'
import UpdateHouse from '@/core/api/DashboardSeller/UpdateHouse'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Pagination from './Pagination'
import Image from 'next/image'



const HosueManagement = () => {

    const [houses, setHouses] = useState<IHouse[]>([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedHouseId, setSelectedHouseId] = useState<number | null>(null);
    const [openMenu, setOpenMenu] = useState<number | null>(null)
    const menuRef = useRef<HTMLDivElement | null>(null)
    const [totalCount, setTotalCount] = useState(0);
    const [editModal, setEditModal] = useState(false);
    const [selectedHouse, setSelectedHouse] = useState<IHouse | null>(null);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const limit = 4;
    const page = Number(searchParams.get("page") ?? "1");
    const search = searchParams.get("search") ?? "";

    // For Api     
    useEffect(() => {
        const fetchData = async () => {
            const data = await GetHousesUser({ page, limit, search });
            setHouses(data.houses);
            setTotalCount(data.totalCount);
        };
        fetchData();
    }, [page, search]);

    const totalPages = Math.ceil(totalCount / limit);


    // close modal on outside click
    useEffect(() => {

        const handleClickOutside = (
            event: MouseEvent
        ) => {

            if (
                menuRef.current &&
                !menuRef.current.contains(
                    event.target as Node
                )
            ) {

                setOpenMenu(null)

            }

        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }

    }, [])

    // Handle Section

    const handleDelete = async () => {

        if (!selectedHouseId) return;

        try {

            await DeleteHouse(selectedHouseId);
            setHouses((prev) => prev.filter((house) => Number(house.id) !== selectedHouseId));
            toast.success("ملک حذف شد");

        } catch (error) {

            console.log(error);
            toast.error("حذف ناموفق بود");

        } finally {
            setDeleteModal(false);
        }

    };

    const handleSearchChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value.trim()) {
            params.set("search", value);
        } else {
            params.delete("search");
        }
        params.set("page", "1");
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    // Handle Update 
    const handleUpdate =
        async (data: any) => {

            if (!selectedHouse)
                return;

            try {
                await UpdateHouse(Number(selectedHouse.id), data);

                //    Update
                setHouses((prev) => prev.map((house) => Number(house.id) === Number(selectedHouse.id)
                    ? { ...house, ...data, } : house
                )
                );

                toast.success("ملک بروزرسانی شد");

                setEditModal(false);

            } catch (error) {
                console.log(error);
                toast.error("ویرایش ناموفق بود");
            }
        };

    const filteredHouses = useMemo(() => {

        return houses.filter(
            (house) => {

                if (!search.trim())
                    return true;

                return house.title
                    .toLowerCase()
                    .includes(search.toLowerCase());

            }
        );

    }, [
        houses,
        search
    ]);

    // handle change
    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(newPage));
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (

        <div className='w-full flex justify-center flex-nowrap gap-9 transition-colors'>

            <div className='flex flex-wrap w-243 gap-y-1 space-y-4' >

                {/* title */}
                <div className='w-full h-14 flex gap-1'>

                    <div className='w-6.75 h-6.5 flex gap-0.5 items-center  flex-wrap-reverse scale-x-[-1]'>
                        <CirclesIcon />
                    </div>

                    <div className='text-blue-200  dark:text-blue-500 text-[18px] font-bold' >
                        مدیریت املاک
                    </div>

                    <div className='w-6.75 h-6.5  flex gap-0.5 items-center  flex-wrap-reverse'>
                        <CirclesIcon />
                    </div>

                </div>

                {/* filter section */}
                <div className='flex justify-between  items-center w-full h-12'>

                    {/* title */}
                    <div className='flex gap-2 text-[14px] text-blue-400 dark:text-blue-500' >

                        <span>لیست املاک من</span>

                        <div className='text-gray-500'>
                            ({totalCount})
                        </div>

                    </div>
                    <FilterSec search={search} onSearch={handleSearchChange} />

                </div>

                {/* main */}
                <div
                    className='w-full h-90.75  bg-gray-50/50 dark:bg-slate-900
                    rounded-2xl border border-gray-100 dark:border-slate-700'
                >

                    {/* table header */}
                    <div
                        className='flex justify-start bg-white dark:bg-slate-800 mx-2 mt-1.5 rounded-xl shadow-sm
                        border border-gray-100 text-sm
                        dark:border-slate-700 px-6 py-4 text-gray-500 dark:text-gray-300'
                    >

                        <div className='w-220.5 flex justify-between'>

                            <span className=''>
                                نام اقامتگاه
                            </span>
                            <div className=' w-160 flex justify-around '>

                                <span className='w-25'>
                                    قیمت
                                </span>

                                <span>امتیازات</span>

                                <span>بازدیدها</span>

                                <span>رزورها</span>

                                <span className='w-20'>
                                    وضعیت
                                </span>
                            </div>

                        </div>

                    </div>



                    {/* table rows */}
                    <div className='h-90  overflow-hidden'>

                        {/* edit */}

                        {filteredHouses.map((house) => (

                            <div
                                key={house.id}
                                className=' m flex items-center  flex-row-reverse justify-between px-4 py-3 mt-2 mx-2 mb-1 bg-white dark:bg-slate-800
                                rounded-xl shadow-sm  border border-gray-100  dark:border-slate-700  transition-all duration-200
                                     hover:bg-gray-50  dark:hover:bg-slate-700/40 hover:border-blue-500/40'
                            >

                                {/* action menu */}
                                <div className='relative'>

                                    {/* menu button */}
                                    <button
                                        onClick={() => setOpenMenu(openMenu === Number(house.id) ? null : Number(house.id))}
                                    >

                                        <MoreVertical size={16}
                                            className=' text-gray-400 dark:text-gray-300 cursor-pointer'
                                        />

                                    </button>

                                    {/* dropdown modal */}
                                    {
                                        openMenu === Number(house.id) && (

                                            <div
                                                ref={menuRef}
                                                className='absolute    -top-6 left-0  w-37.5  h-37.5  rounded-[28px]  bg-white
                        dark:bg-slate-800 shadow-[0_0_15px_rgba(0,0,0,0.08)]  border border-gray-100  dark:border-slate-700 z-50 p-4'
                                            >

                                                <div className='flex flex-col justify-between h-full' >

                                                    {/* active */}
                                                    <button
                                                        className='w-full h-10 rounded-2xl bg-blue-500 text-white 
                                                        flex items-center justify-center gap-2 text-sm'
                                                    >
                                                        <CheckCircle2 size={16} />
                                                        فعال کردن

                                                    </button>

                                                    {/* edit */}
                                                    <button
                                                        onClick={() => {

                                                            setSelectedHouse(house);

                                                            setEditModal(true);

                                                            setOpenMenu(null);

                                                        }}
                                                        className='flex  p-1 rounded-2xl items-center  text-sm 
                                                        text-[#1E1B4B] dark:text-white'
                                                    >
                                                        <Pencil size={18} />
                                                        ویرایش

                                                    </button>

                                                    {/* delete */}
                                                    <button
                                                        onClick={() => {
                                                            setSelectedHouseId(
                                                                Number(house.id)
                                                            );
                                                            setDeleteModal(true);
                                                            setOpenMenu(null);
                                                        }}
                                                        className="flex p-1 rounded-2xl items-center  
                                                        gap-1 text-sm text-pink-500 border-red-500/50 "
                                                    >
                                                        <Trash2 size={16} />
                                                        حذف
                                                    </button>

                                                </div>

                                            </div>

                                        )
                                    }

                                </div>

                                {/* status */}
                                <div className='text-green-500'>

                                    <CheckCircle2 />

                                </div>

                                {/* comments */}
                                <span
                                    className='text-sm
            text-gray-600
            dark:text-gray-300'
                                >
                                    {house.num_comments} نظر
                                </span>

                                {/* rate */}
                                <span
                                    className='flex gap-0.5
            text-sm text-gray-600
            dark:text-gray-300'
                                >

                                    <StarIcon size={16} />

                                    <span>
                                        {house.rate || 0}
                                    </span>

                                </span>

                                {/* date */}
                                <span
                                    className='text-sm
                                    text-gray-600
                                    dark:text-gray-300'
                                >
                                    {house.last_updated
                                        ? formatDate(house.last_updated)
                                        : "تاریخ نامشخص"}
                                </span>

                                {/* price */}
                                <span className=' text-blue-800 dark:text-gray-500  font-medium text-sm'>
                                    {Number(house.price)
                                        .toLocaleString("fa-IR")} تومان
                                </span>

                                {/* property */}
                                <div className='flex items-center gap-2'>
                                    <div className='w-10 h-10 bg-gray-200 dark:bg-slate-700 rounded-lg overflow-hidden'>
                                        <Image
                                            src={house.photos?.[0] ?? '/Image/Image.png'}
                                            alt={house.title}
                                            width={40}
                                            height={40}
                                            className='w-full h-full object-cover'
                                        />
                                    </div>

                                    <span className='w-30  text-sm text-gray-800 dark:text-gray-200'>
                                        {house.title}
                                    </span>
                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                {/* bottom */}
                <div className='flex w-full justify-between '>

                    <Link href={'/dashboard/seller/CreateMyHosue'} className='h-10'>
                        <div
                            className='cursor-pointer flex justify-center items-center gap-1 dark:text-blue-300 text-blue-100 border border-blue-200 w-50 h-full rounded-xl '
                        >
                            <PlusIcon />
                            <span >افزودن ملک </span>
                        </div>



                    </Link>

                    {/* pagiation */}
                    <div className='h-full '>
                        <Pagination
                            currentPage={page}
                            totalCount={totalCount}
                            limit={limit}
                            onPageChange={handlePageChange} 
                        />
                    </div>
                </div>


            </div>

            <DeleteHouseModal
                open={deleteModal}
                onClose={() => setDeleteModal(false) }
                onDelete={handleDelete}
            />

            <EditHouseModal
                open={editModal}
                onClose={() => setEditModal(false)}
                house={selectedHouse}
                onSubmit={handleUpdate}
            />

        </div>
    )
}

export default HosueManagement

// must Componentization ****************