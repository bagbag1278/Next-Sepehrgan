import React from 'react'
import RoomIcon from './Icon/RoomIcon'
import MasterIcon from './Icon/MasterIcon'
import CarIcon from './Icon/CarIcon'
import TreeIcon from './Icon/TreeIcon'
import LocationIcon from './Icon/LocationIcon'
import HouseImage from './Icon/HouseImage'

const ContentHR = () => {

    const InfoHouse = [
        { title: "", place: "", image: "", point: "", price: "", infokh: "", infoH: "", infoCar: "", infolast: "", },
        { title: "", place: "", image: "", point: "", price: "", infokh: "", infoH: "", infoCar: "", infolast: "", },
        { title: "", place: "", image: "", point: "", price: "", infokh: "", infoH: "", infoCar: "", infolast: "", },
    ]

    return (
        <div className='w-full flex justify-center border border-white '>
            <div className='w-312 border h-100 flex flex-wrap gap-8'>

                <div className='w-153 h-54 flex flex-wrap items-center justify-around border '>
                        {/* Main Image $$$$$ */}
                        <div className='w-61.25 h-50 '>
                            <HouseImage />
                        </div>
                    <div className="relative w-79.5 h-39 border gap-1">
                        <div className="w-full h-19 border-b border-[#adadad] px-3 pt-2">
                            <div className="text-blue-100 font-bold text-[17px] mb-2">
                                ساختمان البرز
                            </div>
                            <div className="flex items-center gap-1 text-blue-400 text-[13px]">
                                <LocationIcon />
                                <span>
                                    ساری کنار کناره ساری
                                </span>
                            </div>
                        </div>

                        {/* villa information $$$$ */}
                        <div className="absolute bottom-0 w-full px-3 py-2">
                            <div className="flex justify-between text-[11px] text-gray-700 mb-2">
                                <div className="flex items-center gap-1">
                                    <RoomIcon /> <span>۲ خواب</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MasterIcon /> <span>۱ حمام</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <CarIcon /> <span>پارکینگ</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <TreeIcon /> <span>حیاط</span>
                                </div>
                            </div>
                            <div className='w-full flex flex-row-reverse justify-between '>
                                <div className='w-25 h-8 border border-[#0887CA80]/50 text-[13px] text-[0887CA80]/50'>
                                    <p>مشاهده ملک</p>
                                </div>
                            <div className="text-blue-300 text-[15px] font-bold">
                                خیلی گران
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ContentHR