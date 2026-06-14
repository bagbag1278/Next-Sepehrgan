import React from "react";

const DashboardPage = () => {
  return (
    <section className="p-4 border-2 border-blue-200 shadow-[0_0_8px] shadow-blue-300/30 bg-blue-50 rounded-3xl w-2xl flex flex-col items-center justify-center gap-5">
      <h1 className="font-bold text-2xl text-blue-200">
        یک پنل را برای ورود انتخاب کنید
      </h1>
      <span className="opacity-75 ">به کدام پنل میخواید بروید؟</span>
      <div className=" flex items-center gap-3">
        <button className="h-10 px-4 cursor-pointer hover:shadow-lg hover:bg-blue-200 transition-colors duration-150 bg-blue-300 rounded-2xl text-white ">
          پنل مشتری
        </button>
        <button className="h-10 px-4 cursor-pointer hover:shadow-lg hover:bg-blue-200 transition-colors duration-150 bg-blue-300 rounded-2xl text-white ">
          پنل فروشنده
        </button>
        <button className="h-10 px-4 cursor-pointer hover:shadow-lg hover:bg-blue-200 transition-colors duration-150 bg-blue-300 rounded-2xl text-white ">
          پنل ادمین
        </button>
      </div>
    </section>
  );
};

export default DashboardPage;
