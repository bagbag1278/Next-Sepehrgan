"use client";

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import RealEstateSlider from './RealEstateSlider';
import Link from 'next/link';

const BuyAndSellSlider = () => {
    const t = useTranslations('BuyAndSellSlider');
    const [houses, setHouses] = useState([]);
    const [error, setError] = useState("");

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ;

    useEffect(() => {
        const getHouses = async () => {
            try {
                const res = await fetch(`${BASE_URL}/houses`);
                const data = await res.json();
                setHouses(data.houses || []);
            } catch (err) {
                console.error("Fetch Error:", err);
                setError(t("errorMessage"));
            }
        };
        getHouses();
    }, [t]);

    if (error) {
        return (
            <div className='w-full flex justify-center items-center h-140'>
                <p className='text-red-500'>{error}</p>
            </div>
        );
    }

    if (houses.length === 0) {
        return (
            <div className='w-full flex justify-center items-center h-140'>
                <p>{t("loading")}</p>
            </div>
        );
    }

    return (
        <div className='h-140 hidden xl:flex flex-wrap justify-center'>
            <div className='w-365 flex justify-center flex-wrap overflow-hidden'>
                <div className='w-300 flex justify-center flex-wrap'>
                    <div className='w-full h-6.25'>
                        <div className='w-146.5' dir='ltr'>
                            <div className='text-blue-200 dark:text-[#28A5E6]'>
                                {t("slogan")}
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-10 flex justify-between'>
                        <div className='w-151 h-10.25 flex justify-end gap-9 items-center'>
                            <div className='border-white'>
                                <div className='text-[20px] font-bold text-blue-400 dark:text-[#F5F5F5]'>
                                    {t("title")}
                                </div>
                            </div>
                            <div className='text-[15px] dark:text-[#adadad] text-[#111111]'>
                                {t("specialOffers")}
                            </div>
                            <div className='text-[15px] dark:text-[#adadad] text-[#111111]'>
                                {t("lowestPrices")}
                            </div>
                        </div>
                        <div className='w-60'>
                            <Link 
                                href={"/houserent"} 
                                className='flex justify-center items-center w-30 h-10 hover:border-2 rounded-xl border border-green-100 cursor-pointer'
                            >
                                <p className='text-green-100 text-[14px]'>
                                    {t("viewAll")}
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='w-300'>
                    <RealEstateSlider houses={houses} />
                </div>
            </div>
        </div>
    );
}

export default BuyAndSellSlider;