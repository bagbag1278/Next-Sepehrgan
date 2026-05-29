'use client'

import * as Slider from '@radix-ui/react-slider'
import { useState } from 'react'

const PriceRange = () => {

    const [value, setValue] = useState([0, 80])

    return (
        <div>

            <div className='flex items-center justify-between mb-6 gap-3'>

                <div
                    className='w-35 h-12 rounded-2xl border border-[#4DB6F2]
                    flex items-center justify-center text-sm'
                >
                    از {value[0]} تومان
                </div>

                <span>-</span>

                <div
                    className='w-35 h-12 rounded-2xl border border-[#4DB6F2]
                    flex items-center justify-center text-sm'
                >
                    تا {value[1]} میلیون تومان
                </div>
            </div>

            <Slider.Root
                className='relative flex items-center select-none touch-none w-full h-5'
                value={value}
                onValueChange={setValue}
                max={100}
                step={1}
            >

                <Slider.Track className='bg-gray-300 relative grow rounded-full h-2'>

                    <Slider.Range className='absolute bg-[#0A66C2] rounded-full h-full' />

                </Slider.Track>

                <Slider.Thumb
                    className='block w-5 h-5 bg-[#0A66C2]
                    rounded-full shadow'
                />

                <Slider.Thumb
                    className='block w-5 h-5 bg-[#0A66C2]
                    rounded-full shadow'
                />

            </Slider.Root>
        </div>
    )
}

export default PriceRange