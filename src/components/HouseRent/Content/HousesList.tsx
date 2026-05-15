import React from 'react'
import RoomIcon from './Icon/RoomIcon'
import MasterIcon from './Icon/MasterIcon'
import CarIcon from './Icon/CarIcon'
import TreeIcon from './Icon/TreeIcon'
import LocationIcon from './Icon/LocationIcon'
import HouseImage from './Icon/HouseImage'
import Pagination from './Pagination/Pagination'


type HouseItem = {
  title: string
  place: string
  image: string
  point: string
  price: string
  infokh: string
  infoH: string
  infoCar: string
  infolast: string
}

interface Iprops {
    currentPage: number;
  totalPages: number;
}

const HousesList = ({ currentPage, totalPages }: Iprops) => {
  const InfoHouses: HouseItem[] = [
    { title: "خوشتیپ", place: "آمریکا جنب مک دونالد", image: "", point: "", price: "90000450", infokh: "", infoH: "", infoCar: "", infolast: "" },
    { title: "بد ریخت", place: "فرانسه نرسیده به کقوسان", image: "", point: "", price: "200000", infokh: "", infoH: "", infoCar: "", infolast: "" },
    { title: "سگ 1", place: "ساری کنار مرکز جهان", image: "", point: "", price: "بینهات", infokh: "", infoH: "", infoCar: "", infolast: "" },
    { title: "سگ 2", place: "ساری کنار مرکز جهان", image: "", point: "", price: "بینهات", infokh: "", infoH: "", infoCar: "", infolast: "" },
    { title: "سگ 3", place: "ساری کنار مرکز جهان", image: "", point: "", price: "بینهات", infokh: "", infoH: "", infoCar: "", infolast: "" },
    { title: "سگ 4", place: "ساری کنار مرکز جهان", image: "", point: "", price: "بینهات", infokh: "", infoH: "", infoCar: "", infolast: "" },
    { title: "سگ 5", place: "ساری کنار مرکز جهان", image: "", point: "", price: "بینهات", infokh: "", infoH: "", infoCar: "", infolast: "" },
    { title: "سگ 6", place: "ساری کنار مرکز جهان", image: "", point: "", price: "بینهات", infokh: "", infoH: "", infoCar: "", infolast: "" },
    { title: "سگ 7", place: "ساری کنار مرکز جهان", image: "", point: "", price: "بینهات", infokh: "", infoH: "", infoCar: "", infolast: "" },
    { title: "سگ 8", place: "ساری کنار مرکز جهان", image: "", point: "", price: "بینهات", infokh: "", infoH: "", infoCar: "", infolast: "" },
    { title: "سگ 9", place: "ساری کنار مرکز جهان", image: "", point: "", price: "بینهات", infokh: "", infoH: "", infoCar: "", infolast: "" },
    { title: "سگ 10", place: "ساری کنار مرکز جهان", image: "", point: "", price: "بینهات", infokh: "", infoH: "", infoCar: "", infolast: "" },
    { title: "سگ 11", place: "ساری کنار مرکز جهان", image: "", point: "", price: "بینهات", infokh: "", infoH: "", infoCar: "", infolast: "" },
    { title: "سگ 12", place: "ساری کنار مرکز جهان", image: "", point: "", price: "بینهات", infokh: "", infoH: "", infoCar: "", infolast: "" },
    { title: "سگ 13", place: "ساری کنار مرکز جهان", image: "", point: "", price: "بینهات", infokh: "", infoH: "", infoCar: "", infolast: "" },
    { title: "سگ 14", place: "ساری کنار مرکز جهان", image: "", point: "", price: "بینهات", infokh: "", infoH: "", infoCar: "", infolast: "" },
    { title: "سگ 15", place: "ساری کنار مرکز جهان", image: "", point: "", price: "بینهات", infokh: "", infoH: "", infoCar: "", infolast: "" },
    { title: "سگ 16", place: "ساری کنار مرکز جهان", image: "", point: "", price: "بینهات", infokh: "", infoH: "", infoCar: "", infolast: "" },
  ]

  const itemsPerPage = 10
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const visibleHouses = InfoHouses.slice(startIndex, endIndex)

  return (
    <div className='w-full flex justify-center'>
      <div className='w-312 flex flex-wrap justify-between gap-1'>
        {visibleHouses.map((items, idx) => (
          <div
            className='shadow-2xl border border-gray-500/20  rounded-4xl w-153 h-54 flex flex-wrap items-center my-2 justify-around'
            key={idx}
          >
            <div className='w-61.25 h-50'>
              <HouseImage />
            </div>

            <div className="relative w-79.5 h-39 gap-1">
              <div className="w-full h-19 border-b border-[#adadad] px-3 pt-2">
                <div className="text-blue-100 font-bold text-[17px] mb-2">
                  {items.title}
                </div>
                <div className="flex items-center gap-1 text-blue-400 text-[13px]">
                  <LocationIcon />
                  <span>{items.place}</span>
                </div>
              </div>

              <div className="absolute bottom-0 w-full px-3 py-2">
                <div className="flex justify-between text-[11px] text-gray-700 mb-2">
                  <div className="flex items-center gap-1">
                    <RoomIcon /> <span>۲ خواب</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MasterIcon /> <span>۱ حمام</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CarIcon /> <span>پارکینگ</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TreeIcon /> <span>حیاط</span>
                  </div>
                </div>

                <div className='w-full flex flex-row-reverse justify-between'>
                  {/* use {id} for detail &&&&&&&&&&& */}
                  <button className='w-25 h-8 cursor-pointer rounded-lg border border-[#0887CA80]/50'>
                    <p className='text-[13px] text-[#0887CA80]'>مشاهده ملک</p>
                  </button>
                  <div className="flex gap-1 text-blue-300 text-[15px] font-bold">
                    {items.price}
                    <div>تومان</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="w-full mt-6">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  )
}

export default HousesList
