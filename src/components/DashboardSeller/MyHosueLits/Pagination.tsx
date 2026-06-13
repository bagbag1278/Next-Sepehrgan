import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalCount: number;
    limit: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({
    currentPage,
    totalCount,
    limit,
    onPageChange,
}: PaginationProps) => {

    const totalPages = Math.ceil(totalCount / limit);

    const getPages = (): (number | "...")[] => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
        if (currentPage >= totalPages - 3) return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    };

    return (
        <div className="flex items-center flex-row-reverse justify-center gap-2">

            {/* دکمه قبلی */}
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="cursor-pointer w-11 h-11 rounded-full border border-[#D8D6F4] flex items-center justify-center shadow-md disabled:opacity-40"
            >
                <ChevronLeft />
            </button>

            {/* شماره صفحات */}
            {getPages().map((p, i) =>
                p === "..." ? (
                    <span
                        key={`dots-${i}`}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 text-sm"
                    >
                        ···
                    </span>
                ) : (
                    <button
                        key={p}
                        onClick={() => onPageChange(p as number)}
                        className={`w-10 h-10 rounded-full border cursor-pointer
                            ${currentPage === p
                                ? "bg-blue-500 border-blue-500 text-white"
                                : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        {p}
                    </button>
                )
            )}

            {/* دکمه بعدی */}
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="cursor-pointer w-11 h-11 rounded-full border border-[#D8D6F4] flex items-center justify-center shadow-md disabled:opacity-40"
            >
                <ChevronRight />
            </button>

        </div>
    );
};

export default Pagination;