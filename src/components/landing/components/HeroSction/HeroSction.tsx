"use client";

import DarkModeHero from "./HeroFilter/DarkModeHero";
import ModalSearchRes from "./HeroFilter/FliterRes/ModalSaerchRes";
import Frame from "./HeroFilter/Frame";
import HeroSctionFilter from "./HeroFilter/HeroSctionFilter";
import FelshRes from "./Icon/Flash/FelshRes";
import FleshLeftRes from "./Icon/Flash/FleshLeftRes";
import FleshRght2 from "./Icon/Flash/FleshRght2";
import FleshRight from "./Icon/Flash/FleshRight";
import FleshRight3 from "./Icon/Flash/FleshRight3";
import FleshRightRes from "./Icon/Flash/FleshRightRes";
import Profile1 from "./Icon/Flash/Profile1";
import Profile11 from "./Icon/Flash/Profile11";
import Profile2 from "./Icon/Flash/Profile2";
import Profile22 from "./Icon/Flash/Profile22";
import Profile3 from "./Icon/Flash/Profile3";
import Profile33 from "./Icon/Flash/Profile33";
import Profiles from "./Icon/Profile/Profiles";
import Profiless from "./Icon/Profile/Profiless";
import Profilesss from "./Icon/Profile/Profilesss";
import SwiperComponent from "./Swiper/SwiperComponent";
import SwiperResponsiv from "./Swiper/SwiperResponsive/SwiperResponsive";
import Link from "next/link";

const HeroSction = () => {
  return (
    <>
      {/* TitelText */}
      <div className="flex justify-center  xl:w-full xl:max-w-318.25 lg:w-full   max-[1023]:w-11/12 max-[1023]:mr-80 max-[923]:mr-70 max-[823]:mr-55 max-[723]:mr-45 pr-4 max-[640]:mr-2   lg:max-w-318.25     xl:h-188 h-263  lg:m-auto  relative  ">
        <div className="fixed left-5 top-158 z-50 flex items-center justify-center w-10 h-10 rounded-full dark:bg-blue-200 shadow-lg shadow-green-100/25 cursor-pointer">
          <DarkModeHero />
        </div>
        <div className="absolute top-118 left-1/2 -translate-x-1/2 flex justify-center z-10">
          {" "}
          <div className="w-255 h-35 bg-[#F5F5F5] rounded-tr-[50px] rounded-bl-[50px] max-[1024]:hidden rounded-xl relative gap-5.5 flex   z-500 shadow-[8px_0px_20px_rgba(8,135,202,0.30)] lg:block xl:block">
            <div className="flex justify-center w-full items-start ">
              <HeroSctionFilter />
            </div>
          </div>
        </div>
        <div className="w-328.25 h-110.5  flex  ">
          {/* Filter */}
          <div className="sm:block  relative   lg:hidden xl:hidden    -left-100 top-5 sm:top-[29px] sm:left-0 ">
            <ModalSearchRes />
            <div className="">
              <Frame />
            </div>
          </div>
          <div className="relative     right-60  top-[185px]  hidden lg:hidden xl:hidden  sm:block ">
            <div className="absolute left-15  bottom-75 ">
              <FelshRes />
            </div>
            <div className="relative ">
              <div className="absolute left-58 top-31">
                <FleshLeftRes />
              </div>
            </div>
            <div className="relative ">
              <div className="absolute left-58 top-28">
                <FleshRightRes />
              </div>
            </div>
          </div>
          <div className="xl:w-127.5 xl:h-95 lg:w-127.5 lg:h-95 sm:w-0 sm:h-0  flex self-center right-0 sm:right-12 sm:-top-30  xl:top-0 lg:top-0 sm:relative  ">
            <div className=" xl:text-[50px]  lg:text-[50px] sm:text-[32px] font-black leading-17.5 sm:font-black sm:relative sm:-right-8 right-112 bottom-10 sm:bottom-0 xl:bottom-0 lg:bottom-0 relative  ">
              با ما به <span className="text-green-100 ">خانه‌تان</span>{" "}
              نزدیک‌تر شوید !
              <div className="flex flex-wrap mt-8">
                <div className="flex font-bold leading-2 gap-4">
                  <button className="w-62.5 text-[16px] h-12 rounded-2xl border-2 cursor-pointer bg-blue-100 dark:bg-[#F5F5F5] dark:text-black text-white  sm:relative sm:right-10 xl:right-0 xl:relative lg:right-0 lg:relative">
                    با یه کلیک شروع کن !
                  </button>
                  <Link href="/contactus">
                    <button className="w-45 h-12 text-[16px] rounded-2xl  cursor-pointer border border-b-blue-100 dark:border-white dark:text-white text-blue-100 hidden lg:block xl:block">
                      درباره رهن کده
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* comprof */}
            <div className=" w-71.5 h-29  xl:relative xl:left-23 lg:left-23 relative -left-110 -top-12 sm:left-10 sm:-top-4 ">
              <div className="w-14 h-14  rounded-4xl absolute top-1 bg-center  ">
                <Profiles />
              </div>
              <div className="w-8 h-8  rounded-4xl absolute top-[40px] right-[75px] ">
                <Profiless />
              </div>
              <div className="w-12 h-12  rounded-4xl  absolute top-[75px] right-[25px] ">
                <Profilesss />
              </div>
            </div>

            <div className="hidden lg:block xl:block sm:hidden">
              <div className="absolute flex -bottom-30 -right-66 items-center gap-3 rotate-90 whitespace-nowrap">
                <span className="text-[12px] font-medium text-[#15977D80] ">
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
            </div>

            {/* Number */}
            <div className="flex w-full justify-end relative top-65 right-10 xl:-right-10 lg:-right-125  xl:flex xl:w-full xl:justify-end  xl:relative gap-10 sm:hidden hidden lg:block xl:block">
              <div className="w-[522px] h-[79px] dark:text-white flex flex-wrap gap-35 absolute font-bold items-center text-3xl ">
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
                  <span className="text-[16px]  top-15 left-2 absolute font-medium ">
                    رضایت مشتریان ما{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full relative top-80 left-[160px] sm:left-4 sm:block lg:hidden xl:hidden ">
            <SwiperResponsiv />{" "}
          </div>

          {/* felesh && dark */}
          <div className="xl:justify-end xl:flex xl:w-full lg:w-full lg:justify-end lg:flex  sm:hidden lg:block xl:block hidden">
            <div className="  ">
              <SwiperComponent />
            </div>

            <div className="relative     left-[15px] top-[162px] hidden lg:hidden xl:block ">
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
