'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useState } from 'react'
import PriceRange from './PriceRange'

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

const propertyTypes = [
    'آپارتمان',
    'ویلا',
    'دفتر',
    'مغازه',
]

const propertyStatus = [
    'فروش',
    'اجاره',
]

const FilterModal = ({ open, setOpen }: Props) => {

    const [selectedType, setSelectedType] = useState('نوع ملک')
    const [selectedStatus, setSelectedStatus] = useState('وضعیت ملک')

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>

            <Dialog.Portal>

                {/* overlay */}
                <Dialog.Overlay
                    className='fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40'
                />

                {/* modal */}
                <Dialog.Content
                    className='fixed z-50 left-1/2 top-1/2
                    -translate-x-1/2 -translate-y-1/2
                    w-91.5 h-110.25
                    rounded-4xl
                    bg-white px-5 py-4 outline-none'
                >

                    {/* header */}
                    <div
                        className='flex justify-between
                        items-center border-b pb-3'
                    >

                        <button
                            className='text-gray-400 text-[13px]'
                        >
                            پاک کردن فیلتر ها
                        </button>

                        <Dialog.Title
                            className='text-[#001B48]
                            font-bold text-[20px]'
                        >
                            فیلتر ها
                        </Dialog.Title>

                    </div>

                    {/* dropdowns */}
                    <div className='mt-4 flex flex-col gap-3'>

                        {/* property type */}
                        <div className="dropdown w-full">

                            <div
                                tabIndex={0}
                                role="button"
                                className='w-full h-12 rounded-2xl
                                border border-[#4DB6F2]
                                px-4 bg-white
                                flex items-center justify-between
                                text-[14px] text-[#001B48]'
                            >

                                <span>{selectedType}</span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>

                            </div>

                            <ul
                                tabIndex={0}
                                className='dropdown-content z-100
                                menu p-2 shadow-lg
                                bg-white rounded-2xl
                                w-full mt-2
                                border border-[#4DB6F2]'
                            >

                                {
                                    propertyTypes.map((item) => (
                                        <li key={item}>

                                            <button
                                                onClick={() => setSelectedType(item)}
                                                className='text-right'
                                            >
                                                {item}
                                            </button>

                                        </li>
                                    ))
                                }

                            </ul>

                        </div>

                        {/* property status */}
                        <div className="dropdown w-full">

                            <div
                                tabIndex={0}
                                role="button"
                                className='w-full h-12 rounded-2xl
                                border border-[#4DB6F2]
                                px-4 bg-white
                                flex items-center justify-between
                                text-[14px] text-[#001B48]'
                            >

                                <span>{selectedStatus}</span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>

                            </div>

                            <ul
                                tabIndex={0}
                                className='dropdown-content z-100
                                menu p-2 shadow-lg
                                bg-white rounded-2xl
                                w-full mt-2
                                border border-[#4DB6F2]'
                            >

                                {
                                    propertyStatus.map((item) => (
                                        <li key={item}>

                                            <button
                                                onClick={() => setSelectedStatus(item)}
                                                className='text-right'
                                            >
                                                {item}
                                            </button>

                                        </li>
                                    ))
                                }

                            </ul>

                        </div>

                    </div>

                    {/* price */}
                    <div className='mt-5'>

                        <h3
                            className='text-[18px]
                            font-bold text-[#001B48]
                            mb-4'
                        >
                            قیمت
                        </h3>

                        <PriceRange />

                    </div>

                    {/* footer */}
                    <div
                        className='absolute bottom-4
                        left-5 right-5 flex gap-3'
                    >

                        <button
                            onClick={() => setOpen(false)}
                            className='flex-1 h-12 rounded-2xl
                            border border-pink-400
                            text-pink-400
                            flex items-center justify-center
                            gap-2 text-sm'
                        >

                            <X size={18} />
                            بستن

                        </button>

                        <button
                            className='flex-1 h-12 rounded-2xl
                            bg-[#02003D]
                            text-white text-sm'
                        >
                            اعمال فیلتر
                        </button>

                    </div>

                </Dialog.Content>

            </Dialog.Portal>

        </Dialog.Root>
    )
}

export default FilterModal