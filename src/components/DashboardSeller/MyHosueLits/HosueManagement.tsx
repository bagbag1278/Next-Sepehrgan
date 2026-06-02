'use client'

import React, {
    useEffect,
    useRef,
    useState
} from 'react'

import {
    CheckCircle2,
    EyeIcon,
    MinusCircle,
    MoreVertical,
    StarIcon,
    XCircle,
    Pencil,
    Trash2,
    PlusCircleIcon,
    PlusIcon,
} from 'lucide-react'

import CirclesIcon from '../Icon/CirclesIcon'
import PlaceholderIco from '../Icon/PlaceholderIco'
import LoadingIco from '../Icon/LoadingIco'
import CalenderIco from '../Icon/CalenderIco'
import ClickBoardIco from '../Icon/ClickBoardIco'
import FilterSec from './FilterSec'
import Link from 'next/link'

const stats = [
    { label: 'کل املاک', value: '۵', icon: <ClickBoardIco /> },
    { label: 'رزرو های فعال', value: '۸', icon: <CalenderIco /> },
    { label: 'رزرو های انتظار', value: '۹', icon: <LoadingIco /> },
    { label: 'بازدید ها', value: '۲', icon: <PlaceholderIco /> },
]

const HosueManagement = () => {

    const [openMenu, setOpenMenu] = useState<number | null>(null)

    const menuRef = useRef<HTMLDivElement | null>(null)

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

        document.addEventListener(
            'mousedown',
            handleClickOutside
        )

        return () => {

            document.removeEventListener(
                'mousedown',
                handleClickOutside
            )

        }

    }, [])

    return (

        <div
            className='w-full flex justify-center
            flex-nowrap gap-9
            dark:bg-[#0f172a]
            transition-colors'
        >

            <div
                className='flex flex-wrap
                w-243 gap-y-1 space-y-4'
            >

                {/* title */}
                <div className='w-full h-14 flex gap-1'>

                    <div
                        className='w-6.75 h-6.5
                        flex gap-0.5 items-center
                        flex-wrap-reverse scale-x-[-1]'
                    >
                        <CirclesIcon />
                    </div>

                    <div
                        className='text-blue-500
                        text-[18px] font-bold'
                    >
                        مدیریت املاک
                    </div>

                    <div
                        className='w-6.75 h-6.5
                        flex gap-0.5 items-center
                        flex-wrap-reverse'
                    >
                        <CirclesIcon />
                    </div>

                </div>

                {/* filter section */}
                <div
                    className='flex justify-between
                    items-center w-full h-12'
                >

                    {/* title */}
                    <div
                        className='flex gap-2 text-[14px]
                        text-blue-400 dark:text-blue-500'
                    >

                        <span>لیست املاک من</span>

                        <div className='text-gray-500'>
                            (28)
                        </div>

                    </div>

                    <FilterSec />

                </div>

                {/* table */}
                <div
                    className='w-full h-90
                    bg-gray-50/50 dark:bg-slate-900
                    rounded-2xl
                    border border-gray-100
                    dark:border-slate-700'
                >

                    {/* table header */}
                    <div
                        className='flex justify-center
                        bg-white dark:bg-slate-800
                        mx-2 rounded-xl shadow-sm
                        border border-gray-100
                        dark:border-slate-700
                        px-6 py-4
                        text-gray-500 dark:text-gray-300
                        text-sm'
                    >

                        <div
                            className='w-198.5
                            flex justify-between'
                        >

                            <span className='w-31'>
                                نام اقامتگاه
                            </span>

                            <span className='w-20'>
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

                    {/* table rows */}
                    <div className='h-90 overflow-hidden'>

                        {
                            [1, 2, 3, 4].map((row) => (

                                <div
                                    key={row}
                                    className='
                                    flex items-center
                                    flex-row-reverse justify-between
                                    px-4 py-3 mt-2 mx-2 mb-2
                                    bg-white dark:bg-slate-800
                                    rounded-xl shadow-sm
                                    border border-gray-100
                                    dark:border-slate-700
                                    transition-all duration-200
                                    hover:bg-gray-50
                                    dark:hover:bg-slate-700/40
                                    hover:border-blue-500/40'
                                >

                                    {/* action menu */}
                                    <div className='relative'>

                                        {/* menu button */}
                                        <button
                                            onClick={() =>
                                                setOpenMenu(
                                                    openMenu === row
                                                        ? null
                                                        : row
                                                )
                                            }
                                        >

                                            <MoreVertical
                                                size={16}
                                                className='
                                                text-gray-400
                                                dark:text-gray-300
                                                cursor-pointer'
                                            />

                                        </button>

                                        {/* dropdown modal */}
                                        {
                                            openMenu === row && (

                                                <div
                                                    ref={menuRef}
                                                    className='absolute
                                                    -top-6 left-0
                                                    w-37.5
                                                    h-37.5
                                                    rounded-[28px]
                                                    bg-white
                                                    dark:bg-slate-800
                                                    shadow-[0_0_15px_rgba(0,0,0,0.08)]
                                                    border border-gray-100
                                                    dark:border-slate-700
                                                    z-50 p-4'
                                                >

                                                    <div
                                                        className='flex
                                                        flex-col
                                                        justify-between
                                                        h-full'
                                                    >

                                                        {/* active */}
                                                        <button
                                                            className='
                                                            w-full h-10
                                                            rounded-2xl
                                                            bg-blue-500
                                                            text-white
                                                            flex items-center
                                                            justify-center
                                                            gap-2 text-sm'
                                                        >

                                                            فعال کردن

                                                            <CheckCircle2
                                                                size={16}
                                                            />

                                                        </button>

                                                        {/* edit */}
                                                        <button
                                                            className='
                                                            flex items-center
                                                            justify-center
                                                            gap-2 text-sm
                                                            text-[#1E1B4B]
                                                            dark:text-white'
                                                        >

                                                            ویرایش

                                                            <Pencil
                                                                size={18}
                                                            />

                                                        </button>

                                                        {/* delete */}
                                                        <button
                                                            className='
                                                            flex items-center
                                                            justify-center
                                                            gap-2 text-sm
                                                            text-pink-500'
                                                        >

                                                            حذف

                                                            <Trash2
                                                                size={18}
                                                            />

                                                        </button>

                                                    </div>

                                                </div>

                                            )
                                        }

                                    </div>

                                    {/* status */}
                                    <div className='text-green-500'>

                                        {
                                            row === 1 ? (

                                                <CheckCircle2 />

                                            ) : row === 2 ? (

                                                <MinusCircle
                                                    className='text-orange-400'
                                                />

                                            ) : (

                                                <XCircle
                                                    className='text-red-500'
                                                />

                                            )
                                        }

                                    </div>

                                    {/* reserve */}
                                    <span
                                        className='text-sm
                                        text-gray-600
                                        dark:text-gray-300'
                                    >
                                        ۵بار
                                    </span>

                                    {/* views */}
                                    <span
                                        className='flex gap-0.5
                                        text-sm text-gray-600
                                        dark:text-gray-300'
                                    >

                                        <EyeIcon size={16} />

                                        9

                                    </span>

                                    {/* score */}
                                    <span
                                        className='flex gap-0.5
                                        text-sm text-gray-600
                                        dark:text-gray-300'
                                    >

                                        <StarIcon size={16} />

                                        <span>9</span>

                                    </span>

                                    {/* price */}
                                    <span
                                        className='text-blue-800
                                        dark:text-blue-400
                                        font-medium text-sm'
                                    >
                                        ۱,۸۰۰,۰۰۰ تومان
                                    </span>

                                    {/* property */}
                                    <div
                                        className='flex
                                        items-center gap-2'
                                    >

                                        <div
                                            className='w-10 h-10
                                            bg-gray-200
                                            dark:bg-slate-700
                                            rounded-lg overflow-hidden'
                                        >

                                            <img
                                                src='/placeholder.jpg'
                                                alt='property'
                                                className='w-full h-full object-cover'
                                            />

                                        </div>

                                        <span
                                            className='text-sm
                                            text-gray-800
                                            dark:text-gray-200'
                                        >
                                            هتل سراوان را...
                                        </span>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                </div>

                {/* pagination */}
                <Link
                    href={'/dashboard/seller/CreateMyHosue'}
                    className='flex justify-between  w-full h-10 '
                >
                    <div

                        className='cursor-pointer flex justify-center items-center gap-1 text-blue-100 border border-blue-200 w-50 h-full rounded-xl '
                    >
                        <PlusIcon />
                        <span >افزودن ملک </span>
                    </div>

                    <div
                        className='border w-20 h-full'
                    />

                </Link>


            </div>

        </div>
    )
}

export default HosueManagement
