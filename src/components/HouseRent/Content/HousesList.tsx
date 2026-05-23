import React from 'react'
import RoomIcon from './Icon/RoomIcon'
import MasterIcon from './Icon/MasterIcon'
import CarIcon from './Icon/CarIcon'
import TreeIcon from './Icon/TreeIcon'
import LocationIcon from './Icon/LocationIcon'
import HouseImage from './Icon/HouseImage'

interface House {
  id: number;
  title: string;
  address: string;
  price: string;
  photos?: string[] | null;
  tags?: string[];
  rooms?: number;
  bathrooms?: number;
  parking?: number;
  capacity?: number;
}

interface Props {
  houses: House[];
}


const HousesList = ({ houses }: Props) => {

  return (
    <div className='w-full flex justify-center'>
      <div className='w-312 flex flex-wrap justify-between gap-1'>
        {houses.map((items, idx) => (
          <div
            className='shadow-2xl border border-gray-500/20  rounded-4xl w-153 h-54 flex flex-wrap items-center my-2 justify-around'
            key={idx}
          >
            <div className='w-61.25 h-50'>
              <HouseImage />
            </div>

            <div className="relative w-79.5 h-39 gap-1">
              <div className="w-full h-19 border-b border-[#adadad] px-3 pt-2">
                <div className="text-blue-100 font-bold text-[17px] mb-2">
                  {items.title}
                </div>
                <div className="flex items-center gap-1 text-blue-400 text-[13px]">
                  <LocationIcon />
                  <span>{items.address}</span>
                </div>
              </div>

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

                <div className='w-full flex flex-row-reverse justify-between'>
                  {/* use {id} for detail &&&&&&&&&&& */}
                  <button className='w-25 h-8 cursor-pointer rounded-lg border border-[#0887CA80]/50'>
                    <p className='text-[13px] text-[#0887CA80]'>مشاهده ملک</p>
                  </button>
                  <div className="flex gap-1 text-blue-300 text-[15px] font-bold">
                    {items.price}
                    <div>تومان</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* pagination ====/ */}
        <div className="w-full mt-6 border border-pink-500">
        </div>
      </div>
    </div>
  )
}

export default HousesList


// const handlePrevious = () => {
//         if (currentPage > 1) {
//             onPageChange(currentPage - 1);
//         }
//     };

//     const handleNext = () => {
//         if (currentPage < totalPages) {
//             onPageChange(currentPage + 1);
//         }
//     };

//  <button
//                   key={page}
//                   onClick={() => onPageChange(page)}
//                   className={`px-4 py-2 rounded-md border ${currentPage === page
//                       ? 'bg-blue-500 text-white font-bold'
//                       : 'bg-white text-black hover:bg-gray-100'
//                       }`}
//               >
//                   {page}
//               </button>