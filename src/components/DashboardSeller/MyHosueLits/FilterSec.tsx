import { FilterIcon, SearchIcon } from 'lucide-react'
import React from 'react'

const FilterSec = () => {
    return (
        <div className='w-153.5 flex justify-between '>
            <div className='relative   text-[14px] text-blue-300 '>

                <input type="search"
                    placeholder=' نام ملک مورد نظر.....'
                    className='w-112.5 h-12 rounded-2xl pr-2 border border-[#0887CAB2]/70 outline-none'
                />
                <div className='absolute left-4 top-3 cursor-pointer '>

                    <SearchIcon />
                </div>
            </div>

            {/* DorpDown  */}
            <div
                className='w-37 h-12 rounded-2xl border border-[#0887CAB2]/70 text-[14px] text-blue-300 
                    flex justify-center items-center cursor-pointer
                '
            >
                <FilterIcon size={20} />
                <span className='text-blue-300/60 ' > فیلترهای بیشتر </span>
            </div>

        </div>
    )
}

export default FilterSec