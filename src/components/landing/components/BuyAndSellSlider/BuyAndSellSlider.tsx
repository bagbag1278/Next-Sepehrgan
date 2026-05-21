"use client";

import React, { useEffect, useState } from 'react';
import RealEstateSlider from './RealEstateSlider';
import Link from 'next/link';

const BuyAndSellSlider = () => {
    const [houses, setHouses] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const getHouses = async () => {
            try {
                const res = await fetch("http://next.genzuni.website/api/houses");

                const data = await res.json();
                setHouses(data.houses || [] );
            } catch (err) {
                console.error("Fetch Error:", err);

                setError("متأسفانه این بخش در حال حاضر در دسترس نیست. لطفاً بعداً دوباره امتحان کنید.");
            }
        };
        getHouses();
    }, []);

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
                <p>در حال بارگذاری...</p>
            </div>
        );
    }

    return (
        <div className='h-140 hidden xl:flex flex-wrap justify-center'>
            <div className='w-365 flex justify-center flex-wrap overflow-hidden'>
                <div className='w-300 flex justify-center flex-wrap'>
                    {/* above the slider */}
                    <div className='w-full h-6.25'>
                        <div className='w-146.5' dir='ltr'>
                            <div className='text-blue-200 dark:text-[#28A5E6]'>!خرید و فروش هوشمند، با بهترین پیشنهادات و قیمت‌های بی‌نظیر</div>
                        </div>
                    </div>
                    {/* above the slider &&& secound */}
                    <div className='w-full h-10 flex justify-between'>
                        <div className='w-151 h-10.25 flex justify-end gap-9 items-center'>
                            {/* ***** Title and line Image ***** */}
                            <div className='border-white'>
                                <div className='text-[20px] font-bold text-blue-400 dark:text-[#F5F5F5]'>خرید و فروش ملک</div>
                            </div>
                            <div className='text-[15px] dark:text-[#adadad] text-[#111111]'>پیشنهادات ویژه</div>
                            <div className='text-[15px] dark:text-[#adadad] text-[#111111]'>پایین ترین قیمت ها</div>
                        </div>
                        {/* *** view more button  *** */}
                        <div className='w-60'>
                            <Link 
                            href={"/houserent"} 
                            className='flex justify-center items-center w-30 h-10 hover:border-2 rounded-xl border border-green-100 cursor-pointer'
                            >
                                <p className='text-green-100 text-[14px]'>مشاهده همه</p>
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
