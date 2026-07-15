"use client";

import React from "react";
import { useTranslations } from 'next-intl';
import Step1 from "@/app/(main)/housereserve/[id]/booking/icon/step/StepOne";
import Step2 from "@/app/(main)/housereserve/[id]/booking/icon/step/StepTwo";
import Step3 from "@/app/(main)/housereserve/[id]/booking/icon/step/StepThree";
import Step4 from "@/app/(main)/housereserve/[id]/booking/icon/step/StepFour";
import Step5 from "@/app/(main)/housereserve/[id]/booking/icon/step/StepFive";
import { CheckCircle } from "lucide-react";

interface StepperProps {
  step: number;
  setStep: (step: number) => void;
}

const Stepper = ({ step, setStep }: StepperProps) => {
  const t = useTranslations('Stepper');

  const getStepCircleClass = (index: number) => {
    if (step === index) return "bg-[#10088F] text-white shadow-lg";
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
        <span className={`text-[10px] font-bold ${getTextColor(1)}`}>{t('step1')}</span>
      </div>

      <div className={`w-0.5 h-10 ${getLineClass(1)}`}></div>

      {/* مرحله ۲: مسافران */}
      <div className="flex flex-col items-center gap-1">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${getStepCircleClass(2)}`}>
          <Step2 />
        </div>
        <span className={`text-[10px] font-bold ${getTextColor(2)}`}>{t('step2')}</span>
      </div>

      <div className={`w-0.5 h-10 ${getLineClass(2)}`}></div>

      {/* مرحله ۳: تایید */}
      <div className="flex flex-col items-center gap-1">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${getStepCircleClass(3)}`}>
          <CheckCircle size={24} />
        </div>
        <span className={`text-[10px] font-bold ${getTextColor(3)}`}>{t('step3')}</span>
      </div>

      <div className={`w-0.5 h-10 ${getLineClass(3)}`}></div>

      {/* مرحله ۴: پرداخت */}
      <div className="flex flex-col items-center gap-1">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${getStepCircleClass(4)}`}>
          <Step4 />
        </div>
        <span className={`text-[10px] font-bold ${getTextColor(4)}`}>{t('step4')}</span>
      </div>

      <div className={`w-0.5 h-10 ${getLineClass(4)}`}></div>

      {/* مرحله ۵: بلیط */}
      <div className="flex flex-col items-center gap-1">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg ${getStepCircleClass(5)}`}>
          <Step5 />
        </div>
        <span className={`text-[10px] font-bold ${getTextColor(5)}`}>{t('step5')}</span>
      </div>

    </div>
  );
};

export default Stepper;