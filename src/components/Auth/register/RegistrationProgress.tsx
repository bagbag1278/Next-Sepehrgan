"use client";

import React from "react";
import { useTranslations } from 'next-intl';
import { FaEnvelope, FaLock, FaKey, FaCheckCircle } from "react-icons/fa";

interface RegistrationStepsProps {
  step: number;
  setStep: (step: number) => void;
}

const RegistrationSteps: React.FC<RegistrationStepsProps> = ({
  step,
  setStep,
}) => {
  const t = useTranslations('Register');
  
  const completeStep = (stepNumber: number) => {
    setStep(stepNumber);
  };

  const renderIcon = (stepNumber: number) => {
    const isCurrentStep = step === stepNumber;
    const isCompleted = step > stepNumber;

    const EmailIcon = <FaEnvelope />;
    const OtpIcon = <FaKey />;
    const PasswordIcon = <FaLock />;
    const CompletedIcon = <FaCheckCircle />;

    let iconToRender;
    let iconColorClass = "text-black dark:text-white";

    if (isCompleted) {
      iconToRender = CompletedIcon;
      iconColorClass = "text-white";
    } else if (isCurrentStep) {
      iconColorClass = "text-white";
      if (stepNumber === 1) iconToRender = EmailIcon;
      if (stepNumber === 2) iconToRender = OtpIcon;
      if (stepNumber === 3) iconToRender = PasswordIcon;
    } else {
      if (stepNumber === 1) iconToRender = EmailIcon;
      if (stepNumber === 2) iconToRender = OtpIcon;
      if (stepNumber === 3) iconToRender = PasswordIcon;
    }

    return React.cloneElement(iconToRender, {
      className: `${iconColorClass} size-5 sm:size-6`,
    });
  };

  return (
    <div className="flex flex-row md:flex-col items-center justify-center gap-3 md:gap-4 w-full md:w-26 md:h-88.5 md:absolute md:-left-40 md:-top-20 mb-6 ml-10 md:mb-0">
      {[1, 2, 3].map((stepNumber) => (
        <div
          key={stepNumber}
          className="flex flex-row md:flex-col items-center gap-2 md:gap-2"
        >
          <div
            className={`size-8 sm:size-10 rounded-xl flex items-center justify-center 
              ${step === stepNumber ? "bg-blue-100 dark:bg-blue-200" : step > stepNumber ? "bg-green-200" : "border border-black dark:border-white opacity-70"} 
              px-3.25 py-1.25 transition-all duration-300 cursor-pointer
            `}
            onClick={() => completeStep(stepNumber)}
            style={{
              transform: step === stepNumber ? "scale(1.1)" : "scale(1)",
            }}
          >
            {renderIcon(stepNumber)}
          </div>
          <span
            className={`${step === stepNumber ? "text-blue-100 dark:text-blue-200" : step > stepNumber ? "text-green-200" : "text-black dark:text-white opacity-70"} text-[10px] sm:text-[12px] text-center`}
          >
            {stepNumber === 1
              ? t('step1')
              : stepNumber === 2
                ? t('step2')
                : t('step3')}
          </span>
          {stepNumber < 3 && (
            <div
              className={`hidden md:block border border-dashed ${step === stepNumber ? "border-blue-100 dark:border-blue-200" : step > stepNumber ? "border-green-200" : "border-black dark:border-white opacity-70"} w-0 h-14`}
            />
          )}
          {stepNumber < 3 && (
            <div
              className={`block md:hidden border-b border-dashed ${step === stepNumber ? "border-blue-100 dark:border-blue-200" : step > stepNumber ? "border-green-200" : "border-black dark:border-white opacity-70"} w-8 sm:w-12 h-0`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default RegistrationSteps;