"use client";

import { useEffect, useMemo, useState } from "react";
import GetFinanceDashboard from "@/core/api/DashboardSeller/GetFinanceDashboard";
import { FinanceDashboard } from "@/core/types/DashboardSeller/Finance";

const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
];

export default function IncomeChartCard() {
    const [finance, setFinance] = useState<FinanceDashboard | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchFinance = async () => {
            try {
                const data = await GetFinanceDashboard();
                setFinance(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchFinance();
    }, []);

    const chartData = useMemo(() => {
        const data = Array.from({ length: 12 }, (_, i) => ({
            month: i + 1, // 1 - 12
            amount: 0,
        }));

        const currentMonth = new Date().getMonth(); // 0 - 11
        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;

        data[currentMonth].amount = finance?.totalCurrentMonthAmount || 0;
        data[previousMonth].amount = finance?.totalPerviousMonthAmount || 0;

        return data;
    }, [finance]);

    const maxValue = Math.max(
        ...chartData.map((item) => item.amount),
        1
    );

    return (
        <div className="w-81.5 h-49.5 mt-10 rounded-[20px] bg-white dark:bg-slate-800 px-4 py-3 shadow-sm border border-gray-100 dark:border-slate-700">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-[18px] font-bold text-[#111827] dark:text-white">
                    آمار درآمد ها
                </h2>

                <button className="border border-[#1294db] rounded-[10px] px-3 py-1 text-[12px] text-[#1294db]">
                    سال جاری
                </button>
            </div>

            {/* Chart */}
            <div className="mt-5 flex items-end justify-between h-23.75 px-1 relative">

                {chartData.map((item, index) => {
                    const height = Math.max(
                        (item.amount / maxValue) * 90,
                        item.amount > 0 ? 10 : 4
                    );

                    return (
                        <div
                            key={index}
                            className="relative flex flex-col items-center"
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                        >

                            {/* Tooltip */}
                            {activeIndex === index && (
                                <div className="absolute bottom-13.75 z-50 bg-[#15a081] text-white px-3 py-2 rounded-xl text-center text-[10px] leading-5 shadow-lg whitespace-nowrap">

                                    <p>
                                        {months[item.month - 1]}
                                    </p>

                                    <p className="font-bold text-[11px]">
                                        {Number(item.amount).toLocaleString("fa-IR")} تومان
                                    </p>

                                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#15a081] rotate-45" />
                                </div>
                            )}

                            {/* Bar */}
                            <div
                                className={`w-2 rounded-full transition-all duration-300 ${item.amount > 0
                                        ? "bg-[#15a081]"
                                        : "bg-[#8f8f9d]"
                                    }`}
                                style={{ height: `${height}px` }}
                            />

                        </div>
                    );
                })}
            </div>

            {/* Labels (فقط عدد ماه) */}
            <div className="mt-3 flex justify-between px-1 text-[11px] text-[#4b5563]">
                {chartData.map((item) => (
                    <span key={item.month}>
                        {item.month}
                    </span>
                ))}
            </div>
        </div>
    );
}