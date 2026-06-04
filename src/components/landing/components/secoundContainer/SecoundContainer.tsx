"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import Photograph2 from '../../Icon/secoundContainer/Photograph2';
import BlueImage from '../../Icon/secoundContainer/BlueImage';
import Photograph from '../../Icon/secoundContainer/Photograph';
import BlueHouse from '../../Icon/secoundContainer/BlueHouse';
import Arrow from '../../Icon/secoundContainer/Arrow';
import Link from 'next/link';

const SecoundContainer = () => {
    const t = useTranslations('SecondContainer');

    return (
        <div className='w-full hidden sm:flex justify-center dark:bg-[linear-gradient(180deg,#121212_0%,rgba(4,38,55,0.5)_49.65%,#121212_100%)]'>
            <div className='relative w-352 h-125 flex flex-wrap justify-center lg:justify-between'>

                {/* نسخه ریسپانسیو برای صفحه‌های کوچک (موبایل/تبلت) */}
                <div className='lg:hidden flex justify-between items-center w-100.75 h-17'>
                    <div>
                        <div className='w-60 h-7 text-[14px] text-blue-300'>
                            {t('travelToNature')}
                        </div>
                        <div className='w-41.5 h-7.75 text-[20px] text-[#F5F5F5]'>
                            {t('introducingRahankade')}
                        </div>
                    </div>
                    <Link href={"/contactus"} className='w-30 h-10 hover:border-2 rounded-xl border border-green-100 cursor-pointer flex items-center justify-center'>
                        <p className='text-green-100 text-[14px]'>{t('more')}</p>
                    </Link>
                </div>

                {/* بخش اصلی */}
                <div className='w-full h-full flex items-center justify-between gap-0.5'>
                    
                    {/* بخش متن - دسکتاپ */}
                    <div className='hidden lg:flex justify-end w-200'>
                        <div className='z-50 mr-1 w-103.75 h-65 flex items-center justify-between flex-wrap'>
                            <div className='w-70.75 h-17'>
                                <div className='w-60 h-7 text-[14px] text-blue-300'>
                                    {t('travelToNature')}
                                </div>
                                <div className='w-41.5 h-7.75 text-[20px] text-blue-400 dark:text-[#F5F5F5]'>
                                    {t('introducingRahankade')}
                                </div>
                            </div>
                            <div className='w-101.25 dark:text-[#F5F5F5D9] text-blue-400 flex items-center'>
                                <div>{t('description')}</div>
                            </div>
                            <Link
                                href={"/contactus"}
                                className='flex justify-center items-center w-30 h-10 hover:border-2 rounded-xl border border-green-100 cursor-pointer'
                            >
                                <p className='text-green-100 text-[14px]'>{t('more')}</p>
                            </Link>
                        </div>
                    </div>

                    {/* بخش تصاویر و کارت‌ها */}
                    <div className="flex lg:justify-end justify-center relative w-full h-115">
                        
                        {/* کارت اول - واحدها */}
                        <div className="absolute left-18 top-3 w-31.5 h-43.75 flex flex-col items-center justify-center text-white">
                            <div><BlueHouse /></div>
                            <div className="text-xl text-blue-400 dark:text-white/80 font-bold mt-5">
                                {t('units')}
                            </div>
                            <div className="text-[13px] text-blue-400 dark:text-white/80 mt-4 text-center">
                                {t('findDreamHome')}
                            </div>
                        </div>

                        {/* تصویر Photograph */}
                        <div className="absolute left-61.25 top-0 w-60 h-60 flex items-center justify-center overflow-hidden bg-center">
                            <Photograph />
                        </div>

                        {/* تصویر Photograph2 */}
                        <div className="absolute left-10 top-49 w-60 h-60 bg-center flex items-center justify-center rounded-4xl overflow-hidden">
                            <Photograph2 />
                        </div>

                        {/* کارت دوم - پشتیبانی */}
                        <div className="absolute left-80.75 top-62.5 flex flex-col items-center justify-center text-white">
                            <div className='mb-5'><BlueImage /></div>
                            <div className="font-bold text-blue-400 dark:text-white/80">
                                {t('support')}
                            </div>
                            <div className="w-33.75 h-12.5 text-center text-[13px] font-semibold mt-4.5 text-blue-400 dark:text-white/80">
                                {t('supportDesc')}
                            </div>
                        </div>

                        {/* کارت سوم - آمار بازدیدها */}
                        <div className="absolute left-46.25 top-41.5 w-30 h-27.5 bg-white/96 rounded-tr-[40px] rounded-bl-[40px] flex items-center justify-center text-sky-700 font-bold">
                            <div className="text-center leading-tight">
                                <div className="text-sm">{t('viewsCount')}</div>
                                <div className="text-[14px] mt-3">{t('yourBeautifulOversight')}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* فلش دکوراتیو */}
                <div className='hidden xl:flex absolute right-0 top-40'>
                    <Arrow />
                </div>
            </div>
        </div>
    );
};

export default SecoundContainer;