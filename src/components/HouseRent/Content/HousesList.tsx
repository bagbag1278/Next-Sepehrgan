import React from 'react';
import RoomIcon from './Icon/RoomIcon';
import MasterIcon from './Icon/MasterIcon';
import CarIcon from './Icon/CarIcon';
import TreeIcon from './Icon/TreeIcon';
import LocationIcon from './Icon/LocationIcon';
import HouseImage from './Icon/HouseImage';
import { Props } from './Hosues'; 

const HousesList = ({ houses }: Props) => {
  return (
    <div className='w-full flex justify-center'>
      <div className='w-312 flex flex-wrap justify-center xl:justify-between gap-1'>
        {houses.map((house) => ( 
          <div
            className='shadow-2xl  border-gray-500/20 rounded-4xl w-153 h-54 flex flex-wrap items-center my-2 justify-around'
            key={house.id} 
          >
            <div className='w-61.25 h-50'>
              <HouseImage />
            </div>

            <div className="relative w-79.5 h-39 gap-1">
              <div className="w-full h-19 border-b border-[#adadad] px-3 pt-2">
                <div className="text-blue-100 font-bold text-[17px] mb-2">
                  {house.title}
                </div>
                <div className="flex items-center gap-1 text-blue-400 text-[13px]">
                  <LocationIcon />
                  <span>{house.address}</span>
                </div>
              </div>

              <div className="absolute bottom-0 w-full px-3 py-2">
                {/* نمایش داینامیک ویژگی‌ها */}
                <div className="flex justify-between text-[11px] text-gray-700 mb-2">
                  <div className="flex items-center gap-1">
                    <RoomIcon /> <span>{house.rooms} خواب</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MasterIcon /> <span>{house.bathrooms} حمام</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CarIcon /> <span>{house.parking} پارکینگ</span>
                  </div>
                 
                  <div className="flex items-center gap-1">
                    <TreeIcon /> <span>ظرفیت {house.capacity}</span>
                  </div>
                </div>

                <div className='w-full flex flex-row-reverse justify-between'>
                  <button className='w-25 h-8 cursor-pointer rounded-lg border border-[#0887CA80]/50'>
                    <p className='text-[13px] text-[#0887CA80]'>مشاهده ملک</p>
                  </button>
                  <div className="flex gap-1 text-blue-300 text-[15px] font-bold">
                    {house.price}
                    <span>تومان</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HousesList;
