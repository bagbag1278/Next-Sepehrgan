import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiSend, FiCheckCircle, FiRotateCcw } from "react-icons/fi";


interface ForgetStepsProps {
  step: number;
  setStep: (step: number) => void;
}

const ForgetSteps: React.FC<ForgetStepsProps> = ({
  step,
  setStep,
}) => {
  const completeStep = (stepNumber: number) => {
    setStep(stepNumber);
  };

  const renderIcon = (stepNumber: number) => {
    const isCurrentStep = step === stepNumber;
    const isCompleted = step > stepNumber;

    const EmailIcon = <FiSend />;
    const OtpIcon = <FiCheckCircle />;
    const PasswordIcon = <FiRotateCcw />;
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
      className: `${iconColorClass} size-6`,
    });
  };

  return (
    <div className="w-26 h-88.5 flex flex-col items-center gap-4 absolute -left-40 -top-20">
      {[1, 2, 3].map((stepNumber) => (
        <div
          key={stepNumber}
          className="w-10 h-33.5 flex flex-col items-center gap-2"
        >
          <div
            className={`size-10 rounded-xl flex items-center justify-center 
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
            className={`${step === stepNumber ? "text-blue-100 dark:text-blue-200" : step > stepNumber ? "text-green-200" : "text-black dark:text-white opacity-70"} text-[12px] text-center`}
          >
            {stepNumber === 1
              ? "ایمیل"
              : stepNumber === 2
                ? "کدتایید"
                : "رمز جدید"}
          </span>
          {stepNumber < 3 && (
            <div
              className={`border border-dashed ${step === stepNumber ? "border-blue-100 dark:border-blue-200" : step > stepNumber ? "border-green-200" : "border-black dark:border-white opacity-70"} w-0 h-14`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ForgetSteps;
