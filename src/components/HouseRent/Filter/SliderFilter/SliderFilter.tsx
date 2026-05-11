'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { categories } from './Categories';





const SliderFilter = () => {
    return (
        <div className="w-full bg-white py-4 border-b border-gray-100">

            <div className="relative max-w-312 mx-auto px-4 overflow-hidden border border-black ">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={16}
                    slidesPerView="auto"
                    navigation={{
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    }}
                    className="category-swiper overflow-visible! border relative border-white "
                >

                    {categories.map((item, index) => (
                        <SwiperSlide
                            key={index}
                            className="shrink-0 w-auto max-w-27.5 cursor-pointer group"
                        >
                            <div className="flex flex-col items-center gap-2 py-2 transition-all">
                                <div >
                                    {item.icon}
                                </div>
                                <span className="text-sm text-gray-70 dark:text-white text-center font-medium group-hover:text-gray-400 transition-colors">
                                    {item.label}
                                </span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button
                    className="swiper-button-prev w-7 h-7 rounded-full bg-white dark:bg-blue-100 p-2
                     transition-all active:scale-95  border border-gray-400 "
                >
                </button>
                <button
                    className="swiper-button-next w-7 h-7 rounded-full p-2 dark:bg-blue-100 bg-white  
                   border border-gray-400 "
                >
                </button>
            </div>
        </div>
    );
}

export default SliderFilter