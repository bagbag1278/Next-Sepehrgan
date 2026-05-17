'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { usePathname, useSearchParams } from 'next/navigation'

// setting ****
const Pagination = ({ currentPage, totalPages }: { currentPage: number; totalPages: number }) => {
    const pathname = usePathname()
    const searchParams = new URLSearchParams(useSearchParams().toString())

    const createPageLink = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', String(page))
        return `${pathname}?${params.toString()}`
    }

    return (
        <div className="w-full max-w-xl mx-auto p-4">
            <Swiper
                slidesPerView={7}
                spaceBetween={10}
                centeredSlides={true}
                onSlideChange={(swiper) => {
                    const page = swiper.activeIndex + 1
                }}
                initialSlide={currentPage - 1}
            >
                {Array.from({ length: totalPages }, (_, i) => {
                    const page = i + 1
                    return (
                        <SwiperSlide key={page}>
                            <a
                                href={createPageLink(page)}
                                className={`block px-4 py-2 rounded-full border transition
                  ${page === currentPage ? 'bg-blue-600 text-white font-semibold' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                            >
                                {page}
                            </a>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default Pagination