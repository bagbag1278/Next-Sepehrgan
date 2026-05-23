import CircularRange from "@/components/Dashboard/buyer/dash/CircularRange";
import DashProduct from "@/components/Dashboard/buyer/dash/DashProduct";
import DashStatus from "@/components/Dashboard/buyer/dash/DashStatus";
import React from "react";

const BuyerDashPage = () => {
  return (
    <div>
      <div className="w-156.5 h-118 absolute top-20.25 right-6 flex flex-col gap-8">
        {/* dashboard status */}
        <DashStatus />
        {/* dashboard product */}
        <div className=" h-80 flex flex-col gap-4">
          <div className="h-14 rounded-2xl shadow-[0_0_4px] shadow-blue-200/20 py-4 pr-4">
            <div className="h-5.5 w-138 flex justify-end gap-18">
              <div className=" h-5.5 text-sm text-blue-400/50">
                نام اقامتگاه
              </div>
              <div className="h-5.5 flex gap-14">
                <span className="text-sm text-blue-400/50">تاریخ رزرو</span>
                <span className="text-sm text-blue-400/50">زمان رزرو</span>
                <span className="text-sm text-blue-400/50">قیمت</span>
                <span className="text-sm text-blue-400/50">وضعیت</span>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="h-62.5 flex flex-col gap-2 overflow-y-auto pt-0.5 px-0.5">
            <DashProduct/>
            <DashProduct/>
          </div>
          {/*  */}
        </div>
      </div>
      {/*  */}
      <div className="w-80.5 h-132.25 absolute top-6.5 right-168.5 flex flex-col gap-8">
        {/* profile */}
        <div className="h-78.5 rounded-2xl pt-4.25 px-7.75 shadow-[0_0_4px] shadow-blue-200/20">
          <div className="h-66.5 flex flex-col items-center gap-4">
            <CircularRange />
            <div className="h-17.5 flex flex-col gap-2 items-center">
              <h6 className="font-medium ">وضعیت پروفایل شما</h6>
              <span className="text-[11px] opacity-70 text-center">
                برای اینکه بازدید خوبی داشته باشید، پروفایل شما باید حداقل ۷۰٪
                تکمیل شده باشد.
              </span>
            </div>
            <button className="w-40 h-8 border border-blue-200 hover:border-2 cursor-pointer text-[12px] font-normal text-blue-200 rounded-xl">
              ویرایش پروفایل
            </button>
          </div>
        </div>
        {/* reserve amar */}
        <div className="p-4 flex flex-col gap-2 h-45.75 rounded-2xl shadow-[0_0_4px] shadow-blue-200/20">
          <h4 className="font-bold">نمودار رزرو ها </h4>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashPage;
