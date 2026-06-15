import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (
        page: number
    ) => void;
}

const Pagination = ({
    page,
    totalPages,
    onPageChange,
}: PaginationProps) => {

    return (

        <div
            className="
    flex items-center
    justify-center
    gap-2 mt-8"
        >

            <button
                disabled={page === 1}
                onClick={() =>
                    onPageChange(
                        page - 1
                    )
                }
                className=" cursor-pointer w-11 h-11 rounded-full border border-[#D8D6F4] flex items-center
                    justify-center shadow-md disabled:opacity-40
                "
            >
               <ChevronRight />
            </button>

            {
                Array.from(
                    {
                        length: totalPages
                    },
                    (_, i) => i + 1
                ).map((pageNumber) => (

                    <button
                        key={pageNumber}
                        onClick={() =>
                            onPageChange(
                                pageNumber
                            )
                        }
                        className={`
                   w-10 h-10 rounded-full border cursor-pointer dark:text-black ˝

                    ${page === pageNumber

                                ? `
                            bg-blue-500
                            border-blue-500
                            text-white
                            `

                                : `
                            bg-white
                            dark:bg-slate-800
                            border-gray-200
                            dark:border-slate-700
                            text-gray-700
                            dark:text-gray-300
                            `
                            }
                `}
                    >
                        {pageNumber}
                    </button>

                ))
            }

            <button
                disabled={
                    page === totalPages
                }
                onClick={() =>
                    onPageChange(
                        page + 1
                    )
                }
                className=" cursor-pointer w-11 h-11 rounded-full border border-[#D8D6F4] flex items-center
                    justify-center shadow-md disabled:opacity-40
                "
            >
                <ChevronLeft />


            </button>

        </div>

    );

};

export default Pagination;