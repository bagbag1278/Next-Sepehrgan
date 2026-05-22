"use client";
import React from "react";

interface Passenger {
  id: number;
  fullName: string;
  nationalCode: string;
  gender: string;
  birthDate: string;
}

interface Props {
  passengers: Passenger[];
  updatePassenger: (index: number, field: string, value: string) => void;
  addPassenger: () => void;
  removePassenger: (id: number) => void;
  onNext: () => void;
}

const PassengerForm = ({ passengers, updatePassenger, addPassenger, removePassenger, onNext }: Props) => {
  return (
    <div className="space-y-6">
      <div className="rounded-[40px] p-8">
        <h3 className="font-bold text-gray-800 mb-2 text-lg">
          مسافران انتخاب شده ( {passengers.length} )
        </h3>
      </div>

      <div className="rounded-[40px] p-10 bg-white shadow-sm">
        <h2 className="text-xl font-black mb-10 text-[#060425]">
          مشخصات مسافران
        </h2>

        <div className="space-y-12">
          {passengers.map((passenger, index) => (
            <div key={passenger.id} className="space-y-6 border-b border-gray-100 pb-10 last:border-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="font-bold text-gray-700">
                    مسافر شماره {index + 1}
                  </span>
                </div>
                {passengers.length > 1 && (
                  <button 
                    onClick={() => removePassenger(passenger.id)}
                    className="text-red-500 text-xs font-bold hover:bg-red-50 px-3 py-1 rounded-lg transition-all"
                  >
                    حذف مسافر ×
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="نام و نام خانوادگی"
                  value={passenger.fullName}
                  onChange={(e) => updatePassenger(index, "fullName", e.target.value)}
                  className="text-[#0887CAB2] border border-[#0887CAB2] p-4 rounded-2xl outline-none focus:ring-1 ring-blue-300 transition-all"
                />
                <input
                  type="text"
                  placeholder="کد ملی"
                  value={passenger.nationalCode}
                  onChange={(e) => updatePassenger(index, "nationalCode", e.target.value)}
                  className="text-[#0887CAB2] border border-[#0887CAB2] p-4 rounded-2xl outline-none focus:ring-1 ring-blue-300 transition-all"
                />
                <select
                  value={passenger.gender}
                  onChange={(e) => updatePassenger(index, "gender", e.target.value)}
                  className="w-full text-[#0887CAB2] border border-[#0887CAB2] p-4 rounded-2xl appearance-none outline-none"
                >
                  <option disabled>جنسیت</option>
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                </select>
                <input
                  type="text"
                  placeholder="تاریخ تولد"
                  value={passenger.birthDate}
                  onChange={(e) => updatePassenger(index, "birthDate", e.target.value)}
                  className="text-[#0887CAB2] border border-[#0887CAB2] p-4 rounded-2xl outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addPassenger}
          className="w-full py-5 mt-10 border-2 border-dashed border-blue-100 rounded-[24px] text-[#10088F] font-black hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
        >
          <span className="text-2xl">+</span> افزودن مسافر جدید
        </button>
      </div>

      <div className="rounded-[40px] p-10 bg-white shadow-sm">
        <h3 className="font-bold text-[#060425] mb-8 text-lg">ارسال بلیط به دیگران</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="email" placeholder="ایمیل" className="bg-[#F8FAFC] border border-gray-100 p-4 rounded-2xl outline-none" />
          <input type="text" placeholder="شماره تماس" className="bg-[#F8FAFC] border border-gray-100 p-4 rounded-2xl outline-none" />
        </div>
        
        <button 
          onClick={onNext}
          className="w-full bg-[#15977D] text-white py-5 rounded-[24px] font-black mt-10 hover:shadow-lg transition-all"
        >
          ثبت اطلاعات
        </button>
      </div>
    </div>
  );
};

export default PassengerForm;