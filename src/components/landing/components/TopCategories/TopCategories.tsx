"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import Mansion from '../../Icon/TopCategories/MansionIcon';
import Flood from '../../Icon/TopCategories/FloodIcon';
import Store from '../../Icon/TopCategories/StoreIcon';
import Duplex from '../../Icon/TopCategories/DuplexIcon';
import EcoHouse from '../../Icon/TopCategories/EcoHouseIcon';
import StoreDarkIcon from '../../Icon/TopCategories/StoreDarkIcon';
import EcoHouseDarkIcon from '../../Icon/TopCategories/EcoHouseDarkIcon';
import DuplexDarkIcon from '../../Icon/TopCategories/DuplexDarkIcon';
import MansionDarkIcon from '../../Icon/TopCategories/MansionDarkIcon';
import FloodDarkIcon from '../../Icon/TopCategories/FloodDarkIcon';
import Link from 'next/link';

const TopCategories = () => {
  const t = useTranslations('TopCategories');

  const categories = [
    {
      id: 1,
      name: 'store',
      title: t('store'),
      desc: t('storeDesc'),
      href: '/houserent?category=store',
      darkIcon: Store,
      lightIcon: StoreDarkIcon,
      marginTop: 'mt-0',
    },
    {
      id: 2,
      name: 'apartment',
      title: t('apartment'),
      desc: t('apartmentDesc'),
      href: '/houserent?category=apartment',
      darkIcon: Duplex,
      lightIcon: EcoHouseDarkIcon,
      marginTop: 'lg:mt-8',
    },
    {
      id: 3,
      name: 'villa',
      title: t('villa'),
      desc: t('villaDesc'),
      href: '/houserent?category=villa',
      darkIcon: EcoHouse,
      lightIcon: DuplexDarkIcon,
      marginTop: 'lg:mt-12',
    },
    {
      id: 4,
      name: 'office',
      title: t('office'),
      desc: t('officeDesc'),
      href: '/houserent?category=office',
      darkIcon: Mansion,
      lightIcon: MansionDarkIcon,
      marginTop: 'lg:mt-8',
    },
    {
      id: 5,
      name: 'pool',
      title: t('pool'),
      desc: t('poolDesc'),
      href: '/houserent?category=pool',
      darkIcon: Flood,
      lightIcon: FloodDarkIcon,
      marginTop: 'mt-0',
      hiddenOnMobile: true,
    },
  ];

  return (
    <div className='flex justify-between'>
      <div className='w-full flex justify-center'>
        <div className='max-w-286.75 w-full flex justify-center gap-4.5 flex-wrap'>
          <div className='w-full flex flex-wrap justify-center'>
            <div className='w-full h-6.25 hidden sm:flex gap-2 justify-center'>
              <div className='w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse'>
                <div className='w-2 h-6.25 text-blue-200 text-[16px]'>؟</div>
                <div className='w-1.5 h-4.75 text-blue-200 text-[12px]'>؟</div>
                <div className='w-1 h-3.25 text-blue-200 text-[8px]'>؟</div>
              </div>
              <div className='dark:text-[#28A5E6] text-blue-200 text-[16px]'>{t('lookingFor')}</div>
              <div className='w-6.75 h-6.5 flex gap-0.5 items-center flex-row-reverse'>
                <div className='w-2 h-6.25 text-blue-200 text-[16px]'>؟</div>
                <div className='w-1.5 h-4.75 text-blue-200 text-[12px]'>؟</div>
                <div className='w-1 h-3.25 text-blue-200 text-[8px]'>؟</div>
              </div>
            </div>
            <div className='w-47.25 h-6.25 dark:text-[#F5F5F5] text-blue-400 text-center'>
              {t('topCategories')}
            </div>
          </div>

          <div className='lg:w-full lg:h-auto h-90.5 w-85.5 flex flex-wrap justify-between gap-4'>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className={`
                  w-39.75 h-40 cursor-pointer 
                  hover:border hover:border-blue-500/20 
                  dark:hover:bg-slate-950 p-[14.5px] rounded-2xl 
                  transition-all duration-300
                  ${category.marginTop}
                  ${category.hiddenOnMobile ? 'hidden lg:flex' : 'flex'}
                `}
                style={{ filter: "drop-shadow(0px 0px 10px rgba(0, 94, 164, 0.5))" }}
              >
                <div className='w-33 h-32 flex flex-wrap justify-center'>
                  <div className='w-full flex justify-center'>
                    <div className='dark:block hidden w-10 h-10'>
                      <category.darkIcon />
                    </div>
                    <div className='not-dark:block hidden w-10 h-10'>
                      <category.lightIcon />
                    </div>
                  </div>
                  <div className='flex w-full h-20 flex-wrap justify-center gap-2'>
                    <div className='dark:text-white text-blue-400 text-[18px] font-bold'>
                      {category.title}
                    </div>
                    <div className='text-[13px] dark:text-[#adadad] text-blue-400 flex justify-center'>
                      <div className='text-center'>{category.desc}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCategories;