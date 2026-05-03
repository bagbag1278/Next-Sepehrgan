"use client";
import React from "react";

const LoginForm = () => {
  return (
    <form className=" mt-6 flex flex-col justify-between gap-6">
      <input
        name="email"
        type="email"
        className="border py-1 px-4 h-12 bg-white border-blue-300 outline-0 w-107.5 rounded-2xl "
      />
      <input
        name="password"
        type="password"
        className="border py-1 px-4 h-12 border-blue-300 outline-0 w-107.5 rounded-2xl "
      />
      <div className="w-107.5 h-5 flex justify-between items-center ">
        <span className="text-blue-100 text-[13px] font-medium ">
          ورود با شماره موبایل
        </span>
        <span className="text-blue-300 text-[11px] font-medium decoration">
          رمز عبور خود را فراموش کردید؟
        </span>
      </div>
      <button className="w-107.5 h-12 rounded-2xl bg-blue-100 py-1.75 px-50.25 text-white">
        ورود
      </button>
      <div className="h-6 mx-auto flex gap-0.5 justify-center items-center">
        <h6 className="font-normal text-[13px]">حساب کاربری ندارید ؟</h6>
        <h5 className="text-blue-100 font-medium text-[15px]">ثبت نام</h5>
      </div>
    </form>
  );
};

export default LoginForm;
