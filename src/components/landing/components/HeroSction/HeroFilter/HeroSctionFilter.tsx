import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import HeaderIcon3 from "@/components/header/Icon/HeaderIcon3";
import Arrow from "../Icon/Arrow";
import DropDown from "./DropDown";
import Search from "../Icon/Search";

function HeroSctionFilter() {
  return (
    <div className="p-4  overflow-hidden" dir="">
      {" "}
      {}
      <Tabs.Root className="flex flex-col w-full  " defaultValue="account">
        <Tabs.List className="flex justify-center">
          <Tabs.Trigger
            value="account"
            className="group relative px-5 py-2 flex flex-col items-center gap-1 outline-none whitespace-nowrap text-gray-600 text-[14px] font-medium data-[state=active]:text-[#0887CA] bottom-[5px]"
          >
            <span>رزرو ملک</span>

            <div className="hidden group-data-[state=active]:block">
              <HeaderIcon3 />
            </div>
          </Tabs.Trigger>

          <Tabs.Trigger
            value="sell"
            className="group relative px-5 py-2 flex flex-col items-center gap-1 outline-none whitespace-nowrap text-gray-600 text-[14px] font-medium data-[state=active]:text-[#0887CA]  bottom-[5px]"
          >
            <span>فروش ملک</span>
            <div className="hidden group-data-[state=active]:block">
              <HeaderIcon3 />
            </div>
          </Tabs.Trigger>

          <Tabs.Trigger
            value="buy"
            className="group relative px-5 py-2 flex flex-col items-center gap-1 outline-none text-gray-600 text-[14px] font-medium data-[state=active]:text-[#0887CA]  bottom-[5px]"
          >
            <span> خرید</span>
            <div className="hidden group-data-[state=active]:block">
              <HeaderIcon3 />
            </div>
          </Tabs.Trigger>

          <Tabs.Trigger
            value="Rahn"
            className="group relative px-5 py-2 flex flex-col items-center gap-1 whitespace-nowrap outline-none text-gray-600 text-[14px] font-medium data-[state=active]:text-[#0887CA]  bottom-[5px]"
          >
            <span> رهن و اجاره</span>
            <div className="hidden group-data-[state=active]:block">
              <HeaderIcon3 />
            </div>
          </Tabs.Trigger>
        </Tabs.List>

        <div className="">
          <Tabs.Content className="" value="account">
            <div className="">
              <div
                dir="rtl"
                className="w-[852px] h-[54px] gap-[40px]  flex dark:text-black"
              >
                <div className=" gap-[40px]  flex flex-wrap  justify-center top-[15px] right-[110px]">
                  <div className="w-[126px] h-[54px] h text-[14px] font-normal">
                    مقصد{" "}
                    <div className="relative  right-[43px] bottom-[15px] ">
                      <Arrow />
                    </div>
                  </div>
                  <div className="w-[2px] h-[54px] opacity-20 bg-[#060425] relative left-[px] bottom-[px]"></div>
                  <div className="w-[92px] h-[54px]">
                    تاریخ ورود
                    <div className="">
                      <DropDown/>
                    </div>
                    <div className="relative  right-[80px] bottom-[20px] ">
                      <Arrow />
                    </div>
                  </div>
                  <div className="w-[3px] h-[11px] opacity-30 bg-[#060425] relative left-[px] bottom-[-16px] rotate-90"></div>
                  {/*  */}
                  <div className="w-[92px] h-[54px]">
                    تاریخ خروج
                    <div className="relative  right-[90px] bottom-[20px] ">
                      <Arrow />
                    </div>
                    <div className="w-[2px] h-[54px] opacity-20 bg-[#060425] relative left-[-140px] bottom-[32px]"></div>
                  </div>
                  <div className="w-[92px] h-[54px] relative right-13 ">
                    تعداد نفرات
                    <div className="relative  right-[90px] bottom-[20px] ">
                      <Arrow />
                    </div>
                  </div>
                  <button className="bg-[#060425] w-[120px] h-[48px] rounded-[16px] relative cursor-pointer right-[102px] text-white text-[14px] font-medium ">
                    جستجو
                    <div className="absolute bottom-[13px] right-[8px] ">
                      <Search />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="sell">
            <div className="flex justify-center">ADDMORE</div>
          </Tabs.Content>
          <Tabs.Content value="buy"></Tabs.Content>

          <Tabs.Content value="Rahn"></Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
}

export default HeroSctionFilter;
