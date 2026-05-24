import { toPersianNum } from "@/components/utils/FarsiNum";
import Image from "next/image";
import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";

const HouseDetail = () => {
  return (
    <div dir="rtl" className="h-full flex flex-col gap-8">
      <div className="h-122.75 flex flex-col gap-4">
        {" "}
        {/* top */}
        <div className="h-58.5 items-center flex gap-4">
          {/* right */}
          <div className="rounded-4xl w-[320px] h-58.5">
            <Image
              src={"/FastReserve/img.png"}
              width={340}
              height={234}
              alt=""
            />
          </div>
          {/* left */}
          <div className="w-83 flex flex-col gap-4 h-55.5 pt-2">
            <div className="h-9.5 flex gap-2">
              <h1 className="h-9.5 w-63.75 text-2xl font-bold text-nowrap">
                هتل همایون فر کیش ایران
              </h1>
            </div>
            <div className="h-6 items-center flex gap-1">
              <HiOutlineLocationMarker size={24} />
              <span className="text-[13px] opacity-80 text-nowrap truncate">
                گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظیمی ...{" "}
              </span>
            </div>
            <div className="h-6 items-center flex gap-1">
              <svg
                width="13"
                height="15"
                viewBox="0 0 13 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 5.83333H12.5M3.83333 3.16667V0.5M9.16667 3.16667V0.5M4.76667 13.8333H8.23333C9.72681 13.8333 10.4735 13.8333 11.044 13.5427C11.5457 13.287 11.9537 12.8791 12.2094 12.3773C12.5 11.8069 12.5 11.0601 12.5 9.56667V6.1C12.5 4.60653 12.5 3.85979 12.2094 3.28936C11.9537 2.78759 11.5457 2.37964 11.044 2.12398C10.4735 1.83333 9.72681 1.83333 8.23333 1.83333H4.76667C3.27319 1.83333 2.52646 1.83333 1.95603 2.12398C1.45426 2.37964 1.04631 2.78759 0.790649 3.28936C0.5 3.85979 0.5 4.60653 0.5 6.1V9.56667C0.5 11.0601 0.5 11.8069 0.790649 12.3773C1.04631 12.8791 1.45426 13.287 1.95603 13.5427C2.52646 13.8333 3.27319 13.8333 4.76667 13.8333Z"
                  stroke="#060425"
                  strokeOpacity="0.8"
                  strokeLinecap="round"
                />
              </svg>

              <span className="text-blue-400/50 text-sm">
                12 مرداد 1404 تا 20 مرداد 1404
              </span>
            </div>
            <div className="border border-amber-900 h-6 items-center flex gap-1"></div>
            <div className="h-6 items-center flex gap-4">
              <span className="text-sm ">قیمت خرید</span>
              <span className="text-sm text-blue-300 font-bold">
                {toPersianNum("250,000,000")} تومان
              </span>
            </div>
          </div>
        </div>
        {/* bottom */}
        <div className="h-60.25 flex flex-col gap-4">
          <div className="h-48.25 flex flex-col gap-3">
            <h4 className="">توضیحات بیشتر </h4>
            <p className="text-[13px] text-blue-400/50">
              آپارتمانی دنج و آرام در قلب شهر، جایی که زندگی روزمره راحت و
              سبک‌تر است. فضایی مدرن با طراحی منحصربه‌فرد، یادآور خانه‌های دنج و
              دل‌نشین. محلی برای لحظه‌های خوش، آرامش و شروعی نو در زندگی
              روزمره‌تان. آپارتمانی دنج و آرام در قلب شهر، جایی که زندگی روزمره
              راحت و سبک‌تر است. فضایی مدرن با طراحی منحصربه‌فرد، یادآور
              خانه‌های دنج و دل‌نشین. محلی برای لحظه‌های خوش، آرامش و شروعی نو
              در زندگی روزمره‌تان. آپارتمانی دنج و آرام در قلب شهر، جایی که
              زندگی روزمره راحت و سبک‌تر است. فضایی مدرن با طراحی منحصربه‌فرد،
              یادآور خانه‌های دنج و دل‌نشین. محلی برای لحظه‌های خوش، آرامش و
              شروعی نو در زندگی روزمره‌تان. محلی برای لحظه‌های خوش، آرامش و
              شروعی نو در زندگی روزمره‌تان. محلی برای لحظه‌های خوش، آرامش و
              شروعی نو در زندگی روزمره‌تان.
            </p>
          </div>
          <div className="flex h-7 items-center">
            <span className="text-sm">برچسب ها</span>
            <div className="bg-blue-300 py-2 px-4 text-white text-sm leading-3 rounded-2xl mr-4">
              مسکونی
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="h-12 flex justify-center gap-4">
        <button className="text-white bg-blue-100 rounded-2xl py-2.5 px-19.5 cursor-pointer hover:opacity-80 transition-opacity duration-150">
          رزرو ها
        </button>
        <button className="text-white bg-blue-100 rounded-2xl py-2.5 px-16 cursor-pointer hover:opacity-80 transition-opacity duration-150">
          پرداختی ها
        </button>
      </div>
    </div>
  );
};

export default HouseDetail;
