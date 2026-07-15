"use client";

import {
    CircularProgressbarWithChildren,
    buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

export default function ProfileCompletion() {
    return (
        <div className="w-80.5 h-78.5 rounded-[28px] bg-white dark:bg-slate-800 p-6 shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col transition-colors">

            {/* Progress */}
            <div className="flex justify-center">
                <div className="w-32.5 h-32.5">
                    <CircularProgressbarWithChildren
                        value={30}
                        styles={buildStyles({
                            pathColor: "#1294db",
                            trailColor: "#d9d9df",
                            strokeLinecap: "round",
                        })}
                    >
                        <span className="text-[44px] font-bold text-[#1294db] dark:text-blue-400">
                            ٪۳۰
                        </span>
                    </CircularProgressbarWithChildren>
                </div>
            </div>

            {/* Title */}
            <div className="mt-4 text-center">
                <h2 className="text-[18px] font-bold text-[#111827] dark:text-white">
                    وضعیت پروفایل شما
                </h2>

                <p className="w-full mt-2 mb-2 text-gray-500 dark:text-gray-300 leading-8 text-[13px]">
                    برای اینکه بازدید خوبی داشته باشید،
                    پروفایل شما باید حداقل ۷۰٪ تکمیل شده باشد.
                </p>
            </div>

            {/* Button */}
            <button className="mt-auto h-14.5 rounded-2xl border border-[#1294db] text-[#1294db] dark:text-blue-400 text-[17px] font-medium hover:bg-[#1294db] hover:text-white transition">
                ویرایش پروفایل
            </button>
        </div>
    );
}