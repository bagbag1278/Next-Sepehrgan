import Link from "next/link";
import React from "react";

const StepOneForm = () => {
  return (
    <form className="flex mt-6 flex-col justify-between gap-6">
      <input
        type="email"
        name="email"
        className="border py-1 px-4 h-12 bg-white border-blue-300 outline-0 rounded-2xl "
      />
      <Link href={"/register/StepTwo"}>
        {" "}
        <button className="h-12 w-107.5  rounded-2xl bg-blue-100 text-white">
          ارسال کد
        </button>
      </Link>

      <div className="h-6 mx-auto flex gap-0.5 justify-center items-center">
        <h6 className="font-normal text-[13px]">آیا حساب دارید ؟</h6>
        <h5 className="text-blue-100 font-medium text-[15px]">ورود</h5>
      </div>
    </form>
  );
};

export default StepOneForm;
