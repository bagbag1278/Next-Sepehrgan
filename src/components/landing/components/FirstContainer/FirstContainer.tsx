import React from 'react'
import Vector from '../../Icon/FirstContainer/Vector'
import StarIcon from '../../Icon/FirstContainer/StarIcon'
import EyeIcon from '../../Icon/FirstContainer/EyeIcon'
import BigArrowIcon from '../../Icon/FirstContainer/BigArrowIcon'

const FirstContainer = () => {
    return (
        <div className='w-full flex justify-center '>
            <div className=' w-full hidden sm:flex justify-center '>
                <div className='w-330.75  relative'>
                    {/* ///// */}
                    <div className='w-full flex justify-center  lg:justify-between gap-y-5.5 flex-wrap items-start '>

                        <div className='w-70 lg:w-82 h-88 hidden lg:flex items-center lg:items-end '>
                            <div className='flex flex-wrap justify-center h-56 lg:h-77  w-90 '>
                                <div className=' flex flex-wrap justify-center h-14 ' >
                                    <div className='flex w-62 h-7   gap-1 '>
                                        <div className='w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse '>
                                            <div className='w-2 h-6.25 text-blue-200 text-[16px] '>؟</div>
                                            <div className='w-1.5 h-4.75 text-blue-200 text-[12px] '>؟</div>
                                            <div className='w-1 h-3.25 text-blue-200 text-[8px] '>؟</div>
                                        </div>
                                        <div className='w-58.5 h-5.5 dark:text-[#28A5E6] text-[14px] text-blue-200 '>بومگردی نوین خاطرات جاودان</div>
                                        <div className='w-6.75 h-6.5 flex gap-0.5 items-center flex-row-reverse '>
                                            <div className='w-2 h-6.25 text-blue-200 text-[16px] '>؟</div>
                                            <div className='w-1.5 h-4.75 text-blue-200 text-[12px] '>؟</div>
                                            <div className='w-1 h-3.25 text-blue-200 text-[8px] '>؟</div>
                                        </div>
                                    </div>
                                    <div className=' dark:text-[#F5F5F5] text-[20px] font-bold text-blue-400 '>جدید ترین بومگردی ها</div>
                                </div>
                                <div className='hidden lg:flex lg:w-82  lg:h-17 text-center dark:text-[#F5F5F5D9] text-blue-400 '>بهترین بوم‌گردی‌ها در انتظار شماست؛ بیایید با هم به دنیای سبز سفر کنیم و از زیبایی‌های طبیعت لذت ببریم!</div>
                                <button className='w-30 h-10 hover:border-2 rounded-xl border border-green-100 cursor-pointer ' >
                                    <p className='text-green-100 text-[14px] '>مشاهده همه</p>
                                </button>
                            </div>
                        </div>

                        {/* >>>>> ? >>> responsive lg tailwind css >>> ?>>>>>>>> */}
                        <div className='w-full lg:hidden flex justify-center '>

                            <div className='border border-white  flex flex-col justify-center h-14 ' >
                                <div className='flex w-62 h-7  gap-1 '>
                                    <div className='w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse '>
                                        <div className='w-2 h-6.25 text-blue-200 text-[16px] '>؟</div>
                                        <div className='w-1.5 h-4.75 text-blue-200 text-[12px] '>؟</div>
                                        <div className='w-1 h-3.25 text-blue-200 text-[8px] '>؟</div>
                                    </div>
                                    <div className='w-58.5  h-5.5 dark:text-[#28A5E6] text-[14px] text-blue-200 '>بومگردی نوین خاطرات جاودان</div>
                                    <div className='w-6.75 h-6.5 flex gap-0.5 items-center flex-row-reverse '>
                                        <div className='w-2 h-6.25 text-blue-200 text-[16px] '>؟</div>
                                        <div className='w-1.5 h-4.75 text-blue-200 text-[12px] '>؟</div>
                                        <div className='w-1 h-3.25 text-blue-200 text-[8px] '>؟</div>
                                    </div>
                                </div>
                                <div className=' dark:text-[#F5F5F5]  border border-white text-[20px] font-bold text-blue-400 '>
                                    <div className=' mr-5'>
                                        جدید ترین بومگردی ها
                                    </div>
                                </div>
                            </div>

                        </div>



                        {/* ///// */}

                        <div className="flex gap-4 justify-start items-center flex-row-reverse">

                            <div className="flex flex-col gap-4">
                                <div className="hidden xl:flex w-164 h-52.75 rounded-2xl overflow-hidden bg-slate-700">  </div>
                                <div className=" xl:flex gap-3 xl:gap-4 xl:flex-wrap  ">
                                    <div className="w-80 h-55.75 xl:mb-0 mb-3 rounded-2xl overflow-hidden bg-slate-700">   </div>
                                    <div className="w-80 h-55.75 rounded-2xl overflow-hidden bg-slate-700">   </div>
                                </div>
                            </div>
                            <div className="flex w-60 h-113.5 rounded-2xl overflow-hidden bg-slate-700 z-50">   </div>



                        </div>

                    </div>
                    {/* ///// */}
                    <div className=' hidden lg:flex absolute right-40 top-60 lg:top-77 -z-10 rotate-[20px] rotate-x-3  '>
                        <Vector />
                    </div>

                </div>
            </div>
            {/* responsive sm:    ===== */}
            <div className='w-62.5 border border-white relative sm:hidden flex flex-col gap-15 justify-center '>
                <div className='w-60  h-12.75  flex flex-wrap '>
                    <div className=' flex flex-wrap justify-center h-14 ' >
                        <div className='flex w-62 h-7   gap-1 '>
                            <div className='w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse '>
                                <div className='w-2 h-6.25 text-blue-200 text-[16px] '>؟</div>
                                <div className='w-1.5 h-4.75 text-blue-200 text-[12px] '>؟</div>
                                <div className='w-1 h-3.25 text-blue-200 text-[8px] '>؟</div>
                            </div>
                            <div className=' h-5.5 dark:text-[#28A5E6] text-[12px] text-blue-200 '>بومگردی نوین خاطرات جاودان</div>
                            <div className='w-2.75 h-6.5 flex gap-0.5 items-center justify-end  mr-1 flex-row-reverse '>
                                <div className='w-2 h-6.25 text-blue-200 text-[16px] '>؟</div>
                                <div className='w-1.5 h-4.75 text-blue-200 text-[12px] '>؟</div>
                                <div className='w-1 h-3.25 text-blue-200 text-[8px] '>؟</div>
                            </div>
                        </div>
                        <div className=' dark:text-[#F5F5F5] text-[17px] font-bold text-blue-400 '>جدید ترین بومگردی ها</div>
                    </div>
                </div>


                <div className='w-62.5 flex flex-col gap-1.5 '>
                    {/* // */}
                    <div className='relative w-62.5 h-55.75 border border-white '>
                        <div className='absolute flex justify-center flex-wrap dark:text-white text-[12px] bottom-0 w-29 h-10.5 '>
                            <div className=''>نروژ در اصفهان</div>
                            <div className='w-full flex '>
                                <div className='mr-6 '>
                                    <EyeIcon />
                                </div>
                                <div className='dark:text-white text-[13px] mr-2 '>بازدید</div>
                            </div>
                        </div>                            <div className='absolute top-0 right-0 w-11 h-5 flex items-center gap-0.5 '>
                            <div className='dark:text-white text-[11px]'>4.5</div>
                            <StarIcon />
                        </div>
                    </div>
                    {/* // */}
                    <div className='w-62.5 h-55.75 flex justify-between border border-white '>
                        <div className='relative w-30 h-full border border-white '>
                            <div className='absolute flex justify-center flex-wrap dark:text-white text-[12px] bottom-0 w-29 h-10.5 '>
                                <div className=''>نروژ در اصفهان</div>
                                <div className='w-full flex '>
                                    <div className='mr-6 '>
                                        <EyeIcon />
                                    </div>
                                    <div className='dark:text-white text-[13px] mr-2 '>بازدید</div>
                                </div>
                            </div>
                            <div className='absolute top-0 right-0 w-11 h-5 flex items-center gap-0.5 '>
                                <div className='dark:text-white text-[11px]'>4.5</div>
                                <StarIcon />
                            </div>
                        </div>
                        <div className='relative w-30 h-full border border-white '>
                            <div className='absolute flex justify-center flex-wrap dark:text-white text-[12px] bottom-0 w-29 h-10.5 '>
                                <div className=''>نروژ در اصفهان</div>
                                <div className='w-full flex '>
                                    <div className='mr-6 '>
                                        <EyeIcon />
                                    </div>
                                    <div className='dark:text-white text-[13px] mr-2 '>بازدید</div>
                                </div>
                            </div>                            <div className='absolute top-0 right-0 w-11 h-5 flex items-center gap-0.5 '>
                                <div className='dark:text-white text-[11px]'>4.5</div>
                                <StarIcon />
                            </div>
                        </div>
                    </div>
                    {/* // */}
                    <div className='relative w-62.5 h-115.5 border border-white '>
                        <div className='absolute flex justify-center flex-wrap dark:text-white text-[12px] bottom-0 w-29 h-10.5 '>
                            <div className=''>نروژ در اصفهان</div>
                            <div className='w-full flex '>
                                <div className='mr-6 '>
                                    <EyeIcon />
                                </div>
                                <div className='dark:text-white text-[13px] mr-2 '>بازدید</div>
                            </div>
                        </div>                            <div className='absolute top-0 right-0 w-11 h-5 flex items-center gap-0.5 '>
                            <div className='dark:text-white text-[11px]'>4.5</div>
                            <StarIcon />
                        </div>
                    </div>
                </div>
                <div className='w-full h-28 border border-white flex flex-wrap justify-center gap-2.5 '>
                    <div>
                        <div className='dark:text-white text-blue-400 text-[9px] leading-7 text-center '>
                            بهترین بوم‌گردی‌ها در انتظار شماست؛ بیایید با هم به دنیای سبز سفر کنیم و از زیبایی‌های طبیعت لذت ببریم!
                        </div>
                    </div>
                    <button className='w-30 h-10 hover:border-2 rounded-xl border border-green-100 cursor-pointer ' >
                        <p className='text-green-100 text-[14px] '>مشاهده همه</p>
                    </button>
                </div>

                    <div className='absolute bottom-5 -left-17 '>
                        <BigArrowIcon />
                    </div>

            </div>
            {/* ////// */}
        </div>

    )
}

export default FirstContainer