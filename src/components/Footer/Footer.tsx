import React from 'react'
import SocialW from './Icon/SocialW';
import SocialInsta from './Icon/SocialInsta';
import SocialT from './Icon/SocialT';
import SocialF from './Icon/SocialF';
import SocialYout from './Icon/SocialYout';
import ArrowLeft from './Icon/ArrowLeft';
import LocationIcon from './Icon/LocationIcon';
import PhoneIcon from './Icon/PhoneIcon';
import EmailIcon from './Icon/EmailIcon';
import LogoF from './Icon/LogoF';
import ArrowUp from './Icon/ArrowUp';
import VectorUp from './Icon/VectorUp';

const Footer = () => {
  return (
    <div className=' relative w-full '>
      <div className='flex items-end w-full h-125 '>

        <div className='w-full h-91.5 rounded-tl-[200px] flex-wrap bg-blue-200 dark:bg-blue-400 flex justify-center items-center '>
          <div className='w-268.75 h-70 flex flex-wrap gap-4 '>
            <div className='w-268.75 h-45  flex justify-between items-center ' >
              <div className='w-167.5 h-45 flex justify-between '>
                <div className='w-48 h-full flex flex-col gap-6 ' dir='rtl'>
                  <div className='w-28.5 h-4.5  text-white '>محلات محبوب</div>
                  <div className='flex flex-col gap-3 '>
                    <div className='flex items-center '>
                      <ArrowLeft />
                      <div className='w-40 h-4 text-white text-[12px] font-normal '>رهن و اجاره ویلا در مازندران</div>
                    </div>
                    <div className='flex items-center '>
                      <ArrowLeft />
                      <div className='w-40 h-4 text-white text-[12px] font-normal '>خرید ویلا در اصفهان</div>
                    </div>
                    <div className='flex items-center '>
                      <ArrowLeft />
                      <div className='w-40 h-4 text-white text-[12px] font-normal '>فروش ویلا در مازندران</div>
                    </div>
                    <div className='flex items-center '>
                      <ArrowLeft />
                      <div className='w-40 h-4 text-white text-[12px] font-normal '>خرید آپارتمان در ساری</div>
                    </div>
                  </div>
                </div>
                <div className='w-46 h-full  flex flex-col gap-6' dir='rtl'>
                  <div className='w-30.5 h-4.5  text-white '>بیشترین جستجو</div>
                  <div className='flex flex-col gap-3 '>
                    <div className='flex items-center '>
                      <ArrowLeft />
                      <div className='w-40 h-4 text-white text-[12px] font-normal '>رهن و اجاره ویلا در مازندران</div>
                    </div>
                    <div className='flex items-center '>
                      <ArrowLeft />
                      <div className='w-40 h-4 text-white text-[12px] font-normal '>خرید ویلا در اصفهان</div>
                    </div>
                    <div className='flex items-center '>
                      <ArrowLeft />
                      <div className='w-40 h-4 text-white text-[12px] font-normal '>فروش ویلا در مازندران</div>
                    </div>
                    <div className='flex items-center '>
                      <ArrowLeft />
                      <div className='w-40 h-4 text-white text-[12px] font-normal '>خرید آپارتمان در ساری</div>
                    </div>
                  </div>
                </div>
                <div className='w-46 h-full  flex flex-col gap-6' dir='rtl'>
                  <div className='w-28.5 h-4.5  text-white '>ارتباط با ما</div>
                  <div className='flex flex-col gap-3 '>
                    <div className='flex items-center '>
                      <LocationIcon />
                      <div className='w-40 h-11 text-white text-[12px] font-normal '>مازندران _ ساری _ دودانگه شهر ...</div>
                    </div>
                    <div className='flex items-center '>
                      <PhoneIcon />
                      <div className='w-40 h-4 text-white text-[12px] font-normal '>09112568987</div>
                    </div>
                    <div className='flex items-center '>
                      <EmailIcon />
                      <div className='w-40 h-4 text-white text-[12px] font-normal '>exampel@gmail.com</div>
                    </div>

                  </div>
                </div>
              </div>
              <div className='w-77.25 h-35.75  text-white'>
                <div className='flex justify-end '>
                  <LogoF />
                </div>
                <div className='w-77.75 h-18.75 text-[14px] text-[#F5F5F5] ' dir='rtl'>
                  با ما هر قدم به سمت خانه‌تان را با
                  اطمینان و آرامش طی کنید،
                  زیرا ما به شما در انتخابی هوشمندانه کمک می‌کنیم.
                </div>
              </div>

            </div>
            <div className='w-269 h-10 text-white flex justify-between '>
              <div className='w-104.25 h-10 flex justify-between'>
                <button className='w-25 h-10 bg-[#F5F5F5] rounded-lg hover:bg-[#F5F5F5D9] cursor-pointer '>
                  <p className='text-black ' >ارسال</p>
                </button>
                <input
                  type='email'
                  placeholder='ایمیلت رو وارد کن'
                  className='w-75 h-10 border-2 border-white text-[13px] p-3.5 rounded-lg ' dir='rtl'
                >
                </input>
              </div>
              <div className='w-155 text-[19px]'>در تمام لحظات میتونی با ما در ارتباط باشی پس همین حالا به ما بپیوند</div>
            </div>
          </div>

        </div>

        <div className='absolute right-0 w-32 h-104.75 bg-green-100 rounded-tl-[500px]'>
          <div className='h-full w-full flex  items-center justify-center'>
            <div className='w-6 h-55 flex items-end flex-wrap  '>
              <div className='w-6 h-6  cursor-pointer'>
                <SocialW />
              </div>
              <div className='w-6 h-6  cursor-pointer'>
                <SocialInsta />
              </div>
              <div className='w-6 h-6  cursor-pointer'>
                <SocialT />
              </div>
              <div className='w-6 h-6  cursor-pointer'>
                <SocialF />
              </div>
              <div className='w-6 h-6  cursor-pointer'>
                <SocialYout />
              </div>
            </div>
          </div>
        </div>

    <div className=' absolute top-0 w-27 h-40.5 flex items-center justify-center'>
      <button className='absolute left-7 rounded-2xl bg-white p-3 cursor-pointer '>
        <p className='w-2.5 h-2.5'>
        <ArrowUp />
        </p>
      </button>
      <VectorUp />
    </div>

      </div>


    </div>
  )
}

export default Footer;