// Stepper.tsx
import Step1 from "@/app/(main)/housereserve/[id]/booking/icon/step/StepOne";
import StepTwo from "@/app/(main)/housereserve/[id]/booking/icon/step/StepTwo";
import StepThree from "@/app/(main)/housereserve/[id]/booking/icon/step/StepThree";
import StepFour from "@/app/(main)/housereserve/[id]/booking/icon/step/StepFour"; // اضافه کنید
import StepFive from "@/app/(main)/housereserve/[id]/booking/icon/step/StepFive"; // اضافه کنید
import React from "react";

interface StepperProps {
  step: number;
  setStep: (step: number) => void;
}

const Stepper = ({ step, setStep }: StepperProps) => {
  const getStepCircleClass = (index: number) => {
    if (step === index) return "g[#10088F] text-white shadow-lg  bg-[#10088F]";
    if (step > index) return "bg-green-500 text-white"; 
    return "bg-white border-2 border-gray-200 text-gray-300"; 
  };

  const getLineClass = (index: number) => {
    if (step > index) return "bg-green-500"; 
    return "border-r-2 border-dashed border-gray-300"; 
  };

  const getTextColor = (index: number) => {
    if (step === index) return "text-[#10088F]";
    if (step > index) return "text-green-600";
    return "text-gray-300";
  };

  return (
    <div className="hidden lg:flex flex-col items-center gap-2 w-20 sticky top-10" dir="rtl">
      
      {/* مرحله ۱: هتل */}
      <div className="flex flex-col items-center gap-1">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${getStepCircleClass(1)}`}>
          <Step1 />
        </div>
        <span className={`text-[10px] font-bold ${getTextColor(1)}`}>هتل</span>
      </div>

      <div className={`w-0.5 h-10 ${getLineClass(1)}`}></div>

      {/* مرحله ۲: مسافران */}
      <div className="flex flex-col items-center gap-1">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${getStepCircleClass(2)}`}>
          <StepTwo />
        </div>
        <span className={`text-[10px] font-bold ${getTextColor(2)}`}>مسافران</span>
      </div>

      <div className={`w-0.5 h-10 ${getLineClass(2)}`}></div>

      {/* مرحله ۳: تایید */}
      <div className="flex flex-col items-center gap-1">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${getStepCircleClass(3)}`}>
          <StepThree />
        </div>
        <span className={`text-[10px] font-bold ${getTextColor(3)}`}>تایید</span>
      </div>

      <div className={`w-0.5 h-10 ${getLineClass(3)}`}></div>

      {/* مرحله ۴: پرداخت */}
      <div className="flex flex-col items-center gap-1">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${getStepCircleClass(4)}`}>
          <StepFour />
        </div>
        <span className={`text-[10px] font-bold ${getTextColor(4)}`}>پرداخت</span>
      </div>

      <div className={`w-0.5 h-10 ${getLineClass(4)}`}></div>

      {/* مرحله ۵: بلیط */}
      <div className="flex flex-col items-center gap-1">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all  shadow-lg   ${getStepCircleClass(5)}`}>
          <StepFive />
        </div>
        <span className={`text-[10px] font-bold  ${getTextColor(5)}`}>بلیط</span>
      </div>

    </div>
  );
};

export default Stepper;