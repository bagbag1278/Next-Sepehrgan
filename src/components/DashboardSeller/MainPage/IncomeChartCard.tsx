const data = [20, 55, 52, 70, 30, 80, 78, 120, 95, 140];

export default function IncomeChartCard() {
    return (
        <div className="w-[322px] h-[198px] mt-10 rounded-[20px] bg-white dark:bg-slate-800 px-4 py-3 shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-[18px] font-bold text-[#111827] dark:text-white">
                    آمار درآمد ها
                </h2>

                <button className="border border-[#1294db] rounded-[10px] px-3 py-1 text-[12px] text-[#1294db] dark:text-blue-400">
                    خرداد ۱۴۰۴
                </button>
            </div>

            {/* Chart */}
            <div className="mt-5 flex items-end justify-between h-[95px] px-1 relative">

                {/* Tooltip */}
                <div className="absolute bottom-[55px] right-[105px] bg-[#15a081] text-white px-3 py-2 rounded-[12px] text-center text-[10px] leading-5 shadow-lg">
                    <p>درآمد ماه جاری</p>

                    <p className="font-bold text-[11px]">
                        ۱۵,۲۰۰,۲۰۰,۰۰۰
                    </p>

                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#15a081] rotate-45"></div>
                </div>

                {/* Bars */}
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`w-[6px] rounded-full ${index === 2
                                ? "bg-[#15a081]"
                                : "bg-[#8f8f9d] dark:bg-slate-500"
                            }`}
                        style={{
                            height: `${item * 0.6}px`,
                        }}
                    />
                ))}
            </div>

            {/* Labels */}
            <div className="mt-3 flex justify-between px-1 text-[11px] text-[#4b5563] dark:text-gray-300">
                {Array.from({ length: 10 }).map((_, index) => (
                    <span key={index}>{index + 1}</span>
                ))}
            </div>

            {/* Bottom line */}
            <div className="mt-3 h-[5px] bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-[#1294db] rounded-full"></div>
            </div>
        </div>
    );
}