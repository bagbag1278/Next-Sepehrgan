'use client';

import {
    ChevronLeft,
    ChevronRight
} from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (
        page: number
    ) => void;
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {

    const generatePages = () => {

        const pages:
            (number | string)[] = [];

        if (totalPages <= 7) {

            for (
                let i = 1;
                i <= totalPages;
                i++
            ) {

                pages.push(i);

            }

            return pages;

        }

        pages.push(1);

        if (currentPage > 4) {

            pages.push("left-dots");

        }

        const start =
            Math.max(
                2,
                currentPage - 1
            );

        const end =
            Math.min(
                totalPages - 1,
                currentPage + 1
            );

        for (
            let i = start;
            i <= end;
            i++
        ) {

            pages.push(i);

        }

        if (
            currentPage <
            totalPages - 3
        ) {

            pages.push("right-dots");

        }

        pages.push(totalPages);

        return pages;

    };

    return (

        <div className=" flex flex-row-reverse items-center justify-end gap-4">

            {/* Prev */}

            <button
                disabled={ currentPage === 1 }
                onClick={() =>onPageChange( currentPage - 1 )
                }
                className="w-11 h-11  cursor-pointer rounded-full border border-[#D8D6F4] flex
                    items-center justify-center  shadow-md disabled:opacity-40"
            >
                <ChevronLeft />
            </button>

            {generatePages().map((item, index) => {
                if (
                    item === "left-dots" ||
                    item === "right-dots"
                ) {
                    return (
                        <span
                            key={item}
                            className=" px-3 text-gray-400 "
                        >
                            ...
                        </span>
                    );
                }

                return (

                    <button
                        key={item}
                        onClick={() => onPageChange(Number(item))
                        }
                        className={` w-10 h-10 rounded-full cursor-pointer dark:text-black 
                        ${currentPage === item
                                ? " bg-[#1400B7] text-white dark:text-gray-500 dark:bg-[#1b01e0]" : "dark:bg-gray-400 border"
                            }
                    `}
                    >
                        {item}

                    </button>

                );

            }
            )
            }

            {/* Next */}

            <button
                disabled={currentPage === totalPages }
                onClick={() => onPageChange(currentPage + 1)
                }
                className=" cursor-pointer w-11 h-11 rounded-full border border-[#D8D6F4] flex items-center
                    justify-center shadow-md disabled:opacity-40
                "
            >
                <ChevronRight />
            </button>

        </div>

    );

};

export default Pagination;