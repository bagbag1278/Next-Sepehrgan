"use client";


import {
    CheckCircle2,
    MinusCircle,
    MoreVertical,
    XCircle,
} from 'lucide-react';

import React from 'react';

import CirclesIcon from '../Icon/CirclesIcon';
import ClickBoardIco from '../Icon/ClickBoardIco';
import CalenderIco from '../Icon/CalenderIco';
import LoadingIco from '../Icon/LoadingIco';
import PlaceholderIco from '../Icon/PlaceholderIco';

import IncomeChartCard from './IncomeChartCard';
import ProfileCompletion from './ProfileCompletion';

const stats = [
    { label: 'کل املاک', value: '۵', icon: <ClickBoardIco /> },
    { label: 'رزرو های فعال', value: '۸', icon: <CalenderIco /> },
    { label: 'رزرو های انتظار', value: '۹', icon: <LoadingIco /> },
    { label: 'بازدید ها', value: '۲', icon: <PlaceholderIco /> },
];

const MainPage = () => {
    const [openMenu, setOpenMenu] = React.useState<number | null>(null);
    const [deleteModal, setDeleteModal] = React.useState(false);
    return (
        <div className="w-full flex flex-nowrap gap-9 dark:bg-[#0f172a] transition-colors">

            {/* LEFT SIDE */}
            <div className="flex flex-wrap w-156.5 gap-y-1 space-y-4">

                {/* PAGE TITLE */}
                <div className="w-full h-14 flex gap-1">
                    <div className="w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse scale-x-[-1]">
                        <CirclesIcon />
                    </div>

                    <div className=" dark:text-blue-500 text-blue-400 text-[18px] font-bold">
                        داشبورد
                    </div>

                    <div className="w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse">
                        <CirclesIcon />
                    </div>
                </div>

                {/* STATS */}
                <div className="flex flex-row-reverse gap-4.75">

                    {/* VIEW ALL */}
                    <div className="w-25 h-30 border border-blue-200 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-800 text-blue-800 dark:text-white cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700 transition-all">
                        <span className="text-xl">↗</span>

                        <span className="text-xs mt-2 font-bold">
                            مشاهده همه
                        </span>

                        <span className="text-sm font-bold">
                            +۵۰
                        </span>
                    </div>

                    {/* CARDS */}
                    {stats.map((item, idx) => (
                        <div
                            key={idx}
                            className="w-27.5 h-30 border border-gray-200 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center p-2 text-center bg-white dark:bg-slate-800 transition-all"
                        >
                            <span className="text-2xl text-blue-900 dark:text-blue-400 mb-2">
                                {item.icon}
                            </span>

                            <span className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                                {item.label}
                            </span>

                            <span className="text-2xl font-bold text-blue-900 dark:text-white">
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>

                {/* TABLE */}
                <div className="w-full h-84 bg-gray-50/50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-700 transition-colors">

                    {/* TABLE HEADER */}
                    <div className="flex justify-around bg-white dark:bg-slate-800 mx-2 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 px-6 py-4 text-gray-500 dark:text-gray-300 text-sm">
                        <span>نام اقامتگاه</span>
                        <span>تاریخ رزرو</span>
                        <span>زمان رزرو</span>
                        <span>قیمت</span>
                        <span>وضعیت</span>
                    </div>

                    <div className="h-70 overflow-y-scroll hide-scrollbar overflow-hidden">

                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((row) => (
                            <div
                                key={row}
                                className="
                                    flex items-center flex-row-reverse justify-between
                                    px-4 py-2 mt-2 mx-2 mb-4
                                    bg-white dark:bg-slate-800
                                    rounded-xl
                                    shadow-sm
                                    border border-gray-100 dark:border-slate-700
                                    transition-colors duration-200
                                    hover:bg-gray-50
                                    dark:hover:bg-slate-700/40
                                    hover:border-gray-200
                                    dark:hover:border-slate-600"
                            >

                                {/* Modal for status for users melks */}
                                <div className="relative">

                                    <MoreVertical
                                        size={16}
                                        onClick={() =>
                                            setOpenMenu(openMenu === row ? null : row)
                                        }
                                        className="text-gray-400 dark:text-gray-300 cursor-pointer"
                                    />

                                    {/* SMALL MODAL */}
                                    {openMenu === row && (

                                        <>
                                            {/* BACKDROP */}
                                            <div
                                                onClick={() => setOpenMenu(null)}
                                                className="fixed inset-0 z-40"
                                            />

                                            {/* MODAL */}
                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                className="absolute left-0 top-6 z-50 w-[150px] rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl p-2 flex flex-col gap-2"
                                            >

                                                <button className="w-full rounded-lg py-2 text-sm bg-green-100 text-green-700 hover:bg-green-200 transition">
                                                    فعال کردن
                                                </button>

                                                <button className="w-full rounded-lg py-2 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 transition">
                                                    ویرایش
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setDeleteModal(true);
                                                        setOpenMenu(null);
                                                    }}
                                                    className="w-full rounded-lg py-2 text-sm bg-red-100 text-red-700 hover:bg-red-200 transition"
                                                >
                                                    حذف
                                                </button>

                                            </div>
                                        </>
                                    )}
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

                                {/* PRICE */}
                                <span className="text-blue-800 dark:text-blue-400 font-medium text-sm">
                                    ۱,۸۰۰,۰۰۰ تومان
                                </span>

                                {/* TIME */}
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    ۱۲:۳۳
                                </span>

                                {/* DATE */}
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    ۱۲ مرداد ۱۴۰۱
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
            </div>

            {/* RIGHT SIDE */}
            <div>
                <ProfileCompletion />
                <IncomeChartCard />
            </div>

            {/* DELETE MODAL */}
            {deleteModal && (
                <div
                    onClick={() => setDeleteModal(false)}
                    className="fixed inset-0 z-999 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                >

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-100 rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-2xl border border-gray-200 dark:border-slate-700"
                    >

                        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 text-center">
                            آیا از حذف ملک مطمئن هستید؟
                        </h2>

                        <p className="text-sm text-gray-500 dark:text-gray-300 w-69.25 mr-8.5 text-center mb-6">
                            بعد از حذف، اطلاعات این ملک قابل بازگشت نخواهد بود.
                        </p>

                        <div className="flex gap-3">

                            <button
                                onClick={() => setDeleteModal(false)}
                                className="flex-1 h-11 rounded-xl bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white hover:opacity-90 transition"
                            >
                                خیر
                            </button>

                            <button
                                onClick={() => {
                                    console.log('deleted');
                                    setDeleteModal(false);
                                }}
                                className="flex-1 h-11 rounded-xl bg-blue-100 text-white hover:bg-red-600 transition"
                            >
                                بله حذف شود
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainPage;