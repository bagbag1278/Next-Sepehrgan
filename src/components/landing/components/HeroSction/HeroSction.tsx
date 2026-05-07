"use client";

import DarkModeHero from "./HeroFilter/DarkModeHero";
import HeroSctionFilter from "./HeroFilter/HeroSctionFilter";
import FleshRght2 from "./Icon/FleshRght2";
import FleshRight from "./Icon/FleshRight";
import FleshRight3 from "./Icon/FleshRight3";
import Profile1 from "./Icon/Profile1";
import Profile11 from "./Icon/Profile11";
import Profile2 from "./Icon/Profile2";
import Profile22 from "./Icon/Profile22";
import Profile3 from "./Icon/Profile3";
import Profile33 from "./Icon/Profile33";
import Profiles from "./Icon/Profiles";
import Profiless from "./Icon/Profiless";
import Profilesss from "./Icon/Profilesss";
import SwiperComponent from "./Swiper/SwiperComponent";

const HeroSction = () => {
  return (
    <>
      {/* TitelText */}
      <div className="flex justify-center xl:w-full xl:max-w-[1273px] lg:w-full lg:max-w-[1273px] sm:w-[393px] sm:flex sm:justify-start   xl:h-[752px] h-[1052px]  lg:m-auto  relative border ">
        <div className="fixed left-5 top-158 z-50 flex items-center justify-center w-10 h-10 rounded-full dark:bg-[#005EA4] shadow-lg shadow-green-100/25 cursor-pointer">
          <DarkModeHero />
        </div>
        <div className="absolute top-[472px] left-1/2 -translate-x-1/2 flex justify-center z-10">
          {" "}
          <div className="w-[1020px] h-[140px] bg-[#F5F5F5] rounded-tr-[50px] rounded-bl-[50px] rounded-xl relative gap-[22px] flex  z-500 shadow-[8px_0px_20px_rgba(8,135,202,0.30)] hidden lg:block xl:block">
            <div className="flex justify-center w-full   items-start  ">
              <HeroSctionFilter />
            </div>
          </div>
        </div>
        <div className="w-328.25 h-110.5  flex  ">
          {/* Filter */}

          <div className="w-127.5 h-95  flex self-center ">
            <div className=" xl:text-[50px]  lg:text-[50px] sm:text-[32px] font-black leading-17.5 ">
              با ما به <span className="text-green-100 ">خانه‌تان</span>{" "}
              نزدیک‌تر شوید !
              <div className="flex flex-wrap mt-8">
                <div className="flex font-bold leading-2 gap-4">
                  <button className="w-62.5 text-[16px] h-12 rounded-2xl border-2 cursor-pointer bg-blue-100 dark:bg-[#F5F5F5] dark:text-black text-white">
                    با یه کلیک شروع کن !
                  </button>
                  <button className="w-45 h-12 text-[16px] rounded-2xl  cursor-pointer border border-b-blue-100 dark:border-white dark:text-white text-blue-100 hidden lg:block xl:block">
                    درباره رهن کده
                  </button>
                </div>
              </div>
            </div>

            {/* comprof */}
            <div className=" w-71.5 h-29 flex relative left-10">
              <div className="w-14 h-14  rounded-4xl absolute top-1 bg-center ">
                <Profiles />
              </div>
              <div className="w-8 h-8  rounded-4xl absolute top-[40px] right-[75px] ">
                <Profiless />
              </div>
              <div className="w-12 h-12  rounded-4xl  absolute top-[75px] right-[25px] ">
                <Profilesss />
              </div>
            </div>
            <div
              className="absolute flex     bottom-50 -right-75
             flex items-center gap-3
             rotate-90
             whitespace-nowrap"
            
            >
              <span className="text-[12px] font-medium text-[#15977D80] hidden lg:block xl:block">
                اسکرول کن بعدش خوش گلدی
              </span>
              <div className="relative left-1 bottom-2">
                <div className="-rotate-90 -left-5 bottom-4 relative">
                  <FleshRight />
                </div>
                <div className="-rotate-90 absolute top-16">
                  <FleshRght2 />
                </div>
                <div className="-rotate-90 absolute top-9 ">
                  <FleshRight3 />
                </div>
              </div>
            </div>

            {/* Number */}
            <div className="flex w-full justify-end relative top-65 xl:flex xl:w-full xl:justify-end  xl:relative gap-10 sm:hidden lg:block xl:block">
              <div className="w-[522px] h-[79px] dark:text-white flex flex-wrap gap-35   absolute font-bold items-center text-3xl ">
                <div className="">
                  {" "}
                  2625
                  <span className="text-blue-100 dark:text-[#28A5E6] absolute left-130 bottom-11 text-[21px] ">
                    +
                  </span>
                </div>
                <div className="">
                  {" "}
                  266
                  <span className="text-blue-100 dark:text-[#28A5E6] absolute left-78 bottom-11 text-[21px]">
                    +
                  </span>
                  <span className="text-[14px] top-15 left-95 absolute font-medium whitespace-nowrap ">
                    {" "}
                    ملک برای رهن و اجاره{" "}
                  </span>
                  <span className="text-[16px] top-15 left-54 absolute font-medium ">
                    منطقه برای رزرو{" "}
                  </span>
                </div>
                <div className="">
                  {" "}
                  6595
                  <span className="text-blue-100 dark:text-[#28A5E6] absolute left-30   bottom-11 text-[21px]">
                    +
                  </span>
                  <span className="text-[16px] top-15 left-2 absolute font-medium ">
                    رضایت مشتریان ما{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* felesh && dark */}
          <div className="justify-end flex w-full">
            <div className="  ">
              <SwiperComponent />
            </div>

            <div className="relative     left-[15px] top-[162px] hidden lg:block xl:block ">
              <div className="absolute left-15  bottom-70 dark:hidden">
                <Profile1 />
              </div>
              <div className="absolute left-15  bottom-77 dark:block hidden">
                <Profile11 />
              </div>
              <div className="relative bottom-[168px]">
                <div className="absolute z-50 left-173 top-55 dark:hidden">
                  <Profile2 />
                </div>
                <div className="absolute z-50 left-173 top-55 dark:block hidden">
                  <Profile22 />
                </div>
                <div className="absolute z-50 left-182 top-60 dark:hidden">
                  <Profile3 />
                </div>
                <div className="absolute z-50 left-182 top-60 dark:block hidden">
                  <Profile33 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Text */}
    </>
  );
};

export default HeroSction;
