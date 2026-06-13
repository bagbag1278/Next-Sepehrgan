"use client";

import {
    CalendarDays,
    MapPin,
    BedDouble,
    Bath,
    Car,
    Trees,
    X,
} from "lucide-react";
import Image from "next/image";
import Iamger from "../../../../public/Image/Image.png"
import { useState } from "react";
import HistoryModal from "./HistoryModal";
import PaymentsList from "./PaymentsList";
import TravelerList from "./TravelereList";

interface ReserveDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ReserveDetailsModal({ isOpen, onClose, }: ReserveDetailsModalProps) {
    if (!isOpen) return null;

    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [showPAymentsList, setshowPAymentsList] = useState(false);
    const [showtravelers, setshowtravelers] = useState(false);

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div
                className="relative bg-[#F4F4F4] dark:bg-slate-900 rounded-[40px] p-8
                    shadow-2xl overflow-hidden"
                style={{
                    width: "733px",
                    height: "635px",
                }}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className=" absolute  top-4 left-6  w-10 h-10   flex  items-center justify-center
                         bg-white rounded-full  dark:bg-slate-800 border hover:bg-red-500
                        border-gray-200 dark:border-slate-700 hover:scale-105 transition"
                >
                    <X size={20} className="text-gray-600 dark:text-gray-300" />
                </button>

                {/* Top Section */}
                <div className="flex justify-between items-center flex-row-reverse gap-1  ">
                    {/* Info */}
                    <div className="h-52 ">
                        <h2 className="text-[22px] font-bold text-[#101035] dark:text-white">
                            هتل همایون فر کیش ایران
                        </h2>

                        <div className="flex items-center gap-2 mt-5 text-[#6B7280] dark:text-slate-300">
                            <MapPin size={18} />
                            <span className="text-sm">
                                گیلان، رشت، میدان آزادی، جنب چهارراه عظیمی
                            </span>
                        </div>

                        <div className="flex items-center gap-2 mt-4 text-[#6B7280]/60 dark:text-slate-300">
                            <CalendarDays size={18} />
                            <span className="text-sm">
                                ۱۲ مرداد ۱۴۰۴ تا ۲۰ مرداد ۱۴۰۴
                            </span>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap  mt-8 justify-between  text-[#6B7280] dark:text-slate-300">
                            <div className="flex items-center gap-2 text-[13px] p-1 rounded-2xl dark:bg-blue-950 bg-gray-200">
                                <Car size={16} />
                                <span>پارکینگ</span>
                            </div>

                            <div className="flex items-center gap-2 text-[13px] p-1 rounded-2xl dark:bg-blue-950 bg-gray-200">
                                <Trees size={18} />
                                <span>حیاط دار</span>
                            </div>

                            <div className="flex items-center gap-2 text-[13px] p-1 rounded-2xl dark:bg-blue-950 bg-gray-200">
                                <BedDouble size={16} />
                                <span>۴ خواب</span>
                            </div>

                            <div className="flex items-center gap-2 text-[13px] p-1 rounded-2xl dark:bg-blue-950 bg-gray-200">
                                <Bath size={16} />
                                <span>۲ حمام</span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mt-4 flex items-center gap-3">
                            <span className="font-bold text-[15px] text-[#333] dark:text-white">
                                قیمت خرید
                            </span>

                            <span className="text-blue-300 font-bold text-[20px]">
                                ۳۵,۰۰۰,۰۰۰ تومان
                            </span>
                        </div>
                    </div>

                    {/* Image Placeholder */}
                    <div className=" w-75.25 h-58.5 rounded-4xl bg-gray-300 dark:bg-slate-700 image-full " >
                        <img
                            src="/Image/Image.png"
                            alt="House"
                            className="w-full h-full  rounded-4xl object-cover"
                        />
                    </div>

                </div>

                {/* Description */}
                <div className="mt-8">
                    <h3 className="text-[18px] font-bold text-[#101035] dark:text-white mb-1">
                        توضیحات بیشتر
                    </h3>

                    <p className=" text-justify leading-9 text-[#6B7280] dark:text-slate-300 text-[13px]">
                        آپارتمانی دنج و آرام در قلب شهر، جایی که زندگی روزمره
                        راحت و سبک‌تر است. فضایی مدرن با طراحی منحصربه‌فرد،
                        یادآور لحظه‌های خوش، آرامش و شروعی نو در زندگی روزمره.
                        محیطی مناسب برای استراحت و اقامتی دلنشین در کنار خانواده
                        و دوستان.
                    </p>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap mt-6">
                    <span className="font-bold text-blue-400 dark:text-white ml-2">
                        برچسب ها
                    </span>

                    <span className="px-4 py-1 rounded-full bg-blue-300 text-white">
                        مسکونی
                    </span>

                    <span className="px-4 py-1 rounded-full bg-blue-300 text-white">
                        آپارتمان
                    </span>

                    <span className="px-4 py-1 rounded-full bg-blue-300 text-white">
                        بالکن
                    </span>

                    <span className="px-4 py-1 rounded-full bg-blue-300 text-white">
                        خانوادگی
                    </span>
                </div>

                {/* Footer */}
                <div className="absolute bottom-8 left-8 right-8 flex gap-4 ">
                    <button
                        onClick={() => setshowtravelers(true)}
                        className=" flex-1 h-14 rounded-2xl  bg-[#1400B7] text-white font-bold hover:opacity-90transition"
                    >
                        مسافر ها
                    </button>
                    {showtravelers && (
                        <>
                            {/* Overlay */}
                            <div
                                className="absolute inset-0 bg-black/40 rounded-[40px] z-999
            "
                            >
                                <TravelerList
                                    onClose={() => setshowtravelers(false)}
                                />

                            </div>

                        </>
                    )}

                    <button
                        onClick={() => setshowPAymentsList(true)}
                        className="
                            flex-1
                            h-14
                            rounded-2xl
                            bg-[#1400B7]
                            text-white
                            font-bold
                            hover:opacity-90
                            transition
                        "
                    >
                        پرداخت ها
                    </button>
                    {showPAymentsList && (
                        <>
                            {/* Overlay */}
                            <div
                                className="absolute inset-0 bg-black/40 rounded-[40px] z-999
            "
                            >
                                <PaymentsList
                                    onClose={() => setshowPAymentsList(false)}
                                />

                            </div>

                        </>
                    )}

                    <button
                        onClick={() => setShowHistoryModal(true)}
                        className="flex-1
                            h-14
                            rounded-2xl
                            bg-[#1400B7]
                            text-white
                            font-bold
                            hover:opacity-90
                            transition
                        "
                    >
                        تاریخچه تغییرات
                    </button>
                    {showHistoryModal && (
                        <>
                            {/* Overlay */}
                            <div
                                className="absolute inset-0 bg-black/40 rounded-[40px] z-999
            "
                            >
                                <HistoryModal
                                    onClose={() => setShowHistoryModal(false)}
                                />

                            </div>

                        </>
                    )}
                </div>
            </div>
        </div>
    );
}