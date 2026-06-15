"use client";

import Link from 'next/link';
import React, { useState } from 'react';

const BreadCrumb = () => {

    const buttonLabels = [
        { title: "خانه", href: "/" },
        { title: " رزرو هتل ", href: "/housereserve" },
        { title: "رهن و اجاره آپارتمان", href: "/housereserve" },
        { title: "رهن و اجاره آپارتمان ", href: "/housereserve" }
    ];



    const lastButtonTitle =buttonLabels.length > 0 ? buttonLabels[buttonLabels.length - 1].title : null;
    const [activeButton, setActiveButton] = useState<string | null>(lastButtonTitle);


    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName); 
    };


    return (
        <div className='w-full flex justify-center mt-3.5 '>
            <div className='flex items-center w-312'>
                <div className='flex gap-2 items-center  h-5.5 text-[13px] text-blue-400 dark:text-white'>
                    {buttonLabels.map((label, index) => (

                        <React.Fragment key={index}>
                            <Link
                                href={`${label.href}`}
                                onClick={() => handleButtonClick(label.title)}
                                className={`
                                    ${activeButton === label.title ? 'text-blue-500 font-bold' : 'text-blue-400 dark:text-white'}
                                    px-2 py-1 rounded-md transition-colors duration-200
                                `}
                            >
                                {label.title}
                            </Link>
                            {index < buttonLabels.length - 1 && <div>/</div>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BreadCrumb;
