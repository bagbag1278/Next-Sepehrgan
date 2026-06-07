"use client";

import React, { useRef, useState } from 'react'
import CirclesIcon from '../Icon/CirclesIcon'
import FilterSec from '../MyHosueLits/FilterSec'
import { CheckCircle2, EyeIcon, MinusCircle, MoreVertical, Pencil, StarIcon, Trash2, XCircle } from 'lucide-react'

const ReserveManage = () => {

    const [openMenu, setOpenMenu] = useState<number | null>(null)

    const menuRef = useRef<HTMLDivElement | null>(null)
    return (
        <div>
            {/* PAGE TITLE */}
            <div className="w-full h-14 flex gap-1">

                <div className=" w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse scale-x-[-1]">
                    <CirclesIcon />
                </div>

                <div className="dark:text-blue-500 text-blue-400 text-[18px] font-bold" >
                    داشبورد
                </div>

                <div className=" w-6.75 h-6.5 flex gap-0.5  items-center flex-wrap-reverse"  >
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

                    <span>لیست رزرو های مشتریان</span>

                    <div className='text-gray-500'>
                        (28)
                    </div>

                </div>

                <FilterSec />

            </div>

            <div
                className='flex justify-center
                        bg-white dark:bg-slate-800
                        mx-2 rounded-xl shadow-sm
                        border border-gray-100
                        dark:border-slate-700
                        px-6 py-4
                        text-gray-500 dark:text-gray-300
                        text-sm mt-13'
            >

                <div
                    className='w-full
                            flex justify-between'
                >

                    <span className='w-30'>
                        نام اقامتگاه
                    </span>

                    <span className='w-25'>
                        اطلاعات مسافر
                    </span>

                    <span>تاریخ رزرو</span>

                    <span>زمان رزرو</span>

                    <span>مبلغ</span>

                    <span className=''>
                        وضعیت رزرو
                    </span>
                    <span className='w-35 '>
                        وضعیت پرداخت
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

                            {/* pay status */}
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

                                {/* reserve status */}
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
                                        dark:text-blue-300
                                        font-medium text-sm'
                            >
                                ۱,۸۰۰,۰۰۰ تومان
                            </span>

                            {/* property */}
                            <div
                                className='flex
                                        items-center gap-2'
                            >

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
    )
}

export default ReserveManage