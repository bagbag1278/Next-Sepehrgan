// app/(dashboard)/seller/page.tsx
import { CheckCircle2, CircleIcon, MinusCircle, MoreVertical, XCircle } from 'lucide-react';
import React, { ReactNode } from 'react';
import CirclesIcon from '../Icon/CirclesIcon';
import ClickBoardIco from '../Icon/ClickBoardIco';
import CalenderIco from '../Icon/CalenderIco';
import LoadingIco from '../Icon/LoadingIco';
import PlaceholderIco from '../Icon/PlaceholderIco';

const stats = [
    { label: 'کل املاک', value: '۵', icon: <ClickBoardIco /> },
    { label: 'رزرو های فعال', value: '۸', icon: <CalenderIco /> },
    { label: 'رزرو های انتظار', value: '۹', icon: <LoadingIco /> },
    { label: 'بازدید ها', value: '۲', icon: <PlaceholderIco /> },
];

interface SmallModalProps {
    children: ReactNode; 
    triggerContent?: ReactNode; 
    modalWidth?: string;
    modalHeight?: string;
    modalTop?: string;
    modalLeft?: string;
    modalMarginTop?: string;
}

const MainPage = () => {
    return (
        <div className='flex w-156.5 flex-wrap gap-10 '>

            <div className='w-full flex gap-1' >
                <div className='w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse  scale-x-[-1]'>
                    <CirclesIcon />
                </div>
                <div className='text-blue-200 text-[18px] '>داشبورد</div>
                <div className='w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse'>
                    <CirclesIcon />
                </div>
            </div>
            <div className="flex flex-wrap w-156.5 gap-y-1 space-y-4">

                <div className="flex flex-row-reverse  gap-4.75 ">
                    <div className="w-25 h-30 border border-blue-200 rounded-2xl flex flex-col items-center justify-center bg-gray-50 text-blue-800 cursor-pointer hover:bg-blue-50">
                        <span className="text-xl">↗</span>
                        <span className="text-xs mt-2 font-bold">مشاهده همه</span>
                        <span className="text-sm font-bold">+۵۰</span>
                    </div>

                    {stats.map((item, idx) => (
                        <div
                            key={idx}
                            className={`w-27.5 h-30 border rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all `}
                        >
                            <span className="text-2xl text-blue-900 mb-2">{item.icon}</span>
                            <span className="text-xs text-gray-600 mb-1">{item.label}</span>
                            <span className="text-2xl font-bold text-blue-900">{item.value}</span>
                        </div>
                    ))}
                </div>

                {/* جدول */}
                <div className="w-full h-84 bg-gray-50/50 rounded-2xl border border-gray-100 ">
                    {/* Header */}
                    <div className="flex justify-around bg-white mx-2  rounded-xl shadow-sm border border-gray-100 px-6 py-4 text-gray-500 text-sm">
                        <span>نام اقامتگاه</span>
                        <span>تاریخ رزرو</span>
                        <span>زمان رزرو</span>
                        <span>قیمت</span>
                        <span>وضعیت</span>
                    </div>

                    <div className='h-70 overflow-y-scroll hide-scrollbar overflow-hidden '>

                        {/* Rows */}
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((row) => (
                            <div key={row} className=" flex items-center flex-row-reverse justify-between px-4 py-2 mt-2 bg-white mx-2 mb-4 rounded-xl shadow-sm border border-gray-100">
                                {/* open module */}
                                <div>
                                    <MoreVertical size={16} className="text-gray-400 cursor-pointer" />
                                </div>


                                <div className="text-green-500">{row === 1 ? <CheckCircle2 /> : row === 2 ? <MinusCircle className="text-orange-400" /> : <XCircle className="text-red-500" />}</div>

                                <span className="text-blue-800 font-medium text-sm">۱,۸۰۰,۰۰۰ تومان</span>
                                <span className="text-sm text-gray-600">۱۲:۳۳</span>
                                <span className="text-sm text-gray-600">۱۲ مرداد ۱۴۰۱</span>

                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden">
                                        <img src="/placeholder.jpg" alt="property" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-sm">هتل سراوان را...</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage; 