"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ForgetSteps from "./ForgetSteps";
import RequestForm from "./RequestForm";
import ForgetStepTwo from "./ForgetStepTwo";
import ForgetStepThree from "./ForgetStepThree";

export default function MultiForm({}) {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4 sm:px-6 md:px-0">
      <ForgetSteps step={currentStep} setStep={setCurrentStep} />

      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <RequestForm onNext={handleNext} />
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
            <ForgetStepTwo  />
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
            <ForgetStepThree />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}