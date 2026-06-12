import { Booking } from "@/core/types/buyer/IBooking";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import Image from "next/image";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LuBedDouble, LuCar, LuTreeDeciduous } from "react-icons/lu";

interface HouseDetailProps {
  booking: Booking;
}

const HouseDetail = ({ booking }: HouseDetailProps) => {
  return (
    <div dir="rtl" className="h-full flex flex-col gap-8">
      <div className="h-122.75 flex flex-col gap-4">
        {/* top */}
        <div className="h-58.5 items-center flex gap-4">
          {/* right */}
          <div className="rounded-4xl w-[320px] h-58.5">
            <Image src={"/FastReserve/img.png"} width={340} height={234} alt="" />
          </div>
          {/* left */}
          <div className="w-83 flex flex-col gap-4 h-55.5 pt-2">
            <div className="h-9.5 flex gap-2">
              <h1 className="h-9.5 w-63.75 text-2xl font-bold text-nowrap">
                {booking.house.title}
              </h1>
            </div>
            <div className="h-6 items-center flex gap-1">
              <HiOutlineLocationMarker size={24} />
              <span className="text-[13px] opacity-80 text-nowrap truncate">
                آدرس ملک
              </span>
            </div>
            <div className="h-6 items-center flex gap-1">
              <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.5 5.83333H12.5M3.83333 3.16667V0.5M9.16667 3.16667V0.5M4.76667 13.8333H8.23333C9.72681 13.8333 10.4735 13.8333 11.044 13.5427C11.5457 13.287 11.9537 12.8791 12.2094 12.3773C12.5 11.8069 12.5 11.0601 12.5 9.56667V6.1C12.5 4.60653 12.5 3.85979 12.2094 3.28936C11.9537 2.78759 11.5457 2.37964 11.044 2.12398C10.4735 1.83333 9.72681 1.83333 8.23333 1.83333H4.76667C3.27319 1.83333 2.52646 1.83333 1.95603 2.12398C1.45426 2.37964 1.04631 2.78759 0.790649 3.28936C0.5 3.85979 0.5 4.60653 0.5 6.1V9.56667C0.5 11.0601 0.5 11.8069 0.790649 12.3773C1.04631 12.8791 1.45426 13.287 1.95603 13.5427C2.52646 13.8333 3.27319 13.8333 4.76667 13.8333Z"
                  stroke="#060425" strokeOpacity="0.8" strokeLinecap="round"
                />
              </svg>
              <span className="text-blue-400/50 text-sm">
                 {digitsEnToFa(booking.reservedDates[0])} تا {digitsEnToFa(booking.reservedDates[booking.reservedDates.length - 1])}
              </span>
            </div>
            <div className="h-6 items-center flex gap-2">
              <div className="flex gap-1 items-center">
                <LuCar size={16} />
                <span className="opacity-90 text-[13px]">1 پارکینگ</span>
              </div>
              <div className="flex gap-1 items-center">
                <LuTreeDeciduous size={16} />
                <span className="opacity-90 text-[13px]">حیاط دار</span>
              </div>
              <div className="flex gap-1 items-center">
                <LuBedDouble size={16} />
                <span className="opacity-90 text-[13px]">2 خواب</span>
              </div>
            </div>
            <div className="h-6 items-center flex gap-4">
              <span className="text-sm">قیمت</span>
              <span className="text-sm text-blue-300 font-bold">
                {digitsEnToFa(addCommas(booking.house.price))} تومان
              </span>
            </div>
          </div>
        </div>
        {/* bottom */}
        <div className="h-60.25 flex flex-col gap-4">
          <div className="h-48.25 flex flex-col gap-3">
            <h4>توضیحات بیشتر</h4>
            <p className="text-[13px] text-blue-400/50">
              اطلاعات بیشتر در مورد این ملک در دسترس نیست.
            </p>
          </div>
          <div className="flex h-7 items-center">
            <span className="text-sm">وضعیت رزرو</span>
            <div className="bg-blue-300 py-2 px-4 text-white text-sm leading-3 rounded-2xl mr-4">
              {booking.status === "pending" && "در انتظار"}
              {booking.status === "confirmed" && "تایید شده"}
              {booking.status === "canceled" && "لغو شده"}
            </div>
          </div>
        </div>
      </div>
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