import React, { FC } from "react";

interface StepTwoFormProps {
  onNext: () => void;
  onBack: () => void;
}

const StepTwoForm: FC<StepTwoFormProps> = ({ onNext, onBack }) => {
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep((prev) => prev + 1);
  };
  return (
    <form onSubmit={handleNext} className="flex flex-col justify-between gap-6">
      <div className="flex flex-col gap-2 relative">
        {" "}
        <input
          type="text"
          name="AccessCode"
          id="AccessCode"
          className="peer w-full dark:text-black border text-[13px] pt-1 px-4 h-12 bg-white border-blue-300/50 outline-0 rounded-2xl transition-colors focus:border-blue-500 "
          placeholder=""
        />{" "}
        <label
          htmlFor="AccessCode"
          className="absolute right-4 top-10 text-xs text-blue-300/70 transition-all duration-200 ease-out
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
               peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-blue-600 peer-not-placeholder-shown:-top-2
peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md"
        >
          کد تایید
        </label>
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5833 6.58333L7.71129 10.4554C7.54858 10.6181 7.28476 10.6181 7.12204 10.4554L4.91667 8.25M15.75 8.25C15.75 12.3921 12.3921 15.75 8.25 15.75H1.35344C1.06192 15.75 0.860516 15.4583 0.963804 15.1857L1.70851 13.2202C1.89953 12.716 1.82355 12.1562 1.57688 11.6768C1.04834 10.6497 0.75 9.48467 0.75 8.25C0.75 4.10786 4.10786 0.75 8.25 0.75C12.3921 0.75 15.75 4.10786 15.75 8.25Z"
              stroke="#0887CA"
              strokeOpacity="0.7"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <button
        onClick={onBack}
        className="h-7 flex underline justify-between pr-2 pl-1"
      >
        <span className="text-blue-100 text-[13px] dark:text-white">تغییر ایمیل</span>
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          onNext();
        }}
        className="h-12 w-full rounded-2xl cursor-pointer bg-blue-100 text-white hover:bg-blue-200 transition-colors"
      >
        ساخت حساب
      </button>
      <button
        onClick={onBack}
        className="h-12 w-full border-2 rounded-2xl border-blue-100 text-blue-100 dark:text-blue-300 dark:border-blue-300 hover:bg-blue-50 transition-colors"
      >
        مرحله قبل
      </button>
    </form>
  );
};

export default StepTwoForm;

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
function setCurrentStep(arg0: (prev: any) => any) {
  throw new Error("Function not implemented.");
}
