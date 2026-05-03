import Link from "next/link";
import React from "react";

const StepTwoForm = () => {
  return (
    <form className="flex flex-col justify-between gap-6">
      <label htmlFor="AccessCode" className="text-blue-300 text-[12px]">کدتایید</label>
      <input
        type="text"
        name="AccessCode"
        className="border py-1 px-4 h-12 bg-white border-blue-300 outline-0 rounded-2xl "
      />
      <div className="h-7 flex justify-between pr-2 pl-1">
        <span className="text-blue-100 text-[13px]">تغییر ایمیل</span>
      </div>
      <Link href={"/register/StepTwo"}>
        {" "}
        <button className="h-12 w-107.5 rounded-2xl cursor-pointer bg-blue-100 text-white">
          ساخت حساب
        </button>
      </Link>

      <button className="h-12 w-107.5 border-2 rounded-2xl border-blue-100 text-blue-100">
        مرحله قبل
      </button>
    </form>
  );
};

export default StepTwoForm;
