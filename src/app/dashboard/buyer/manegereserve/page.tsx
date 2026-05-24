import HouseSearch from "@/components/Dashboard/buyer/manegereserve/HouseSearch";
import ManegeHouse from "@/components/Dashboard/buyer/manegereserve/ManegeHouse";
import MoreFilterButton from "@/components/Dashboard/buyer/manegereserve/MoreFilterButton";
import React from "react";

const ManegeReservePage = () => {
  return (
    <div className="">
      {/* filter and search */}
      <div className="w-243 h-12 mx-auto mt-16 flex justify-between items-center">
        <div className="">
          لیست رزرو های شما{" "}
          <span className="text-sm text-blue-400/60">( 25 )</span>
        </div>
        <div className="w-153.5 flex gap-4 h-12">
          <HouseSearch />
          <MoreFilterButton />
        </div>
      </div>
      {/* houses */}
      <div className=" w-243 h-92 mx-auto flex flex-col gap-4 mt-5">
        <div className="h-16 rounded-2xl py-5.25 pr-14 shadow-[0_0_4px] shadow-blue-200/20">
          <div className="-5.5 w-222.5 opacity-50 flex gap-24.25">
            <span className="text-[13px] text-nowrap">نام ملک</span>
            <div className="w-188 h-5.5 flex gap-20">
              <span className="text-[13px] text-nowrap">تاریخ رزرو</span>
              <span className="text-[13px] text-nowrap">زمان رزرو</span>
              <span className="text-[13px] text-nowrap">مبلغ</span>
              <div className="flex gap-13">
                <span className="text-[13px] text-nowrap">تعداد مسافر</span>
                <div className="flex gap-10">
                  <span className="text-[13px] text-nowrap">وضعیت رزرو</span>
                  <span className="text-[13px] text-nowrap">وضعیت پرداخت</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-72 flex flex-col gap-4 overflow-hidden py-px px-0.5">
          <ManegeHouse />
          <ManegeHouse />
          <ManegeHouse />
          
        </div>
      </div>
      {/* pagination */}
      <div className="border-2 border-blue-800 w-88 h-10 mr-6 mt-5"></div>
    </div>
  );
};

export default ManegeReservePage;
