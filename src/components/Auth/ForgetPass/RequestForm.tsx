"use client";

import { forgotPasswordRequestAction } from "@/core/action/ForgetPassOne";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { useActionState } from "react";

interface StepOneFormProps {
  onNext: () => void;
}

const initialState = {
  success: false,
  message: "",
  resetCode: "",
};

const RequestForm: FC<StepOneFormProps> = ({ onNext }) => {
  const [displayCode, setDisplayCode] = useState("");
  const [showCodeSection, setShowCodeSection] = useState(false);

  const [state, formAction, isPending] = useActionState(
    async (_prevState: typeof initialState, formData: FormData) => {
      const result = await forgotPasswordRequestAction(formData);
      // اگر موفق بود، کد را برمی‌گردانیم
      if (result.success && result.resetCode) {
        setDisplayCode(result.resetCode); // کد را در state کامپوننت ست می‌کنیم
        setShowCodeSection(true); // بخش نمایش کد را فعال می‌کنیم
        return { ...result, resetCode: "" }; // resetCode را از state action پاک می‌کنیم تا دوباره نمایش داده نشود
      }
      return result;
    },
    initialState,
  );

  // وقتی کد نمایش داده شد، این useEffect منتظر می‌ماند تا کاربر دکمه "مرحله بعد" را بزند
  // اگر بخواهیم بعد از چند ثانیه خودکار برود، logic آن اینجا اضافه می‌شود
  useEffect(() => {
    if (state.success && displayCode) {
      // اینجا می‌توانیم تصمیم بگیریم که آیا بلافاصله onNext را صدا بزنیم یا صبر کنیم
      // فعلا صبر می‌کنیم تا کاربر دکمه را بزند
    }
  }, [state.success, displayCode]);

  const handleGoToNextStep = () => {
    onNext(); // دکمه "مرحله بعد" صدا می‌زند
  };

  return (
    <form action={formAction} className="flex flex-col justify-between gap-6">
      <div className="flex flex-col gap-2 relative">
        <input
          type="email"
          name="email"
          disabled={isPending || showCodeSection} // ورودی ایمیل غیرفعال می‌شود وقتی در حال ارسال است یا کد نمایش داده شده
          className={`peer w-full dark:text-black border text-[13px] pt-1 px-4 h-12 bg-white border-blue-300/50 outline-0 rounded-2xl transition-colors focus:border-blue-500 ${
            (isPending || showCodeSection) && "opacity-50 cursor-not-allowed"
          }`}
          placeholder=""
        />
        <label
          htmlFor="email"
          className="absolute right-4 top-4 text-xs text-blue-300/70 transition-all duration-200 ease-out
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
               peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-blue-600 peer-not-placeholder-shown:-top-2
               peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md"
        >
          ایمیل
        </label>

        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <svg
            width="19"
            height="15"
            viewBox="0 0 19 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.58333 1.58333L8.0601 6.62082C8.66195 7.08892 9.50472 7.08892 10.1066 6.62082L16.5833 1.58333M3.41667 14.0833H14.75C15.6834 14.0833 16.1501 14.0833 16.5067 13.9017C16.8203 13.7419 17.0752 13.4869 17.235 13.1733C17.4167 12.8168 17.4167 12.3501 17.4167 11.4167V3.41667C17.4167 2.48325 17.4167 2.01654 17.235 1.66002C17.0752 1.34641 16.8203 1.09144 16.5067 0.931656C16.1501 0.75 15.6834 0.75 14.75 0.75H3.41667C2.48325 0.75 2.01654 0.75 1.66002 0.931656C1.34641 1.09144 1.09144 1.34641 0.931656 1.66002C0.75 2.01654 0.75 2.48325 0.75 3.41667V11.4167C0.75 12.3501 0.75 12.8168 0.931656 13.1733C1.09144 13.4869 1.34641 13.7419 1.66002 13.9017C2.01654 14.0833 2.48325 14.0833 3.41667 14.0833Z"
              stroke="#0887CA"
              strokeOpacity="0.7"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>

      {!showCodeSection ? (
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-100 h-12 w-full rounded-2xl text-white transition-colors duration-300 ease-in-out disabled:opacity-60"
        >
          {isPending ? "در حال ارسال..." : "ارسال کد"}
        </button>
      ) : (
        // بخش نمایش کد بازیابی
        <div className="bg-gray-100 p-4 rounded-2xl flex flex-col items-center gap-3">
          <p className="text-lg font-semibold text-gray-800">کد بازیابی شما:</p>
          <p className="text-2xl font-bold text-blue-600 tracking-widest">
            {displayCode}
          </p>
          <p className="text-sm text-gray-600 text-center">
            این کد را در مرحله بعد وارد کنید.
          </p>
          <button
            onClick={handleGoToNextStep}
            className="mt-3 h-10 px-6 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            مرحله بعد
          </button>
        </div>
      )}

      <Link
        href={"/login"}
        className="h-12 w-full border-2 rounded-2xl border-blue-100 text-blue-100 dark:text-blue-300 dark:border-blue-300 hover:bg-blue-50 transition-colors text-center leading-11"
      >
        مرحله قبل
      </Link>
    </form>
  );
};

export default RequestForm;
