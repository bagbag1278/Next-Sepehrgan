import React from 'react'
import BreadCrumb from './AddressPage/BreadCrumb'
import Filters from './Filter/FiltersSection'
import Content from './Content/HousesList'
import Pagination from './Content/Pagination/Pagination'

type Props = {
  searchParams?: {
    page?: string
  }
}

const HouseRent = ({ searchParams }: Props) => {
  const currentPage = Math.max(1, Number(searchParams?.page || 1))

  const totalItems = 16
  const itemsPerPage = 10
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <div className='flex justify-center flex-wrap gap-6.5' dir='rtl'>
        <BreadCrumb />
        <Filters />
        <Content currentPage={currentPage} totalPages={totalPages}  />
    </div> 
  )
}

export default HouseRent