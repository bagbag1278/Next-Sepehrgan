"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

const BreadCrumb = () => {
  const t = useTranslations('BreadCrumb');

  const buttonLabels = [
    { title: t('home'), href: "/" },
    { title: t('hotelReserve'), href: "/housereserve" },
    { title: t('mortgageRentApartment'), href: "/housereserve" },
  ];

  const lastButtonTitle = buttonLabels.length > 0 ? buttonLabels[buttonLabels.length - 1].title : null;
  const [activeButton, setActiveButton] = useState<string | null>(lastButtonTitle);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <div className='w-full flex justify-center mt-3.5 px-2 sm:px-4'>
      <div className='flex items-center w-full max-w-312'>
        <div className='flex flex-wrap items-center justify-center gap-1 sm:gap-2 h-auto text-[11px] sm:text-[13px] text-blue-400 dark:text-white'>
          {buttonLabels.map((label, index) => (
            <React.Fragment key={index}>
              <Link
                href={label.href}
                onClick={() => handleButtonClick(label.title)}
                className={`
                  ${activeButton === label.title ? 'text-blue-500 font-bold' : 'text-blue-400 dark:text-white'}
                  px-1.5 sm:px-2 py-1 rounded-md transition-colors duration-200 whitespace-nowrap
                `}
              >
                {label.title}
              </Link>
              {index < buttonLabels.length - 1 && (
                <span className='text-blue-400 dark:text-white text-[11px] sm:text-[13px]'>/</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;