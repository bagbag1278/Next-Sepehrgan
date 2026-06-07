import React from 'react'
import CirclesIcon from '../Icon/CirclesIcon'

const Financialmanage = () => {
    return (
        <div>
            {/* PAGE TITLE */}
            <div className="w-full h-14 flex gap-1">

                <div className=" w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse scale-x-[-1]">
                    <CirclesIcon />
                </div>

                <div className="dark:text-blue-500 text-blue-400 text-[18px] font-bold" >
                    مدیریت مالی
                </div>

                <div className=" w-6.75 h-6.5 flex gap-0.5  items-center flex-wrap-reverse"  >
                    <CirclesIcon />
                </div>

            </div>
        </div>
    )
}

export default Financialmanage