"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    page,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = Array.from(
        { length: totalPages },
        (_, i) => i + 1
    );

    return (
        <div className="flex items-center gap-2 flex-wrap flex-row-reverse">
            {/* Previous */}
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="
                    cursor-pointer w-11 h-11 rounded-full border border-[#D8D6F4] flex items-center
                    justify-center shadow-md disabled:opacity-40˝
                "
            >
                <ChevronLeft size={18} />
            </button>

            {/* Page Numbers */}
            {pages.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() =>
                        onPageChange(pageNumber)
                    }
                    className={`
                        w-10 h-10
                        rounded-full
                        text-sm
                        font-bold
                        transition
                        ${
                            page === pageNumber
                                ? "bg-blue-600 text-white"
                                : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-blue-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700"
                        }
                    `}
                >
                    {pageNumber}
                </button>
            ))}

            {/* Next */}
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className="
                  cursor-pointer w-11 h-11 rounded-full border border-[#D8D6F4] flex items-center
                    justify-center shadow-md disabled:opacity-40
                "
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
}