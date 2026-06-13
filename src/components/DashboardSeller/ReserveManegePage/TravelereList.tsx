"use client";

import { SendIcon, X } from "lucide-react";
import { useState } from "react";
import MockChatModal from "./MockChatModal";

interface HistoryModalProps {
    onClose: () => void;
}

export default function TravelerList({ onClose, }: HistoryModalProps) {

    const [showChat, setShowChat] = useState(false);
    return (
        <div
            className="
                absolute
                -top-50 
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                z-50
            bg-gray-700/70
                dark:bg-slate-800
                rounded-[36px]
                shadow-2xl
            "
            style={{
                width: "1000px",
                height: "900px",
            }}
        >

            <>

                <div className=" absolute inset-0 bg-black/20 z-1000" />

                <div
                    className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    z-[1001]
                    bg-[#F4F4F4]
                    dark:bg-slate-900
                    rounded-[36px]
                    shadow-2xl
                    p-6
                "
                    style={{
                        width: "608px",
                        height: "425px",
                    }}
                >
                    {/* Header */}

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-bold text-[20px] text-blue-800">
                            جزییات مسافران
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

                    <div className="h-px bg-blue-800 mb-6" />

                    {/* Table Header */}

                    <div
                        className="
                        h-15
                        rounded-[24px]
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
                        <span>نام</span>
                        <span>جنسیت</span>
                        <span>شماره تماس </span>
                        <span> ارسال پیام </span>
                    </div>

                    {/* Rows */}

                    <div className="mt-5 flex flex-col gap-4">

                        <div className="h-16 rounded-3xl bg-white dark:bg-slate-800 shadow flex items-center justify-between">
                            <span className="  w-20 mr-4">مانی</span>
                            <span className="w-10">آقا</span>
                            <span className="font-bold w-30 text-center">
                                ۰۹۰۱۲۲۲۵۹۴۰
                            </span>
                            <div className=" w-20 cursor-pointer">
                                <SendIcon size={20} className="text-green-100 " />
                            </div>
                        </div>

                        <div className="h-16 rounded-3xl bg-white dark:bg-slate-800 shadow flex items-center justify-between">
                            <span className="w-20 mr-4  "> فاطمه زهرا</span>
                            <span className="w-10  ">خانم</span>
                            <span className="font-bold w-25  text-center">
                                ۰۹۰۱۲۲۲۵۹۴۰
                            </span>
                            <div className=" w-20 cursor-pointer">
                                <SendIcon size={20} className="text-green-100 " />
                            </div>
                        </div>

                        <div className="h-16 rounded-3xl bg-white dark:bg-slate-800 shadow flex items-center justify-between">
                            <span className="w-20 mr-4">مانی</span>
                            <span className="w-10">آقا</span>
                            <span className="font-bold w-30 text-center">
                                ۰۹۰۱۲۲۲۵۹۴۰۲۳۴۵
                            </span>

                            {/* open mock chat */}
                            <div
                                onClick={() => setShowChat(true)}
                                className=" w-20 cursor-pointer"
                            >
                                <SendIcon size={20} className="text-green-100 " />
                            </div>
                        </div>


                    </div>
                </div>
            </>
            <MockChatModal
                isOpen={showChat}
                onClose={() => setShowChat(false)}
            />

        </div>
    );
}