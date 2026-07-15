"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
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
    const t = useTranslations('ThirdContainer');

    return (
        <div className='flex w-full justify-center p-4' dir='rtl'>
            <div className='w-full max-w-7xl gap-6 flex flex-col lg:flex-row items-center lg:items-start'>

                <div className='w-full flex flex-col items-center lg:items-start'>

                    {/* عنوان بخش */}
                    <div className='w-full h-15.75 flex flex-wrap justify-center mb-5 mt-4 lg:mt-0'>
                        <div className='w-full h-5 flex items-center justify-center gap-2'>
                            <div className='w-6.25 h-2.75 scale-x-[-1]'>
                                <MountainsSun />
                            </div>
                            <div className='dark:text-[#28A5E6] text-blue-400 text-[14px] text-center'>
                                {t('discoverWithUs')}
                            </div>
                            <div className='w-6.25 h-2.75 flex items-center'>
                                <MountainsSun />
                            </div>
                        </div>
                        <div className='w-full h-8.5 flex justify-center mt-2'>
                            <div className='text-[20px] text-blue-400 dark:text-[#F5F5F5] text-center'>
                                {t('popularVillaAreas')}
                            </div>
                        </div>
                    </div>

                    {/* نسخه دسکتاپ */}
                    <div className='relative hidden lg:flex sm:flex w-full flex-col lg:h-104.75  h-51  lg:flex-row justify-center'>
                        
                  

                       

                        {/* تصاویر سمت راست (دو تا) */}
                        <div className='flex lg:flex-col lg:right-4 relative flex-row justify-center gap-4 h-full'>
                            <div className='cursor-pointer relative w-full h-50.25 rounded-4xl overflow-hidden'>
                                <ImageDef2 />
                                <div className='absolute right-22 top-2 flex gap-1 z-50 text-white'>
                                    <StarIcon size={16} />
                                    <p>4.5</p>
                                </div>
                                <div className='absolute bottom-1 right-32 h-15 flex items-center justify-center flex-nowrap'>
                                    <div className='flex gap-1 h-5'>
                                        <div className='flex text-[12px] text-white/70'>
                                            {t('items')} <p>26</p>
                                        </div>
                                    </div>
                                    <div className='text-[18px] font-bold text-white mr-2'>{t('property3')}</div>
                                </div>
                            </div>
                            <div className='cursor-pointer relative w-full   h-50.25 rounded-4xl overflow-hidden'>
                                <ImageDef3 />
                                <div className='absolute right-22 top-2 flex gap-1 z-50 text-white'>
                                    <StarIcon size={16} />
                                    <p>4.5</p>
                                </div>
                                <div className='absolute bottom-1 right-34 h-15 flex items-center justify-center flex-nowrap'>
                                    <div className='flex gap-1 h-5'>
                                        <div className='flex text-[12px] text-white/70'>
                                            {t('items')} <p>26</p>
                                        </div>
                                    </div>
                                    <div className='text-[18px] font-bold text-white mr-2'>{t('property4')}</div>
                                </div>
                            </div>
                        </div>
                         {/* تصویر وسط */}
                        <div className='cursor-pointer relative hidden lg:block w-220  h-full rounded-4xl  overflow-hidden'>
                            <ImageDef1 />
                            <div className='absolute right-18 top-3 flex gap-1 z-50 text-white'>
                                <StarIcon size={16} />
                                <p>4.5</p>
                            </div>
                            <div className='absolute bottom-1 right-25 h-15 flex items-center justify-center flex-nowrap'>
                                <div className='flex gap-1 h-5'>
                                    <div className='flex text-[12px] text-white/70'>
                                        {t('items')} <p>26</p>
                                    </div>
                                </div>
                                <div className='text-[18px] font-bold text-white mr-2'>{t('property2')}</div>
                            </div>
                        </div>
                              {/* تصویر بزرگ سمت چپ */}
                        <div className='hidden lg:block cursor-pointer relative w-full h-full rounded-4xl overflow-hidden'>
                            <ImageDef />
                            <div className='absolute right-18 top-4 flex  z-50 text-white'>
                                <StarIcon size={16} />
                                <p>4.5</p>
                            </div>
                            <div className='absolute bottom-2 right-3/9 h-15 flex items-center justify-center flex-nowrap'>
                                <div className='flex gap-1 h-5'>
                                    <div className='flex text-[12px] text-white/70'>
                                        {t('items')} <p>26</p>
                                    </div>
                                </div>
                                <div className='text-[18px] font-bold text-white mr-2'>{t('property1')}</div>
                            </div>
                        </div>
                    </div>

                    {/* نسخه موبایل */}
                    <div className='w-90  sm:hidden flex flex-col gap-y-4 '>
                        
                        <div className='relative w-62.5 h-55.75 rounded-4xl lg:mb-0'>
                            <ImageMob1 />
                                <div className='absolute right-18 top-3 flex gap-1 z-50 text-white'>
                                <StarIcon className='relative top-1' size={14} />
                                <p>4.5</p>
                            </div>
                            <div className='absolute bottom-2 right-20 whitespace-nowrap h-15 flex items-center justify-center flex-nowrap'>
                                <div className='flex gap-1 h-6 relative top-1'>
                                    <div className='flex text-[11px]  text-white/70'>
                                        {t('items')} <p>26</p>
                                    </div>
                                </div>
                                <div className='text-[15px] font-bold text-white mr-1'>{t('property1')}</div>
                            </div>
                        </div>
                        <div className='flex justify-center w-full'>
                                    <div className='relative w-full h-100.75 overflow-hidden rounded-4xl  lg:mb-0'>
                            <ImageMob2 />
                            <div className='absolute right-18 top-3 flex gap-1 z-50 text-white'>
                                <StarIcon className='relative top-1' size={14} />
                                <p>4.5</p>
                            </div>
                            <div className='absolute bottom-0.5 right-25 whitespace-nowrap h-15 flex items-center justify-center flex-nowrap'>
                                <div className='flex gap-1 h-5'>
                                    <div className='flex text-[11px] text-white/70 mt-0.5'>
                                        {t('items')} <p>26</p>
                                    </div>
                                </div>
                                <div className='text-[15px] font-bold text-white mr-1'>{t('property2')}</div>
                            </div>
                        </div>
                        </div>
                

                        <div className='relative w-62.5 h-25  rounded-4xl'>
                            <ImageMob3 />
                            <div className='absolute right-18 top-3 flex gap-1 z-50 text-white'>
                                <StarIcon className='relative top-1' size={14} />
                                <p>4.5</p>
                            </div>
                            <div className='absolute bottom-0.5 right-21 whitespace-nowrap h-15 flex items-center justify-center flex-nowrap'>
                                <div className='flex gap-1 h-5'>
                                    <div className='flex text-[11px] text-white/70 mt-0.5'>
                                        {t('items')} <p>26</p>
                                    </div>
                                </div>
                                <div className='text-[15px] font-bold text-white mr-1'>{t('property3')}</div>
                            </div>
                        </div>

                        <div className='relative w-62.5 h-25  rounded-4xl'>
                            <ImageMob4 />
                            <div className='absolute right-18 top-3 flex gap-1 z-50 text-white'>
                                <StarIcon className='relative top-1' size={14} />
                                <p>4.5</p>
                            </div>
                            <div className='absolute bottom-0.5 right-21 whitespace-nowrap h-15 flex items-center justify-center flex-nowrap'>
                                <div className='flex gap-1 h-5'>
                                    <div className='flex text-[11px] mt-0.5 text-white/70'>
                                        {t('items')} <p>26</p>
                                    </div>
                                </div>
                                <div className='text-[15px] font-bold text-white mr-1'>{t('property4')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThirdContainer;