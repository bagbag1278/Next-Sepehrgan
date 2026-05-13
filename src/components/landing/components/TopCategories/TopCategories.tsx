import React from 'react'
import Mansion from '../../Icon/TopCategories/MansionIcon'
import Flood from '../../Icon/TopCategories/FloodIcon'
import Store from '../../Icon/TopCategories/StoreIcon'
import Duplex from '../../Icon/TopCategories/DuplexIcon'
import EcoHouse from '../../Icon/TopCategories/EcoHouseIcon'
import StoreDarkIcon from '../../Icon/TopCategories/StoreDarkIcon'

const TopCategories = () => {
    return (
        <div className='flex justify-between '>
            <div className='w-full flex justify-center b '>
                <div className='max-w-286.75 w-full  flex justify-center gap-4.5 flex-wrap '>
                    <div className='w-full flex flex-wrap justify-center '>
                        <div className='w-full h-6.25 hidden sm:flex gap-2 justify-center'>
                            <div className='w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse '>
                                <div className='w-2 h-6.25 text-blue-200 text-[16px] '>؟</div>
                                <div className='w-1.5 h-4.75 text-blue-200 text-[12px]'>؟</div>
                                <div className='w-1 h-3.25 text-blue-200 text-[8px] '>؟</div>
                            </div>
                            <div className='dark:text-[#28A5E6] text-blue-200 text-[16px]'>به دنبال چه نوع خونه ای هستی هر چی بخوای ما داریم</div>
                            <div className='w-6.75 h-6.5 flex gap-0.5 items-center flex-row-reverse'>
                                <div className='w-2 h-6.25 text-blue-200 text-[16px] '>؟</div>
                                <div className='w-1.5 h-4.75 text-blue-200 text-[12px] '>؟</div>
                                <div className='w-1 h-3.25 text-blue-200 text-[8px] '>؟</div>
                            </div>
                        </div>
                        <div className='w-47.25 h-6.25 dark:text-[#F5F5F5] text-blue-400  '>برترین دسته بندی های ما </div>
                    </div>
                    {/* ** 5items ** */}
                    <div className='lg:w-full lg:h-auto h-90.5 w-85.5  flex flex-wrap justify-between'>
                        {/* ///// */}
                        <div
                            className='w-39.75 h-40 cursor-pointer   dark:drop-shadow-[(0px 0px 10px rgba(0, 94, 164, 0.5))] dark:hover:bg-slate-950 hover:border-amber-100 p-[14.5px] rounded-2xl '
                        
                        >
                            <div className='w-33 h-32  flex flex-wrap justify-center'>
                                <div className='w-full  flex justify-center'>
                                    <div className='not-dark:hidden  w-10 h-10  '>
                                        <Store />
                                    </div>
                                    <div className='hidden not-dark:flex w-10 h-10  '>
                                        <StoreDarkIcon />
                                    </div>
                                </div>
                                <div className='flex w-full h-20 flex-wrap justify-center gap-2'>
                                    <div className=' dark:text-white text-blue-400 text-[18px] font-bold '>مغازه</div>
                                    <div className='text-[13px] dark:text-[#adadad] text-blue-400 flex justify-center '>
                                        <div className='text-center '>سرمایه گذاری مطمئن،آینده روشن</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ///// */}
                        <div className='w-39.75 h-40 cursor-pointer mt-0 lg:mt-8 dark:hover:bg-slate-950  hover:border-amber-100 p-[14.5px] rounded-2xl '
                            style={{
                                filter: "drop-shadow(0px 0px 10px rgba(0, 94, 164, 0.5))"
                            }}
                        >
                            <div className='w-33 h-32  flex flex-wrap justify-center'>
                                <div className='w-full  flex justify-center'>
                                    <div className='w-10 h-10 '>
                                        <Duplex />
                                    </div>
                                </div>
                                <div className='flex w-full  h-20 flex-wrap justify-center gap-2'>
                                    <div className=' dark:text-white text-blue-400 text-[18px] font-bold'>آپارتمان</div>
                                    <div className='text-[13px] dark:text-[#adadad] text-blue-400 flex justify-center '>
                                        <div className='text-center '>طراحی دقیق،کیفیت بی نظیر</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ///// */}
                        <div className='w-39.75 h-40 cursor-pointer mt-0 lg:mt-12 rounded-2xl dark:hover:bg-slate-950 not-dark::hover:border hover:border-amber-100 p-[14.5px]'
                            style={{
                                filter: "drop-shadow(0px 0px 10px rgba(0, 94, 164, 0.5))"
                            }}
                        >
                            <div className='w-33 h-32 flex flex-wrap justify-center'>
                                <div className='w-full  flex justify-center'>
                                    <div className='w-10 h-10'>
                                        <EcoHouse />
                                    </div>
                                </div>
                                <div className='flex w-full h-20 flex-wrap justify-center gap-2'>
                                    <div className=' dark:text-white text-blue-400 text-[18px] font-bold'>ویلایی</div>
                                    <div className='text-[13px] dark:text-[#adadad] text-blue-400 flex justify-center '>
                                        <div className='text-center '>ویلای مدرن، زندگی متفاوت</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ///// */}
                        <div className='w-39.75 h-40 cursor-pointer mt-0 lg:mt-8 dark:hover:bg-slate-950 not-dark::hover:border hover:border-amber-100 p-[14.5px] rounded-2xl '
                            style={{
                                filter: "drop-shadow(0px 0px 10px rgba(0, 94, 164, 0.5))"
                            }}
                        >
                            <div className='w-33 h-32  flex flex-wrap justify-center'>
                                <div className='w-full  flex justify-center'>
                                    <div className='w-10 h-10  '>
                                        <Mansion />
                                    </div>
                                </div>
                                <div className='flex w-full h-20 flex-wrap justify-center gap-2'>
                                    <div className=' dark:text-white text-blue-400 text-[18px] font-bold'>اداری</div>
                                    <div className='text-[13px] dark:text-[#adadad] text-blue-400 flex justify-center '>
                                        <div className='text-center '>محل کار رویایی شما فقط با ما</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ///// */}
                        <div className='hidden lg:flex w-39.75 h-40 cursor-pointer  dark:hover:bg-slate-950 not-dark::hover:border hover:border-amber-100 p-[14.5px] rounded-2xl'
                            style={{
                                filter: "drop-shadow(0px 0px 10px rgba(0, 94, 164, 0.5))"
                            }}
                        >
                            <div className='w-33 h-32 flex flex-wrap justify-center'>
                                <div className='w-full  flex justify-center'>
                                    <div className='w-10 h-10 lg:flex hidden'>
                                        <Flood  />
                                    </div>
                                </div>
                                <div className='flex w-full h-20 flex-wrap justify-center gap-2'>
                                    <div className=' dark:text-white text-blue-400 text-[18px] font-bold'>استخر دار</div>
                                    <div className='text-[13px] dark:text-[#adadad] text-blue-400 flex justify-center '>
                                        <div className='text-center '>خانه ای فراتر از تصور شما</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TopCategories