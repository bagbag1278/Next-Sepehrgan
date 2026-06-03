import React from 'react';
import RoomIcon from './Icon/RoomIcon';
import MasterIcon from './Icon/MasterIcon';
import CarIcon from './Icon/CarIcon';
import TreeIcon from './Icon/TreeIcon';
import LocationIcon from './Icon/LocationIcon';
import HouseImage from './Icon/HouseImage';

import { Props } from './Hosues';
import Link from 'next/link';

const HousesList = ({ houses }: Props) => {
  return (
    <div className='w-full flex justify-center'>
      <div className='w-312 flex flex-wrap justify-center xl:justify-between gap-1'>
        {houses.map((house) => {
          const isInvalid = house.isInvalid || false;

          const cardClasses = `
            shadow-2xl border-gray-500/20 dark:border dark:border-gray-800 rounded-4xl w-153 h-54 flex flex-wrap items-center my-2 justify-around transition-all duration-300 ease-in-out
            ${isInvalid
              ? 'opacity-50 cursor-not-allowed bg-gray-50 grayscale'
              : 'hover:shadow-lg hover:scale-105 cursor-pointer'
            }
          `;

          // handle klick for notfound Cart=============

          // const handleClick = () => {
          //   if (!isInvalid && house.id) {

          //     console.log(`رفتن به جزئیات خانه با ID: ${house.id}`);
          //   } else {
          //     console.log("این خانه نامعتبر است و قابل کلیک نیست.");
          //   }
          // };


          const priceClasses = `flex gap-1 text-[15px] font-bold
             ${isInvalid
              ? 'text-red-400'
              : 'text-blue-300'
            }`;

          return (
            <div
              className={cardClasses}
              key={house.id || Math.random()}
            // onClick={handleClick}
            >
              <div className='w-61.25 h-50'>
                {house.imageUrl ? (
                  <img src={house.imageUrl} alt={house.title || 'تصویر خانه'} className="w-full h-full object-cover rounded-md" />
                ) : (
                  <HouseImage />
                )}
              </div>

              <div className="relative w-79.5 h-39 gap-1">
                <div className="w-full h-19 border-b border-[#adadad] px-3 pt-2">
                  <div className={`text-[17px] mb-2 font-bold dark:text-gray-400 ${isInvalid ? 'text-gray-600' : 'text-blue-100'}`}>
                    {house.title || 'بدون عنوان'}
                  </div>
                  <div className="flex items-center gap-1 text-[13px]">
                    <LocationIcon />
                    <span className={isInvalid ? 'text-gray-500' : 'text-blue-400'}>
                      {house.address || 'آدرس نامشخص'}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 w-full px-3 py-2">
                  {/* feature Dynamic ======== */}
                  <div className="flex justify-between text-[11px] text-gray-700 dark:text-gray-400 mb-2">
                    <div className="flex items-center gap-1 dark:bg-blue-200 dark:rounded-2xl ">
                      <RoomIcon /> <span>{house.rooms } خواب</span>
                    </div>
                    <div className="flex items-center gap-1 dark:bg-blue-200 dark:rounded-2xl ">
                      <MasterIcon /> <span> {house.bathrooms} حمام</span>
                    </div>
                    <div className="flex items-center gap-1 dark:bg-blue-200 dark:rounded-2xl ">
                      <CarIcon /> <span className='flex'>{house.parking === undefined ? '0' : house.parking === 0 ? '0' : house.parking} پارکینگ</span>
                    </div>
                    <div className="flex items-center gap-1 dark:bg-blue-200 dark:rounded-2xl ">
                      <TreeIcon /> <span>ظرفیت {house.capacity === undefined ? 'نامشخص' : house.capacity}</span>
                    </div>
                  </div>

                  <div className='w-full mt-2 flex items-center flex-row-reverse justify-between'>
                    <Link
                      href={`houserent/MortgageRentDetails/${house.id}`}
                      className='flex items-center justify-center rounded-lg border 
                       border-[#0887CA80]/50  w-25 h-8 hover:border-blue-500/50
                       text-[#0887CA80] hover:text-blue-500/50 '
                    >
                      <p className='text-[13px]'>مشاهده ملک</p>
                    </Link>
                    <div className={priceClasses}>
                      {house.price ? (
                        <>
                          {typeof house.price === 'number' ? house.price.toLocaleString() : house.price}
                          <span>تومان</span>
                        </>
                      ) : (
                        'قیمت نامشخص'
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HousesList;
