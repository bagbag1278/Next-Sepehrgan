import React from "react";

const GoogleLogin = () => {
  return (
    <div>
      <div className="py-1 bg-blue-300 rounded-2xl font-medium text-white flex justify-center gap-2">
        <span className=" text-3xl ">G</span>
        <span className="text-[12px] font-light mt-2">ورود با حساب گوگل</span>
      </div>
      <div className="flex items-center justify-center mx-auto mt-5">
        <div className="flex-1 border-t border-blue-400/50 dark:border-blue-300"></div>
        <span className="px-2 text-blue-300 text-[12px]">یا</span>
        <div className="flex-1 border-t border-blue-400/50 dark:border-blue-300"></div>
      </div>
    </div>
  );
};

export default GoogleLogin;
