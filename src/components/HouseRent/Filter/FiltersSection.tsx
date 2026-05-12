import React from 'react'
import InputsFilter from './InputFilter/InputsFilter'
import SliderFilter from './SliderFilter/SliderFilter'
import DropDownFilter from './DropDownFilter/DropDownFil'

const FiltersSection = () => {
    

  return (
   <div className='w-full flex flex-wrap justify-center gap-6 '>
        <InputsFilter />
        <SliderFilter />
        <DropDownFilter />
   </div>
  )
}

export default FiltersSection