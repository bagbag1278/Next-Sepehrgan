"use client";

import GoogleLogin from "@/components/common/GooleLogin/GoogleLogin";
import { registerStepOneClientAction } from "@/core/action/register.action";
import { useTranslations } from 'next-intl';
import Link from "next/link";
import React, { FC, useState } from "react";

interface StepOneFormProps {
  onNext: (tempUserId: number, verificationCode: string) => void;
}

const StepOneForm: FC<StepOneFormProps> = ({ onNext }) => {
  const t = useTranslations('Register');
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ tempUserId: number; verificationCode: string } | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError(t('emailRequired'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t('invalidEmail'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("email", email);

      const result = await registerStepOneClientAction(formData);

      if (result.success && result.tempUserId && result.verificationCode) {
        setSuccessData({
          tempUserId: result.tempUserId,
          verificationCode: result.verificationCode
        });
      } else {
        setError(result.message || t('sendCodeError'));
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(t('networkError'));
    } finally {
      setLoading(false);
    }
  };

  if (successData) {
    return (
      <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-4 text-center animate-fade-in">
        <h3 className="text-green-800 dark:text-green-300 font-medium mb-1">{t('verificationCodeTitle')}</h3>
        <p className="text-sm text-green-700 dark:text-green-400">
          <strong>{t('verificationCode')}:</strong> 
          <div className="text-2xl font-bold text-green-700 dark:text-green-400 tracking-widest">{successData.verificationCode}</div>
        </p>
        <p className="text-xs text-green-600 dark:text-green-500 mt-2">
          {t('enterCodeNextStep')}
        </p>
        <button
          onClick={() => onNext(successData.tempUserId, successData.verificationCode)}
          className="mt-3 w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
        >
          {t('continueToNextStep')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex mt-6 flex-col justify-between gap-6">
      <GoogleLogin />
      
      <div className="flex flex-col gap-2 relative">
        <div className="relative group">
  <input
    type="email"
    name="email"
    id="email"
    value={email}
    onChange={handleEmailChange}
    className="peer w-full dark:text-white dark:bg-gray-800 border text-[14px] px-4 h-12 bg-white border-blue-300/50 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all duration-200"
    placeholder=" "
  />
  <label
    htmlFor="email"
    className="absolute right-4 transition-all duration-200 cursor-text
      text-blue-300/70 dark:text-gray-400
      peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:bg-transparent
      peer-focus:-top-2.5 peer-focus:text-[11px] peer-focus:text-blue-500 dark:peer-focus:text-blue-400 peer-focus:bg-white dark:peer-focus:bg-gray-800 peer-focus:px-1 peer-focus:rounded-md
      peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:text-[11px] peer-not-placeholder-shown:bg-white dark:peer-not-placeholder-shown:bg-gray-800 peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:rounded-md
      pointer-events-none z-10
      after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300
      peer-focus:after:w-full"
  >
    {t('email')}
    <span className="text-blue-500 mr-0.5">*</span>
  </label>

        </div>
      </div>

      {error && <p className="text-red-500 dark:text-red-400 text-sm -mt-4">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`h-12 w-full rounded-2xl text-white transition-colors duration-300 ease-in-out
          ${loading ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed" : "bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700"}`}
      >
        {loading ? t('sending') : t('sendCode')}
      </button>
      
      <div className="h-6 mx-auto flex gap-0.5 justify-center items-center flex-wrap px-4">
        <h6 className="font-medium text-[14px] dark:text-gray-400">{t('haveAccount')}</h6>
        <Link href={"/login"}>
          <h5 className="text-blue-100 dark:text-blue-300 font-bold text-[15px] underline underline-offset-6">
            {t('login')}
          </h5>
        </Link>
      </div>
    </form>
  );
};

export default StepOneForm;