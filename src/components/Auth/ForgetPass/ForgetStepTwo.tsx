"use client";

import React from "react";
import { useTranslations } from 'next-intl';
import { FiCheckCircle } from "react-icons/fi";

interface ForgetStepTwoProps {
  onNext?: () => void;
  onBack?: () => void;
}

const ForgetStepTwo = ({ onNext, onBack }: ForgetStepTwoProps) => {
  const t = useTranslations('ForgetPassword');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNext) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mt-6 flex-col justify-between gap-6">
      <div className="flex flex-col gap-2 relative">
        <input
          type="text"
          name="verificationCode"
          className="peer w-full dark:text-white  border text-[13px] pt-1 px-4 h-12  border-blue-300/50 dark:border-gray-600 outline-0 rounded-2xl transition-colors focus:border-blue-500 dark:focus:border-blue-400"
          placeholder=" "
        />
        <label
          htmlFor="verificationCode"
          className="absolute right-4 top-2 p-0.5 text-xs text-blue-300/70 dark:text-gray-400 transition-all duration-200 ease-out
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
               peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 peer-not-placeholder-shown:-top-2
               peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md dark:peer-not-placeholder-shown:bg-gray-800"
        >
          {t('verifyCode')}
        </label>
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <FiCheckCircle className="text-blue-300 dark:text-gray-400" />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 h-12 w-full rounded-2xl text-white transition-colors duration-300 ease-in-out disabled:opacity-60"
      >
        {t('sendCode')}
      </button>
    </form>
  );
};

export default ForgetStepTwo;