import React from 'react'
import CirclesIcon from '../Icon/CirclesIcon';
import { CheckCircle2, EyeIcon, MinusCircle, MoreVertical, StarIcon, ViewIcon, XCircle } from 'lucide-react';
import PlaceholderIco from '../Icon/PlaceholderIco';
import LoadingIco from '../Icon/LoadingIco';
import CalenderIco from '../Icon/CalenderIco';
import ClickBoardIco from '../Icon/ClickBoardIco';
import FilterSec from './FilterSec';

const stats = [
    { label: 'کل املاک', value: '۵', icon: <ClickBoardIco /> },
    { label: 'رزرو های فعال', value: '۸', icon: <CalenderIco /> },
    { label: 'رزرو های انتظار', value: '۹', icon: <LoadingIco /> },
    { label: 'بازدید ها', value: '۲', icon: <PlaceholderIco /> },
];

const HosueManagement = () => {
    return (
        <div className="w-full flex justify-center flex-nowrap gap-9 dark:bg-[#0f172a] transition-colors">


            <div className="flex flex-wrap w-243 gap-y-1 space-y-4">

                {/* Page title  */}
                <div className="w-full h-14 flex gap-1">
                    <div className="w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse scale-x-[-1]">
                        <CirclesIcon />
                    </div>

                    <div className=" text-blue-500  text-[18px] font-bold">
                        مدیریت املاک
                    </div>

                    <div className="w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse">
                        <CirclesIcon />
                    </div>
                </div>

                {/* FILTER SECTION */}
                    <div className='flex justify-between items-center w-full h-12 '>
                        {/* Title  */}
                        <div className='flex gap-2 text-[14px] text-blue-400 dark:text-blue-500 '>
                            <span> لیست املاک من </span>
                            {/* house count */}
                            <div className='text-gray-500 '> (28) </div>
                             </div>
                        <FilterSec />
                    </div>


                {/* TABLE */}
                <div className="w-full h-90 bg-gray-50/50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-700 transition-colors">

                    {/* TABLE HEADER */}
                    <div className="flex  justify-center bg-white dark:bg-slate-800 mx-2 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 px-6 py-4 text-gray-500 dark:text-gray-300 text-sm">
                        <div className='w-198.5 flex justify-between '>

                            <span className=' w-31 '>نام اقامتگاه</span>
                            <span className=' w-20 '> قیمت</span>
                            <span> امتیازات</span>
                            <span> بازدیدها</span>
                            <span>رزورها</span>
                            <span className=' w-20 '>وضعیت</span>
                        </div>
                    </div>

                    <div className="h-90 overflow-hidden">

                        {[1, 2, 3, 4,].map((row) => (
                            <div
                                key={row}
                                className="
                                    flex items-center flex-row-reverse justify-between
                                    px-4 py-3 mt-2 mx-2 mb-2
                                    bg-white dark:bg-slate-800
                                    rounded-xl
                                    shadow-sm
                                    border border-gray-100 dark:border-slate-700
                                    transition-colors duration-200
                                    hover:bg-gray-50
                                    dark:hover:bg-slate-700/40
                                    hover:border-blue-500/40
                                    dark:hover:border-slate-600"
                            >

                                {/* Modal for status for users melks */}
                                <div className="relative">
                                    <MoreVertical
                                        size={16}
                                        className="text-gray-400 dark:text-gray-300 cursor-pointer"
                                    />
                                </div>

                                {/* STATUS */}
                                <div className="text-green-500">
                                    {row === 1 ? (
                                        <CheckCircle2 />
                                    ) : row === 2 ? (
                                        <MinusCircle className="text-orange-400" />
                                    ) : (
                                        <XCircle className="text-red-500" />
                                    )}
                                </div>



                                {/* TIME */}
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                     ۵بار
                                </span>

                                {/* VIEW */}
                                <span className=' flex gap-0.5 text-sm text-gray-600 dark:text-gray-300'>
                                 <EyeIcon  
                                    size={16}
                                 />
                                 9 
                                </span>

                                {/* Point */}
                                <span className=" flex gap-0.5 text-sm text-gray-600 dark:text-gray-300">
                                    <StarIcon 
                                        size={16}
                                    />
                                    <span>9</span>
                                </span>

                                {/* PRICE */}
                                <span className="text-blue-800 dark:text-blue-400 font-medium text-sm">
                                    ۱,۸۰۰,۰۰۰ تومان
                                </span>

                                {/* PROPERTY */}
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-gray-200 dark:bg-slate-700 rounded-lg overflow-hidden">
                                        <img
                                            src="/placeholder.jpg"
                                            alt="property"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <span className="text-sm text-gray-800 dark:text-gray-200">
                                        هتل سراوان را...
                                    </span>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                        <div className='flex justify-end border w-full h-6  '>
                            <div className='border w-20 h-full '></div>
                        </div>
            </div>

        </div>
    );
}

export default HosueManagement