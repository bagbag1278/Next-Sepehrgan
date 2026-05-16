"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StepOneForm from "./StepOneForm";
import StepTwoForm from "./StepTwoForm";
import StepThirdForm from "./StepThirdForm";
import RegistrationSteps from "./RegistrationProgress";

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
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
            <StepOneForm onNext={handleNext} />
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
            <StepTwoForm onNext={handleNext} onBack={handleBack} />
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
            <StepThirdForm
              onBack={handleBack}
              onNext={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
