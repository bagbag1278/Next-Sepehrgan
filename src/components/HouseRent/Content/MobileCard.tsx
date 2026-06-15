"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { addCommas } from "@persian-tools/persian-tools";
import RoomIcon from './Icon/RoomIcon';
import MasterIcon from './Icon/MasterIcon';
import CarIcon from './Icon/CarIcon';
import TreeIcon from './Icon/TreeIcon';
import HouseImage from './Icon/MobileHouse';
import { MapPin } from 'lucide-react';

interface MobileCardProps {
  house: {
    id: number;
    title?: string;
    address?: string;
    imageUrl?: string;
    rooms?: number;
    bathrooms?: number;
    parking?: number;
    capacity?: number;
    price?: number;
    isInvalid?: boolean;
  };
  isInvalid?: boolean;
}

const MobileCard = ({ house, isInvalid = false }: MobileCardProps) => {
  const t = useTranslations('RealEstate');
  const defaultIMG = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR24p63ZARXy6pMmpnlZTAWJL09khwUKwTLWA&s";
  
  return (
    <div className={`
      w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-4
      ${isInvalid ? 'opacity-50 grayscale' : 'hover:shadow-xl transition-all duration-300'}
    `}>
      <div className='w-full h-48 relative'>
        <img 
          src={house.imageUrl || defaultIMG} 
          alt={house.title || t('defaultTitle')} 
          className="w-full h-full object-cover" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultIMG;
          }}
        />
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className={`text-[16px] font-bold mb-1 line-clamp-1 ${isInvalid ? 'text-gray-600 dark:text-gray-500' : 'text-blue-100 dark:text-blue-300'}`}>
            {house.title || t('defaultTitle')}
          </h3>
          <div className="flex items-center gap-1 text-[12px] text-gray-500 dark:text-gray-400">
            <MapPin size={16}  />
            <span className="line-clamp-1 flex-1">{house.address || t('noAddress')}</span>
          </div>
        </div>

        
        <div className="flex flex-nowrap overflow-x-auto gap-2 mb-4 text-[11px] text-gray-700 dark:text-gray-300 pb-1 scrollbar-thin">
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-xl whitespace-nowrap flex-shrink-0">
            <RoomIcon /> 
            <span>{house.rooms || 0} {t('rooms')}</span>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-xl whitespace-nowrap flex-shrink-0">
            <MasterIcon  /> 
            <span>{house.bathrooms || 0} {t('bathrooms')}</span>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-xl whitespace-nowrap flex-shrink-0">
            <CarIcon /> 
            <span>{house.parking !== undefined ? house.parking : 0} {t('parking')}</span>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-xl whitespace-nowrap flex-shrink-0">
            <TreeIcon  /> 
            <span>{t('capacity')} {house.capacity !== undefined ? house.capacity : t('unknown')}</span>
          </div>
        </div>

        <div className='flex items-center justify-between gap-2'>
          <Link
            href={`houserent/MortgageRentDetails/${house.id}`}
            className='flex items-center justify-center rounded-lg border border-blue-300/50 px-3 py-1.5 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex-shrink-0'
          >
            <p className='text-[11px] md:text-[12px] text-blue-400 whitespace-nowrap'>{t('viewDetails')}</p>
          </Link>
          <div className={`flex gap-1 text-[13px] md:text-[14px] font-bold flex-wrap justify-end ${isInvalid ? 'text-red-400' : 'text-blue-300'}`}>
            {house.price ? (
              <>
                <span className="whitespace-nowrap">{addCommas(house.price)}</span>
                <span className="whitespace-nowrap">{t('currency')}</span>
              </>
            ) : (
              <span className="whitespace-nowrap text-xs">{t('priceUnknown')}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCard;