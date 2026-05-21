import React from 'react'
import Vector from '../../Icon/FirstContainer/Vector'
import StarIcon from '../../Icon/FirstContainer/StarIcon'
import EyeIcon from '../../Icon/FirstContainer/EyeIcon'
import BigArrowIcon from '../../Icon/FirstContainer/BigArrowIcon'
import MainImage1 from '../../Icon/FirstContainer/MainIamge1'
import MainImage2 from '../../Icon/FirstContainer/MainImage2'
import MainImage3 from '../../Icon/FirstContainer/MainImage3'
import { ManiImage4 } from '../../Icon/FirstContainer/ManiImage4'
import MiniImage1 from '../../Icon/FirstContainer/MiniImage1'
import MiniImage2 from '../../Icon/FirstContainer/MiniImage2'
import MiniImage3 from '../../Icon/FirstContainer/MiniImage3'
import MiniImage4 from '../../Icon/FirstContainer/MiniImage4'

const FirstContainer = () => {
    return (
        <div className='w-full flex justify-center '>
            <div className=' w-full hidden sm:flex justify-center '>
                <div className='w-330.75  relative'>
                    {/* ///// */}
                    <div className='w-full flex justify-center  lg:justify-between gap-y-5.5 flex-wrap items-start'>

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

                            <div className='flex flex-col justify-center h-14 ' >
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
                                <div className=' dark:text-[#F5F5F5] text-[20px] font-bold text-blue-400 '>
                                    <div className=' mr-5'>
                                        جدید ترین بومگردی ها
                                    </div>
                                </div>
                            </div>

                        </div>



                        {/* ///// */}

                        <div className="flex gap-4 justify-start  items-center flex-row-reverse">

                            <div className="flex flex-col gap-4">

                                <div className="relative 500 hidden xl:flex w-164 h-52.75 rounded-2xl overflow-hidden bg-slate-700">
                                    <div className='w-full h-full'>
                                        <MainImage1 />
                                    </div>
                                    {/* /////point  */}
                                    <div className='absolute right-3 top-2 flex gap-1 '>
                                        <StarIcon />
                                        <p>4.5</p>
                                    </div>
                                    {/* ////// view and title  */}
                                    <div className='absolute bottom-2 right-2/5  w-40.75 h-15 flex justify-center flex-wrap ' >
                                        <div className='text-[18px] text-white font-bold'>بلینگهام در لفور</div>
                                        <div className=' flex gap-1 '>
                                            <div className='text-[12px] text-white ' > ۲۸ بازدید</div>
                                            <EyeIcon />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex h-full gap-3 flex-col xl:flex-row ">
                                    <div className="relative w-75 xl:h-55.75 xl:w-85 h-53 xl:mb-0 mb-3 rounded-2xl overflow-hidden ">

                                        <MainImage2 />
                                        <div className='absolute right-3 top-2 flex gap-1 text-white'>
                                            <StarIcon />
                                            <p>4.5</p>
                                        </div>
                                        {/* ////// view and title  */}
                                        <div className='absolute bottom-2 right-2/8  w-40.75 h-15 flex justify-center flex-wrap ' >
                                            <div className='text-[18px] font-bold text-white'>بلینگهام در لفور</div>
                                            <div className=' flex gap-1 '>
                                                <div className='text-[12px] text-white ' > ۲۸ بازدید</div>
                                                <EyeIcon />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative w-75 h-55.75 xl:mb-0 mb-3 rounded-2xl">

                                        <MainImage3 />
                                        <div className='absolute right-3 top-2 flex gap-1 text-white'>
                                            <StarIcon />
                                            <p>4.5</p>
                                        </div>
                                        
                                        <div className='absolute bottom-2 right-2/8  w-40.75 h-15 flex justify-center flex-wrap ' >
                                            <div className='text-[18px] font-bold text-white'>بلینگهام در لفور</div>
                                            <div className=' flex gap-1 '>
                                                <div className='text-[12px] text-white ' > ۲۸ بازدید</div>
                                                <EyeIcon />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative w-60 h-113.5 rounded-2xl overflow-hidden bg-slate-700 z-50">


                                <ManiImage4 />
                                <div className=" w-80 h-full border border-white xl:mb-0 mb-3 rounded-2xl overflow-hidden bg-slate-700">

                                    <div className='absolute right-3 top-2 flex gap-1 '>
                                        <StarIcon />
                                        <p className='text-white '>4.5</p>
                                    </div>
                                    {/* ////// view and title  */}
                                    <div className='absolute bottom-2 right-2/11  w-40.75 h-15 flex justify-center flex-wrap ' >
                                        <div className='text-[18px] font-bold text-white'>بلینگهام در لفور</div>
                                        <div className=' flex gap-1 '>
                                            <div className='text-[12px] text-white ' > ۲۸ بازدید</div>
                                            <EyeIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    {/* ///// */}
                    <div className=' hidden lg:flex absolute right-40 top-60 lg:top-77 -z-10 rotate-[20px] rotate-x-3  '>
                        <Vector />
                    </div>

                </div>
            </div>
            {/* responsive sm:    ===== */}
            <div className='w-62.5 relative sm:hidden flex flex-col gap-10 justify-center '>
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
                    <div className='relative w-62.5 h-55.75  '>
                    
                        <MiniImage1 />

                        <div className='absolute flex justify-center flex-wrap text-[12px] bottom-0 w-29 h-10.5 '>
                            <div className='text-white '>نروژ در اصفهان</div>
                            <div className='w-full flex '>
                                <div className='mr-6 '>
                                    <EyeIcon />
                                </div>
                                <div className='text-[13px] text-white mr-2 '>بازدید</div>
                            </div>
                        </div>                            
                        <div className='absolute top-2 right-2 w-11 h-5 flex items-center gap-0.5 '>
                            <div className=' text-[11px] text-white'>4.5</div>
                            <StarIcon />
                        </div>
                    </div>
                    {/* // */}
                    <div className='w-62.5 h-55.75 flex justify-between  '>
                        <div className='relative w-30 h-full  '>

                            <MiniImage2 />
                            <div className='absolute flex justify-center flex-wrap  text-[12px] bottom-0 w-29 h-10.5 '>
                                <div className='text-white'>نروژ در اصفهان</div>
                                <div className='w-full flex '>
                                    <div className='mr-6 '>
                                        <EyeIcon />
                                    </div>
                                    <div className=' text-[13px] text-white mr-2 '>بازدید</div>
                                </div>
                            </div>
                            <div className='absolute top-2 right-2 w-11 h-5 flex items-center gap-0.5 '>
                                <div className=' text-[11px] text-white'>4.5</div>
                                <StarIcon />
                            </div>
                        </div>
                        <div className='relative w-30 h-full  '>

                            <MiniImage3 />
                            <div className='absolute flex justify-center flex-wrap  text-[12px] bottom-0 w-29 h-10.5 '>
                                <div className='text-white'>نروژ در اصفهان</div>
                                <div className='w-full flex '>
                                    <div className='mr-6 '>
                                        <EyeIcon />
                                    </div>
                                    <div className=' text-[13px] text-white mr-2 '>بازدید</div>
                                </div>
                            </div>
                            <div className='absolute top-2 right-2 w-11 h-5 flex items-center gap-0.5 '>
                                <div className=' text-[11px] text-white'>4.5</div>
                                <StarIcon />
                            </div>
                        </div>
                    </div>
                    {/* // */}
                    <div className='relative w-62.5 h-115.5 z-50 '>
                        <MiniImage4 />
                        <div className='absolute flex justify-center flex-wrap  text-[12px] bottom-0 w-29 h-10.5 '>
                            <div className='text-white'>نروژ در اصفهان</div>
                            <div className='w-full flex '>
                                <div className='mr-6 '>
                                    <EyeIcon />
                                </div>
                                <div className=' text-[13px] mr-2 text-white'>بازدید</div>
                            </div>
                        </div>
                        <div className='absolute top-2 right-2 w-11 h-5 flex items-center gap-0.5 '>
                            <div className=' text-[11px] text-white'>4.5</div>
                            <StarIcon />
                        </div>
                    </div>
                </div>
                <div className='w-full h-28 flex flex-wrap justify-center gap-2.5 '>
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