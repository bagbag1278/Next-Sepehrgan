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

  return (
    <div className='flex justify-between'>
      <div className='w-full flex justify-center b'>
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
            <div className='w-47.25 h-6.25 dark:text-[#F5F5F5] text-blue-400'>{t('topCategories')}</div>
          </div>

          <Link
            href={'/houserent'}
            className='lg:w-full lg:h-auto h-90.5 w-85.5 flex flex-wrap justify-between'>
            <div className='w-39.75 h-40 cursor-pointer hover:border hover:border-blue-500/20 dark:hover:bg-slate-950 p-[14.5px] rounded-2xl' style={{ filter: "drop-shadow(0px 0px 10px rgba(0, 94, 164, 0.5))" }}>
              <div className='w-33 h-32 flex flex-wrap justify-center'>
                <div className='w-full flex justify-center'>
                  <div className='not-dark:hidden w-10 h-10'><Store /></div>
                  <div className='hidden not-dark:flex w-10 h-10'><StoreDarkIcon /></div>
                </div>
                <div className='flex w-full h-20 flex-wrap justify-center gap-2'>
                  <div className='dark:text-white text-blue-400 text-[18px] font-bold'>{t('store')}</div>
                  <div className='text-[13px] dark:text-[#adadad] text-blue-400 flex justify-center'>
                    <div className='text-center'>{t('storeDesc')}</div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href={'/houserent'}
              className='w-39.75 h-40 cursor-pointer mt-0 lg:mt-8 hover:border hover:border-blue-500/20 dark:hover:bg-slate-950 p-[14.5px] rounded-2xl' style={{ filter: "drop-shadow(0px 0px 10px rgba(0, 94, 164, 0.5))" }}>
              <div className='w-33 h-32 flex flex-wrap justify-center'>
                <div className='w-full flex justify-center'>
                  <div className='dark:flex hidden w-10 h-10'><Duplex /></div>
                  <div className='not-dark:flex hidden w-10 h-10'><EcoHouseDarkIcon /></div>
                </div>
                <div className='flex w-full h-20 flex-wrap justify-center gap-2'>
                  <div className='dark:text-white text-blue-400 text-[18px] font-bold'>{t('apartment')}</div>
                  <div className='text-[13px] dark:text-[#adadad] text-blue-400 flex justify-center'>
                    <div className='text-center'>{t('apartmentDesc')}</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link
              href={'/houserent'}
              className='w-39.75 h-40 cursor-pointer mt-0 lg:mt-12 rounded-2xl hover:border hover:border-blue-500/20 dark:hover:bg-slate-950 p-[14.5px]' style={{ filter: "drop-shadow(0px 0px 10px rgba(0, 94, 164, 0.5))" }}>
              <div className='w-33 h-32 flex flex-wrap justify-center'>
                <div className='w-full flex justify-center'>
                  <div className='dark:flex hidden w-10 h-10'><EcoHouse /></div>
                  <div className='not-dark:flex hidden w-10 h-10'><DuplexDarkIcon /></div>
                </div>
                <div className='flex w-full h-20 flex-wrap justify-center gap-2'>
                  <div className='dark:text-white text-blue-400 text-[18px] font-bold'>{t('villa')}</div>
                  <div className='text-[13px] dark:text-[#adadad] text-blue-400 flex justify-center'>
                    <div className='text-center'>{t('villaDesc')}</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link
              href={'/houserent'}
              className='w-39.75 h-40 cursor-pointer mt-0 lg:mt-8 dark:hover:bg-slate-950 hover:border hover:border-blue-500/20 p-[14.5px] rounded-2xl' style={{ filter: "drop-shadow(0px 0px 10px rgba(0, 94, 164, 0.5))" }}>
              <div className='w-33 h-32 flex flex-wrap justify-center'>
                <div className='w-full flex justify-center'>
                  <div className='dark:flex hidden w-10 h-10'><Mansion /></div>
                  <div className='not-dark:flex hidden w-10 h-10'><MansionDarkIcon /></div>
                </div>
                <div className='flex w-full h-20 flex-wrap justify-center gap-2'>
                  <div className='dark:text-white text-blue-400 text-[18px] font-bold'>{t('office')}</div>
                  <div className='text-[13px] dark:text-[#adadad] text-blue-400 flex justify-center'>
                    <div className='text-center'>{t('officeDesc')}</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link
              href={'/houserent'}
              className='hidden lg:flex w-39.75 h-40 cursor-pointer dark:hover:bg-slate-950 hover:border hover:border-blue-500/20 p-[14.5px] rounded-2xl' style={{ filter: "drop-shadow(0px 0px 10px rgba(0, 94, 164, 0.5))" }}>
              <div className='w-33 h-32 flex flex-wrap justify-center'>
                <div className='w-full flex justify-center'>
                  <div className='dark:flex hidden w-10 h-10'><Flood /></div>
                  <div className='not-dark:flex hidden w-10 h-10'><FloodDarkIcon /></div>
                </div>
                <div className='flex w-full h-20 flex-wrap justify-center gap-2'>
                  <div className='dark:text-white text-blue-400 text-[18px] font-bold'>{t('pool')}</div>
                  <div className='text-[13px] dark:text-[#adadad] text-blue-400 flex justify-center'>
                    <div className='text-center'>{t('poolDesc')}</div>
                  </div>
                </div>
              </div>
            </Link>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopCategories;