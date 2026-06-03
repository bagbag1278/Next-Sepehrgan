"use client";

import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl';
import RealEstateSlider from './RealEstateSlider'

const BuyAndSellSlider = () => {
    const t = useTranslations('BuyAndSell');
    const [houses, setHouses] = useState([])

    useEffect(() => {
        const getHouses = async () => {
            try {
                const res = await fetch("/api/houses");
                if (!res.ok) {
                    throw new Error("API Error");
                }
                const data = await res.json();
                setHouses(data.houses || data.data || []);
            } catch (error) {
                console.error("Fetch Error:", error);
            }
        };
        getHouses();
    }, []);

    return (
        <div className='h-140 hidden xl:flex flex-wrap justify-center'>
            <div className='w-365 flex justify-center flex-wrap overflow-hidden'>
                <div className='w-300 flex justify-center flex-wrap'>
                    <div className='w-full h-6.25'>
                        <div className='w-146.5' dir='ltr'>
                            <div className='text-blue-200 dark:text-[#28A5E6]'>{t('smartBuyAndSell')}</div>
                        </div>
                    </div>
                    <div className='w-full h-10 flex justify-between'>
                        <div className='w-151 h-10.25 flex justify-end gap-9 items-center'>
                            <div className='border-white'>
                                <div className='text-[20px] font-bold text-blue-400 dark:text-[#F5F5F5]'>{t('buyAndSellRealEstate')}</div>
                            </div>
                            <div className='text-[15px] dark:text-[#adadad] text-[#111111]'>{t('specialOffers')}</div>
                            <div className='text-[15px] dark:text-[#adadad] text-[#111111]'>{t('lowestPrices')}</div>
                        </div>
                        <div className='w-60'>
                            <button className='w-30 h-10 hover:border-2 rounded-xl border border-green-100 cursor-pointer'>
                                <p className='text-green-100 text-[14px]'>{t('viewAll')}</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-300'>
                    <RealEstateSlider houses={houses} />
                </div>
            </div>
        </div>
    )
}

export default BuyAndSellSlider