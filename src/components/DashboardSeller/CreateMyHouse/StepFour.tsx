import { Plus } from 'lucide-react'
import React from 'react'

const StepFour = () => {
  return (
    <div className='flex flex-wrap'>
      {/* header */}
      <div className='w-full h-8 mb-4 '>
        <div className='flex  text-blue-900 dark:text-blue-300 '>
          <span className='text-blue-500 ml-1 '>یک تصویر بهتر از هزار کلمه</span>

          <div>
            با قرار دادن عکس شانس دیده شدن ملک‌تان را ۵ برابر کنید.
          </div>
        </div>
      </div>
      {/* Api Post Image =  */}
      <div className='w-187.5 flex gap-8 '>
        <label
          className=" w-64 h-72 rounded-4xl border-2 border-dashed border-blue-400    
          flex flex-col items-center justify-center gap-4 cursor-pointer
           transition-all
          hover:bg-blue-50"
        >
          <input
            type="file"
            className="hidden"
          />

          <Plus
            size={60}
            strokeWidth={1.5}
            className="text-blue-500"
          />

          <span className="text-blue-600 text-2xl font-medium">
            افزودن عکس
          </span>

        </label>
      </div>
    </div>
  )
}

export default StepFour