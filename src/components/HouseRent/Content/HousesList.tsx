"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import RoomIcon from './Icon/RoomIcon';
import MasterIcon from './Icon/MasterIcon';
import CarIcon from './Icon/CarIcon';
import TreeIcon from './Icon/TreeIcon';
// import LocationIcon from './Icon/LocationIcon';
import HouseImage from './Icon/HouseImage';
import { addCommas } from "@persian-tools/persian-tools";
import { Props } from './Hosues';
import Link from 'next/link';
import MobileCard from './MobileCard';
import DesktopCard from './DesktopCard';

const HousesList = ({ houses }: Props) => {
  const t = useTranslations('RealEstate');



  
  return (
    <>
      <div className='hidden lg:flex w-full justify-center'>
        <div className='w-312 flex flex-wrap justify-center xl:justify-between gap-1'>
          {houses.map((house) => {
            const isInvalid = house.isInvalid || false;
            return <DesktopCard key={house.id || Math.random()} house={house} isInvalid={isInvalid} />;
          })}
        </div>
      </div>

      <div className='lg:hidden w-full px-4 py-2 mt-10'>
        {houses.map((house) => {
          const isInvalid = house.isInvalid || false;
          return <MobileCard key={house.id || Math.random()} house={house} isInvalid={isInvalid} />;
        })}
      </div>
    </>
  );
};

export default HousesList;