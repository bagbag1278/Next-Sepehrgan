import React from 'react'
import InputsFilter from './InputFilter/InputsFilter'
import SliderFilter from './SliderFilter/SliderFilter'

const FiltersSection = () => {
    

  return (
   <div className='w-full flex flex-wrap justify-center gap-8 '>
        <InputsFilter />
        <SliderFilter />
   </div>
  )
}

export default FiltersSection