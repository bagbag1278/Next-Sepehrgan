import React from 'react'
import BreadCrumb from './AddressPage/BreadCrumb'
import Filters from './Filter/FiltersSection'
import Content from './Content/ContentHR'

const HouseRent = () => {
  return (
    <div className='flex justify-center flex-wrap gap-6.5' dir='rtl'>
        <BreadCrumb />
        <Filters />
        <Content />
    </div> 
  )
}

export default HouseRent