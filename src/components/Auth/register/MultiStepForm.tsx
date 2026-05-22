"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StepOneForm from "./StepOneForm";
import StepTwoForm from "./StepTwoForm";
import StepThirdForm from "./StepThirdForm";
import RegistrationSteps from "./RegistrationProgress";

interface MultiStepFormProps {
  initialTempUserId: number | null;
}

export default function MultiStepForm({
  initialTempUserId,
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [tempUserId, setTempUserId] = useState<number | null>(
    initialTempUserId,
  );
  const [verificationCode, setVerificationCode] = useState<string | null>(null);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleStepOneComplete = (userId: number, code: string) => {
    setTempUserId(userId);
    setVerificationCode(code);
    handleNext();
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 md:mt-10 px-4 md:px-0">
      <RegistrationSteps step={currentStep} setStep={setCurrentStep} />

      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <StepOneForm onNext={handleStepOneComplete} />
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <StepTwoForm
              tempUserId={tempUserId || 0}
              onNext={handleNext}
              onBack={handleBack}
            />
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <StepThirdForm userId={tempUserId || 0} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}