'use client';

import { ChevronDownIcon } from '@radix-ui/themes';
import { useState, useRef, useEffect } from 'react';
import SearchIcon from '../../Icon/SearchIcon';

const transactionTypes = [
    'خرید', 'فروش', 'اجاره', 'رزرو هتل', 'تور', 'سرمایه‌گذاری',
    'مشارکت', 'پیش‌فروش', 'تهاتر', 'اجاره روزانه', 'اجاره ماهانه',
    'خرید اقساطی', 'فروش اقساطی', 'لیزینگ', 'واگذاری', 'مزایده',
    'مناقصه', 'Swap', 'زمان‌دار', 'کوتاه مدت'
];

const locations = [
    'تهران', 'مشهد', 'اصفهان', 'شیراز', 'تبریز', 'کیش',
    'مازندران', 'گیلان', 'بوشهر', 'بندرعباس', 'رامسر', 'چالوس',
    'کرج', 'قم', 'یزد', 'اهواز', 'سنندج', 'ارومیه', 'زاهدان', 'گرگان',
    'ساری', 'قزوین', 'همدان', 'اردبیل'
];

const sortOptions = [
    'جدیدترین', 'ارزان‌ترین', 'گران‌ترین', 'بالاترین امتیاز',
    'محبوب‌ترین', 'نزدیک‌ترین', 'بیشترین تخفیف', 'کمترین قیمت',
    'بیشترین ستاره', 'بیشترین نظر', 'نزدیک به ساحل', 'نزدیک مرکز شهر',
    'با صبحانه', 'با استخر', 'لوکس', 'اقتصادی', 'خانوادگی', 'رومantic',
    'تخفیف‌دار', 'پرامکانات'
];

export default function FilterBar() {
    const [selected1, setSelected1] = useState('نوع معامله');
    const [selected2, setSelected2] = useState('محل مورد نظر');
    const [selected3, setSelected3] = useState('مرتب سازی بر اساس');

    const [searchValue, setSearchValue] = useState('');

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    const dropdownRef1 = useRef<HTMLDivElement>(null);
    const dropdownRef2 = useRef<HTMLDivElement>(null);
    const dropdownRef3 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!dropdownRef1.current?.contains(event.target as Node)) setOpen1(false);
            if (!dropdownRef2.current?.contains(event.target as Node)) setOpen2(false);
            if (!dropdownRef3.current?.contains(event.target as Node)) setOpen3(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const Dropdown = ({
        options,
        selected,
        setSelected,
        isOpen,
        setIsOpen,
        ref
    }: any) => (
        <div className="relative " ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between gap-3 px-5 py-3 border border-[#0887CAB2] rounded-2xl hover:border-blue-500 active:scale-[0.985] transition-all min-w-45 w-full group"
            >
                <span className="text-[#0887CAB2] text-sm font-medium truncate">
                    {selected}
                </span>
                <ChevronDownIcon
                    className={`w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-all ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 max-h-55 overflow-y-auto custom-scroll">
                    {options.map((item: string, index: number) => (
                        <div
                            key={index}
                            onClick={() => {
                                setSelected(item);
                                setIsOpen(false);
                            }}
                            className="px-5 py-3 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="w-full p-3 flex items-center justify-center" dir="ltr">
            <div className="w-312 flex items-center gap-4">

                <div className="flex items-center gap-3 flex-1">
                    <Dropdown
                        options={transactionTypes}
                        selected={selected1}
                        setSelected={setSelected1}
                        isOpen={open1}
                        setIsOpen={setOpen1}
                        ref={dropdownRef1}
                    />

                    <Dropdown
                        options={locations}
                        selected={selected2}
                        setSelected={setSelected2}
                        isOpen={open2}
                        setIsOpen={setOpen2}
                        ref={dropdownRef2}
                    />

                    <Dropdown
                        options={sortOptions}
                        selected={selected3}
                        setSelected={setSelected3}
                        isOpen={open3}
                        setIsOpen={setOpen3}
                        ref={dropdownRef3}
                    />
                </div>

                <div className="flex-1 relative ">
                    <div className="relative">
                        <input
                            dir="rtl"
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="نام هتل، منطقه یا آدرس مورد نظر ..."
                            className="w-full outline-none  border border-[#0887CAB2] rounded-2xl py-3 pl-5 pr-8 text-sm  placeholder:text-[#0887CAB2]"
                        />
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                            <SearchIcon />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}