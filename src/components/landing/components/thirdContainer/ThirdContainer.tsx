import React from 'react';
import MountainsSun from '../../Icon/ThirdContainer/mountainsSun';
import ImageDef from '../../Icon/ThirdContainer/ImageDef';
import ImageDef1 from '../../Icon/ThirdContainer/ImageDef1';
import ImageDef2 from '../../Icon/ThirdContainer/ImageDef2';
import ImageDef3 from '../../Icon/ThirdContainer/ImageDef3';
import { EyeIcon, StarIcon } from 'lucide-react';
import ImageMob1 from '../../Icon/ThirdContainer/ImageMob1';
import ImageMob2 from '../../Icon/ThirdContainer/ImageMob2';
import ImageMob3 from '../../Icon/ThirdContainer/ImageMob3';
import ImageMob4 from '../../Icon/ThirdContainer/ImageMob4';

const ThirdContainer = () => {
    return (
        <div className='flex w-full justify-center p-4' dir='ltr'>
            <div className='w-full max-w-7xl gap-6 flex flex-col lg:flex-row items-center lg:items-start'>

                <div className='w-full flex flex-col items-center lg:items-start'>

                    <div className='w-full h-15.75 flex flex-wrap justify-center mb-5 mt-4 lg:mt-0'>
                        <div className='w-full h-5 flex items-center justify-center gap-2'>
                            <div className='w-6.25 h-2.75  scale-x-[-1]'>
                                <MountainsSun />
                            </div>
                            <div className='dark:text-[#28A5E6] text-blue-400 text-[14px] text-center'>
                                جدید ترین ها را با ما کشف کنید لذت ببرید
                            </div>
                            <div className='w-6.25 h-2.75 flex items-center'>
                                <MountainsSun />
                            </div>
                        </div>
                        <div className='w-full h-8.5 flex justify-center mt-2'>
                            <div className='text-[20px] text-blue-400 dark:text-[#F5F5F5] text-center'>
                                مناطق محبوب ویلایی
                            </div>
                        </div>
                    </div>
                    {/* hidden w-full h-104.75 sm:flex lg:flex flex-col lg:flex-row gap-5 border border-b-purple-500 */}

                    <div
                        className='relative hidden lg:flex sm:flex w-full flex-col  lg:h-104.75 h-51 gap-3 lg:flex-row justify-center  '
                    >
                        <div className='hidden lg:block cursor-pointer relative w-135 h-full bg-amber-400 rounded-4xl overflow-hidden  '>
                            <ImageDef />
                            <div className='absolute right-3 top-2 flex gap-1 z-50  text-white'>
                                <StarIcon />
                                <p>4.5</p>
                            </div>
                            {/* ////// view and title  */}
                            <div className='absolute bottom-2 right-3/9  h-15 flex items-center justify-center flex-nowrap ' >
                                <div className=' flex gap-1 h-5  '>
                                    <div className=' flex text-[12px]  text-white/70  ' >
                                        مورد
                                        <p >26</p>
                                    </div>
                                </div>
                                <div className='text-[18px] font-bold text-white'>نیویورک در خوزستان </div>
                            </div>
                        </div>
                        <div className='cursor-pointer relative hidden lg:block w-72.5 h-full rounded-4xl bg-amber-400 overflow-hidden '>
                            <ImageDef1 />
                            <div className='absolute right-3 top-2 flex gap-1 z-50 text-white'>
                                <StarIcon />
                                <p>4.5</p>
                            </div>
                            {/* ////// view and title  */}
                            <div className='absolute bottom-1 right-1/5  h-15 flex items-center justify-center flex-nowrap ' >
                                <div className=' flex gap-1 h-5  '>
                                    <div className=' flex text-[12px]  text-white/70  ' >
                                        مورد
                                        <p >26</p>
                                    </div>
                                </div>
                                <div className='text-[18px] font-bold text-white'>راکی در سنگده</div>
                            </div>
                        </div>
                        <div className='flex lg:flex-col flex-row justify-center gap-4 h-full'>
                            <div className='cursor-pointer relative w-96.25 h-50.25 rounded-4xl overflow-hidden '>
                                <ImageDef2 />
                                <div className='absolute right-3 top-2 flex gap-1 z-50 text-white'>
                                    <StarIcon />
                                    <p>4.5</p>
                                </div>
                                {/* ////// view and title  */}
                                <div className='absolute bottom-1 right-2/9  h-15 flex items-center justify-center flex-nowrap ' >
                                    <div className=' flex gap-1 h-5  '>
                                        <div className=' flex text-[12px]  text-white/70  ' >
                                            مورد
                                            <p >26</p>
                                        </div>
                                    </div>
                                    <div className='text-[18px] font-bold text-white'>نیویورک در خوزستان </div>
                                </div>
                            </div>
                            <div className='cursor-pointer relative w-96.25 h-50.25  rounded-4xl overflow-hidden '>
                                <ImageDef3 />
                                <div className='absolute right-3 top-2 flex gap-1 z-50 text-white '>
                                    <StarIcon />
                                    <p>4.5</p>
                                </div>
                                {/* ////// view and title  */}
                                <div className='absolute bottom-1 right-2/9  h-15 flex items-center justify-center flex-nowrap ' >
                                    <div className=' flex gap-1 h-5  '>
                                        <div className=' flex text-[12px]  text-white/70  ' >
                                            مورد
                                            <p >26</p>
                                        </div>
                                    </div>
                                    <div className='text-[18px] font-bold text-white'>نیویورک در خوزستان </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    {/* responsive sm:   ============= */}
                    <div className='w-62.5 sm:hidden flex flex-col  gap-y-4'>

                        <div className='relative w-62.5 h-55.75 bg-gray-500 rounded-4xl lg:mb-0'>
                            <ImageMob1 />
                            <div className='absolute right-3 top-2 flex gap-1 z-50 text-white '>
                                <StarIcon />
                                <p>4.5</p>
                            </div>
                            {/* ////// view and title  */}
                            <div className='absolute bottom-2 right-2/10  h-15 flex items-center justify-center flex-nowrap ' >
                                <div className=' flex gap-1 h-5  '>
                                    <div className=' flex text-[11px]  text-white/70  ' >
                                        مورد
                                        <p >26</p>
                                    </div>
                                </div>
                                <div className='text-[15px] font-bold text-white'>نیویورک در خوزستان </div>
                            </div>
                        </div>

                        <div className='relative w-62.5 h-100.75 overflow-hidden rounded-4xl bg-gray-500  lg:mb-0'>

                            <ImageMob2 />

                            <div className='absolute right-3 top-2 flex gap-1 z-50 text-white '>
                                <StarIcon />
                                <p>4.5</p>
                            </div>
                            {/* ////// view and title  */}
                            <div className='absolute bottom-2 right-2/10  h-15 flex items-center justify-center flex-nowrap ' >
                                <div className=' flex gap-1 h-5  '>
                                    <div className=' flex text-[11px]  text-white/70  ' >
                                        مورد
                                        <p >26</p>
                                    </div>
                                </div>
                                <div className='text-[15px] text-white font-bold'>نیویورک در خوزستان </div>
                            </div>
                        </div>

                        <div className='relative w-62.5 h-25 bg-gray-500 rounded-4xl'>
                            <ImageMob3 />
                            <div className='absolute right-3 top-2 flex gap-1 z-50 text-white '>
                                <StarIcon />
                                <p>4.5</p>
                            </div>
                            {/* ////// view and title  */}
                            <div className='absolute bottom-0.5 right-2/10  h-15 flex items-center justify-center flex-nowrap ' >
                                <div className=' flex gap-1 h-5  '>
                                    <div className=' flex text-[11px]  text-white/70  ' >
                                        مورد
                                        <p >26</p>
                                    </div>
                                </div>
                                <div className='text-[15px] text-white font-bold'>نیویورک در خوزستان </div>
                            </div>
                        </div>

                        <div className='relative w-62.5 h-25  bg-gray-500 rounded-4xl'>
                            <ImageMob4 />
                            <div className='absolute right-3 top-2 flex gap-1 z-50 text-white '>
                                <StarIcon />
                                <p>4.5</p>
                            </div>
                            {/* ////// view and title  */}
                            <div className='absolute bottom-0.5 right-2/10  h-15 flex items-center justify-center flex-nowrap ' >
                                <div className=' flex gap-1 h-5  '>
                                    <div className=' flex text-[11px]  text-white/70  ' >
                                        مورد
                                        <p >26</p>
                                    </div>
                                </div>
                                <div className='text-[15px] text-white font-bold'>نیویورک در خوزستان </div>
                            </div>
                        </div>

                    </div>
                    {/* ///// */}
                </div>
            </div>
        </div>
    );
}

export default ThirdContainer;
