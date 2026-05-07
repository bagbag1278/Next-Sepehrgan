"use client"
import React, { useState } from 'react';

const RegistrationSteps: React.FC = () => {
  const [step, setStep] = useState(1);

  const completeStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  return (
    <div className="w-26 h-88.5 flex flex-col items-center gap-4 absolute left-0 top-45.5">
      <div className="w-10 h-33.5 flex flex-col items-center gap-2 ">
        <div className={`size-10 rounded-xl ${step >= 1 ? 'bg-blue-100' : ''} px-3.25 py-1.25`} onClick={completeStep}></div>
        <span className={`text-${step >= 1 ? 'blue-100' : 'black'} text-[12px]`}>ایمیل</span>
        <div className={`border border-dashed ${step >= 1 ? 'border-blue-100' : 'border-black'} w-0 h-14`}></div>
      </div>
      <div className="w-10 h-33.5 flex flex-col items-center gap-2 ">
        <div className={`size-10 rounded-xl ${step >= 2 ? 'bg-blue-100' : 'border border-black'} px-3.25 py-1.25`} onClick={completeStep}></div>
        <span className={`text-${step >= 2 ? 'blue-100' : 'black'} text-[12px]`}>کدتایید</span>
        <div className={`border border-dashed ${step >= 2 ? 'border-blue-100' : 'border-black'} w-0 h-14`}></div>
      </div>
      <div className="w-26.25 flex flex-col items-center gap-2 ">
        <div className={`size-10 rounded-xl ${step === 3 ? 'bg-blue-100' : 'border border-black'} px-3.25 py-1.25`} onClick={completeStep}></div>
        <span className={`text-${step === 3 ? 'blue-100' : 'black'} text-[12px]`}>شماره و رمز</span>
      </div>
    </div>
  );
};

export default RegistrationSteps;
