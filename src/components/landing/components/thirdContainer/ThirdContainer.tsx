import React from 'react';
import MountainsSun from '../../Icon/ThirdContainer/mountainsSun';
import ImageDef from '../../Icon/ThirdContainer/ImageDef';
import ImageDef1 from '../../Icon/ThirdContainer/ImageDef1';
import ImageDef2 from '../../Icon/ThirdContainer/ImageDef2';
import ImageDef3 from '../../Icon/ThirdContainer/ImageDef3';

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


                    <div className='w-full hidden sm:flex flex-col lg:flex-row gap-5'>

                        <div className='w-full lg:w-2/4 h-auto lg:h-105 bg-gray-500 flex justify-center items-center rounded-4xl mb-5 lg:mb-0'>
                        <div className='border border-white '>

                             {/* <ImageDef /> */}
                        </div>
                        </div>

                        <div className='w-full lg:w-1/4 h-auto lg:h-105 flex justify-center items-center rounded-4xl bg-gray-500 mb-5 lg:mb-0'>
                                <div className='border border-white '>

                             {/* <ImageDef1 /> */}
                        </div>
                        </div>

                        <div className='w-full lg:w-2/3 flex flex-col gap-5'>
                            <div className='w-full h-50.25 flex justify-end items-center bg-gray-500 rounded-4xl'>
                                <div className='border border-white'>
                                    {/* <ImageDef2 /> */}
                                </div>
                            </div>
                            <div className='w-full h-50.25 flex justify-center items-center  bg-gray-500 rounded-4xl'>
                                <div className='border border-white'>
                                    {/* <ImageDef3 /> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* responsive sm:   ===== */}
                    <div className='w-62.5 sm:hidden flex flex-col  gap-y-4 border border-white'>

                        <div className='w-62.5 h-55.75 bg-gray-500 rounded-4xl lg:mb-0'>
                            <ImageDef />
                        </div>

                        <div className='w-62.5 h-100.75 rounded-4xl bg-gray-500  lg:mb-0'></div>

                            <div className='w-62.5 h-25 bg-gray-500 rounded-4xl'></div>

                            <div className='w-62.5 h-25  bg-gray-500 rounded-4xl'></div>
                        
                    </div>
                    {/* ///// */}
                </div>
            </div>
        </div>
    );
}

export default ThirdContainer;
