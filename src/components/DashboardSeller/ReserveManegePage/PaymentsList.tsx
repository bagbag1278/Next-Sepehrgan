"use client";

import { X } from "lucide-react";

interface setshowPAymentsList {
    onClose: () => void;
}

export default function HistoryModal({
    onClose,
}: setshowPAymentsList) {
    return (
        <div
            className="
                absolute
                -top-50 -inset- 
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                z-50
                dark:bg-slate-800
                bg-gray-700/70
                rounded-[36px]
                shadow-2xl
            "
            style={{
                width: "900px",
                height: "1000px",
            }}
        >

            <>
                {/* Overlay فقط روی مودال قبلی */}
                <div className="absolute inset-0 bg-black/20 z-1000" />

                <div
                    className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    z-1001
                    bg-[#F4F4F4]
                    dark:bg-slate-900
                    rounded-[36px]
                    shadow-2xl
                    p-6
                "
                    style={{
                        width: "700px",
                        height: "487px",
                    }}
                >
                    {/* Header */}

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-bold text-[24px] -blue-800">
                            لیست پرداختی ها
                        </h2>

                        <button
                            onClick={onClose}
                            className=" absolute  top-4 left-6  w-10 h-10   flex  items-center justify-center
                         bg-white rounded-full  dark:bg-slate-800 border hover:bg-red-500
                        border-gray-200 dark:border-slate-700 hover:scale-105 transition"
                        >
                            <X size={20} className="text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>

                    <div className="h-px bg-blue-800 mb-6 " />

                    {/* Table Header */}

                    <div
                        className="
                        h-15 
                        rounded-3xl
                        bg-[#E9EEF4]
                        dark:bg-slate-800
                        flex
                        items-center
                        justify-around
                        text-gray-500
                        dark:text-slate-300
                        font-bold
                    "
                    >
                        <div className="w-120 flex justify-between ">

                        <span>تاریخ</span>
                        <span>زمان</span>
                        <span> شماره پیگیری</span>
                        <span>  مبلغ</span>
                        </div>
                    </div>

                    {/* Rows */}

                    <div className="mt-5 flex flex-col gap-4">

                        <div className="h-16 rounded-3xl bg-white dark:bg-slate-800 shadow flex items-center justify-around">
                            <span>۱۲ مرداد ۱۴۰۴</span>
                            <span>۱۲:۳۳</span>
                            <span className="font-bold">
                                اسامی مسافران
                            </span>
                        </div>

                        <div className="h-16 rounded-3xl bg-white dark:bg-slate-800 shadow flex items-center justify-around">
                            <span>۱۲ مرداد ۱۴۰۴</span>
                            <span>۱۲:۳۳</span>
                            <span className="font-bold">
                                تاریخ رزرو
                            </span>
                        </div>

                        <div className="h-16 rounded-3xl bg-white dark:bg-slate-800 shadow flex items-center justify-around">
                            <span>۱۲ مرداد ۱۴۰۴</span>
                            <span>۱۲:۳۳</span>
                            <span className="font-bold">
                                تاریخ رزرو
                            </span>
                        </div>

                    </div>
                </div>
            </>


        </div>
    );
}