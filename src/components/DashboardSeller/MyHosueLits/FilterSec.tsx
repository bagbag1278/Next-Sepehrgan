"use client";

import { SearchIcon, FilterIcon } from "lucide-react";
import { debounce } from "lodash-es";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import FilterModal from "./FilterModal";


interface FilterSecProps {
    onSearch: (value: string) => void;
    search: string;
}

const FilterSec = ({ onSearch, search }: FilterSecProps) => {

    const [open, setOpen] = useState(false);
    

    return (
        <>
            <div
                className="
                    w-153.5
                    flex
                    justify-between
                "
            >

                {/* Search */}

                <div
                    className="
                        relative
                        text-[14px]
                        text-blue-300
                    "
                >

                    <input
                        type="search"
                        value={search}
                        placeholder="نام ملک مورد نظر..."
            
                        onChange={(e) =>
                            onSearch(
                                e.target.value
                            )
                        }
                        className="
                            w-112.5
                            h-12
                            rounded-2xl
                            pr-3
                            dark:bg-slate-800
                            border
                            border-[#0887CAB2]/70
                            outline-none
                        "
                    />

                    <div
                        className="
                            absolute
                            left-4
                            top-3
                            cursor-pointer
                        "
                    >
                        <SearchIcon />
                    </div>

                </div>

                {/* Filter Button */}
            
                <button
                    onClick={() =>
                        setOpen(
                            true
                        )
                    }
                    className="
                        w-37 relative
                        h-12
                        dark:bg-slate-800
                        rounded-2xl
                        border
                        border-[#0887CAB2]/70
                        text-[14px]
                        text-blue-300
                        flex
                        justify-center
                        items-center
                        gap-2
                        cursor-no-drop
                        opacity-35
                    "
                >

                    <FilterIcon
                        size={20}
                    />

                    <span
                        className="
                            text-blue-300/60
                        "
                    >
                        فیلترهای بیشتر
                    </span>
                    <div className="rounded-2xl absolute w-full h-full  bg-gray-500/30 ">
                    </div>

                </button>

            </div>

            {/* <FilterModal/> */}

        </>
    );
};

export default FilterSec;