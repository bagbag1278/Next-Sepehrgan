import React from 'react'
import MountainsSun from './Icon/ThirdContainer/mountainsSun';
import EcoHouse from './Icon/TopCategories/EcoHouseIcon';
import Store from './Icon/TopCategories/StoreIcon';
import Duplex from './Icon/TopCategories/DuplexIcon';
import Mansion from './Icon/TopCategories/MansionIcon';
import Flood from './Icon/TopCategories/FloodIcon';
import Vector from './Icon/FirstContainer/Vector';

const Landing = () => {
  return (
    <div className=' w-full flex flex-col gap-18 ' dir='rtl'>
      {/* ** Top categories ** */}
      <div className='flex justify-center '>
        <div className='w-full flex justify-center '>
          <div className='max-w-286.75 w-full h-70.75 flex justify-center gap-4.5 flex-wrap '>
            <div className='flex flex-wrap justify-center '>
              <div className='w-full h-6.25 flex gap-2 justify-center'>
                <div className='w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse '>
                  <div className='w-2 h-6.25 text-blue-200 text-[16px] '>؟</div>
                  <div className='w-1.5 h-4.75 text-blue-200 text-[12px]'>؟</div>
                  <div className='w-1 h-3.25 text-blue-200 text-[8px] '>؟</div>
                </div>
                <div className='dark:text-[#28A5E6] text-blue-200 text-[16px]'>به دنبال چه نوع خونه ای هستی هر چی بخوای ما داریم</div>
                <div className='w-6.75 h-6.5 flex gap-0.5 items-center flex-row-reverse'>
                  <div className='w-2 h-6.25 text-blue-200 text-[16px] '>؟</div>
                  <div className='w-1.5 h-4.75 text-blue-200 text-[12px] '>؟</div>
                  <div className='w-1 h-3.25 text-blue-200 text-[8px] '>؟</div>
                </div>
              </div>
              <div className='w-47.25 h-6.25 dark:text-[#F5F5F5] text-blue-400  '>برترین دسته بندی های ما </div>
            </div>
            {/* ** 5items ** */}
            <div className='w-full flex flex-wrap justify-between'>
              {/* ///// */}
              <div
                className='w-39.75 h-40 cursor-pointer not-dark:hover:border dark:hover:bg-slate-950 hover:border-amber-100 p-[14.5px] rounded-2xl '
                style={{
                  filter: "drop-shadow(0px 0px 10px rgba(0, 94, 164, 0.5))"
                }}
              >
                <div className='w-33 h-32  flex flex-wrap justify-center'>
                  <div className='w-full  flex justify-center'>
                    <div className='w-10 h-10  '>
                      <Store />
                    </div>
                  </div>
                  <div className='flex w-full h-20 flex-wrap justify-center gap-2'>
                    <div className=' dark:text-white text-blue-400 text-[18px] font-bold '>مغازه</div>
                    <div className='text-[13px] dark:text-[#adadad] text-blue-400 flex justify-center '>
                      <div className='text-center '>سرمایه گذاری مطمئن،آینده روشن</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ///// */}
              <div className='w-39.75 h-40 cursor-pointer mt-8 dark:hover:bg-slate-950 not-dark::hover:border hover:border-amber-100 p-[14.5px] rounded-2xl '
                style={{
                  filter: "drop-shadow(0px 0px 10px rgba(0, 94, 164, 0.5))"
                }}
              >
                <div className='w-33 h-32  flex flex-wrap justify-center'>
                  <div className='w-full  flex justify-center'>
                    <div className='w-10 h-10 '>
                      <Duplex />
                    </div>
                  </div>
                  <div className='flex w-full  h-20 flex-wrap justify-center gap-2'>
                    <div className=' dark:text-white text-blue-400 text-[18px] font-bold'>آپارتمان</div>
                    <div className='text-[13px] dark:text-[#adadad] text-blue-400 flex justify-center '>
                      <div className='text-center '>طراحی دقیق،کیفیت بی نظیر</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ///// */}
              <div className='w-39.75 h-40 cursor-pointer mt-12 rounded-2xl dark:hover:bg-slate-950 not-dark::hover:border hover:border-amber-100 p-[14.5px]'
                style={{
                  filter: "drop-shadow(0px 0px 10px rgba(0, 94, 164, 0.5))"
                }}
              >
                <div className='w-33 h-32 flex flex-wrap justify-center'>
                  <div className='w-full  flex justify-center'>
                    <div className='w-10 h-10'>
                      <EcoHouse />
                    </div>
                  </div>
                  <div className='flex w-full h-20 flex-wrap justify-center gap-2'>
                    <div className=' dark:text-white text-blue-400 text-[18px] font-bold'>ویلایی</div>
                    <div className='text-[13px] dark:text-[#adadad] text-blue-400 flex justify-center '>
                      <div className='text-center '>ویلای مدرن، زندگی متفاوت</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ///// */}
              <div className='w-39.75 h-40 cursor-pointer  mt-8 dark:hover:bg-slate-950 not-dark::hover:border hover:border-amber-100 p-[14.5px] rounded-2xl '
                style={{
                  filter: "drop-shadow(0px 0px 10px rgba(0, 94, 164, 0.5))"
                }}
              >
                <div className='w-33 h-32  flex flex-wrap justify-center'>
                  <div className='w-full  flex justify-center'>
                    <div className='w-10 h-10  '>
                      <Mansion />
                    </div>
                  </div>
                  <div className='flex w-full h-20 flex-wrap justify-center gap-2'>
                    <div className=' dark:text-white text-blue-400 text-[18px] font-bold'>اداری</div>
                    <div className='text-[13px] dark:text-[#adadad] text-blue-400 flex justify-center '>
                      <div className='text-center '>محل کار رویایی شما فقط با ما</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ///// */}
              <div className='w-39.75 h-40 cursor-pointer  dark:hover:bg-slate-950 not-dark::hover:border hover:border-amber-100 p-[14.5px] rounded-2xl'
                style={{
                  filter: "drop-shadow(0px 0px 10px rgba(0, 94, 164, 0.5))"
                }}
              >
                <div className='w-33 h-32 flex flex-wrap justify-center'>
                  <div className='w-full  flex justify-center'>
                    <div className='w-10 h-10  '>
                      <Flood />
                    </div>
                  </div>
                  <div className='flex w-full h-20 flex-wrap justify-center gap-2'>
                    <div className=' dark:text-white text-blue-400 text-[18px] font-bold'>استخر دار</div>
                    <div className='text-[13px] dark:text-[#adadad] text-blue-400 flex justify-center '>
                      <div className='text-center '>خانه ای فراتر از تصور شما</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* **** buy and sell sliedr **** */}
      <div className='flex justify-center '>
        <div className='w-340 h-125.25 border flex flex-wrap justify-center  '>
          <div className='w-full h-20 flex flex-wrap border '>

            {/* above the slider  */}
            <div className='w-full h-6.25 border'>
              <div className='text-blue-200 dark:text-[#28A5E6] '>خرید و فروش هوشمند، با بهترین پیشنهادات و قیمت‌های بی‌نظیر!</div>
            </div>
            {/* above the slider &&& secound */}
            <div className='w-full h-10 flex justify-between '>
              <div className='w-121.75 h-10.25  flex justify-between items-center gap-1 border'>
                {/* ***** Title and line Image ***** */}
                <div>
                  <div className='text-[20px] font-bold text-blue-400 dark:text-[#F5F5F5] '>خرید و فروش ملک</div>
                  {/* add $$$$$ */}
                </div>
                <div className='text-[15px] dark:text-[#adadad] '>پیشنهادات ویژه</div>
                <div className='text-[15px] dark:text-[]'>پایین ترین قیمت ها</div>
              </div>

              {/* *** view more button  *** */}
              <div className='w-60'>
                <button className='w-30 h-10 hover:border-2 rounded-xl border border-green-100 cursor-pointer ' >
                  <p className='text-green-100 text-[14px] '>مشاهده همه</p>
                </button>
              </div>
            </div>

          </div>
          {/* *** SliderShow ***  */}
          <div className='w-full h-97 border flex' >
            <div className='w-full h-95 border border-amber-500 flex items-center '>

            </div>
          </div>
        </div>
      </div>
      {/* *** container ***  */}
      <div className=' w-full flex justify-center '>
        <div className='w-330.75 h-115.5 relative border-white border '>
          {/* ///// */}
          <div className='w-330.75 h-115.5 flex items-start  '>

            <div className='w-90 h-88 flex items-end '>
              <div className='flex flex-wrap justify-center h-80 w-90 '>
                <div className='border flex flex-wrap justify-center h-14 ' >
                  <div className='flex w-62 h-7  gap-1 '>
                    <div className='w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse '>
                      <div className='w-2 h-6.25 text-blue-200 text-[16px] '>؟</div>
                      <div className='w-1.5 h-4.75 text-blue-200 text-[12px] '>؟</div>
                      <div className='w-1 h-3.25 text-blue-200 text-[8px] '>؟</div>
                    </div>
                    <div className='w-58.5 h-5.5 dark:text-[#28A5E6] text-[14px] text-blue-200 '>بومگردی نوین خاطرات جاودان</div>
                    <div className='w-6.75 h-6.5 flex gap-0.5 items-center flex-row-reverse '>
                      <div className='w-2 h-6.25 text-blue-200 text-[16px] '>؟</div>
                      <div className='w-1.5 h-4.75 text-blue-200 text-[12px] '>؟</div>
                      <div className='w-1 h-3.25 text-blue-200 text-[8px] '>؟</div>
                    </div>
                  </div>
                  <div className=' dark:text-[#F5F5F5] text-[20px] font-bold text-blue-400 '>جدید ترین بومگردی ها</div>
                </div>
                <div className='w-85.5 h-17 text-center text-[#F5F5F5D9] '>بهترین بوم‌گردی‌ها در انتظار شماست؛ بیایید با هم به دنیای سبز سفر کنیم و از زیبایی‌های طبیعت لذت ببریم!</div>
                <button className='w-30 h-10 hover:border-2 rounded-xl border border-green-100 cursor-pointer ' >
                  <p className='text-green-100 text-[14px] '>مشاهده همه</p>
                </button>
              </div>
            </div>

            <div className="flex gap-4 items-center flex-row-reverse">

              <div className="flex flex-col gap-4">
                <div className="w-171.25 h-53.75 rounded-2xl overflow-hidden bg-slate-700"> بالا بزرگ</div>
                <div className="flex gap-4">
                  <div className="w-84 h-55.75 rounded-2xl overflow-hidden bg-slate-700"> پایین چپ </div>
                  <div className="w-84 h-55.75 rounded-2xl overflow-hidden bg-slate-700"> پایین وسط </div>
                </div>
              </div>
              <div className="w-64.25 h-113.5 rounded-2xl overflow-hidden bg-slate-700 z-50"> راست بلند </div>

            </div>

          </div>
          {/* ///// */}
          <div className=' absolute right-30 top-77 rotate-[20px] rotate-x-3  '>
            <Vector />
          </div>

        </div>
      </div>

      {/* **** secound container **** */}
      <div className='w-full flex justify-center'>
        <div className='w-312 h-125 border border-white '
          style={{
            background: "linear-gradient(180deg, #121212 0%, rgba(4, 38, 55, 0.5) 49.65%, #121212 100%)",
          }}
        >
          <div className='w-295 h-full border border-white flex flex-wrap items-center justify-between gap-0.5 '>

            <div className='w-123.75 h-57 border border-white flex flex-wrap '>
              <div className='w-46.75 h-15 border border-white '>
                <div className='w-46 h-5.25 text-[13px] text-blue-300 '>سفر به طبیعت، با عشق و اعتماد !  </div>
                <div className='w-31.5 h-7.75 text-[13px] text-blue-300 '>معرفی رهن کده</div>
              </div>
            </div>
            <div className='w-115.25 h-115 border border-white '></div>
          </div>
        </div>
      </div>
      {/* ///////// */}

      {/* *** third container *** */}
      <div className='flex w-full justify-center '>

        <div className='w-312 h-126.75 border border-white gap-6 '>
          <div className='w-full h-15.75 flex flex-wrap justify-center mb-5 '>
            <div className='w-86.25 h-5 flex items-center gap-2'>
              <div className='w-6.25 h-2.75 '>
                < MountainsSun />
              </div>
              <div className='dark:text-[#28A5E6] text-blue-400 text-[14px]'>جدید ترین ها را با ما کشف کنید لذت ببرید</div>
              <div className='w-6.25 h-2.75 flex items-center scale-x-[-1] '>
                < MountainsSun />
              </div>
            </div>
            <div className='w-250.5 h-8.5 flex justify-center '>
              <div className='w-50.5 h-full text-[20px] text-blue-400 dark:text-[#F5F5F5] '>مناطق محبوب ویلایی</div>
            </div>
          </div>
          <div className='w-full h-105 flex gap-5 border border-white '>
            <div className='h-full w-[384px] flex flex-col gap-5 '>
              <div className='w-full h-50.25 bg-gray-500 rounded-4xl '></div>
              <div className='w-full h-50.25 bg-gray-500 rounded-4xl '></div>
            </div>
            <div className='w-72.5 h-104.75 rounded-4xl  bg-gray-500 '></div>
            <div className='w-135.5 h-104.75 bg-gray-500 rounded-4xl '></div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Landing;
