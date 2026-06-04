"use client";

import { registerStepTwoClientAction } from "@/core/action/register.action";
import { useTranslations } from 'next-intl';
import React, { FC, useState } from "react";

interface StepTwoFormProps {
  tempUserId: number;
  onNext: () => void;
  onBack: () => void;
}

const StepTwoForm: FC<StepTwoFormProps> = ({ tempUserId, onNext, onBack }) => {
  const t = useTranslations('Register');
  const [userIdInput, setUserIdInput] = useState<string>(String(tempUserId));
  const [codeInput, setCodeInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userIdInput || !codeInput) {
      setError(t('fillBothFields'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("tempUserId", userIdInput);
      formData.append("verificationCode", codeInput);

      const result = await registerStepTwoClientAction(formData);

      if (result.success) {
        onNext();
      } else {
        setError(result.message || t('invalidInfo'));
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError(t('networkError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex mt-4 md:mt-6 flex-col justify-between gap-4 md:gap-6 w-full max-w-md mx-auto px-4 md:px-0"
    >
      <div className="flex flex-col gap-2 relative w-full">
        <input
          type="text"
          name="tempUserId"
          value={userIdInput}
          onChange={(e) => setUserIdInput(e.target.value)}
          className="peer w-full dark:text-white dark:bg-gray-800 border text-[13px] md:text-[14px] pt-1 px-4 h-11 md:h-12 bg-white border-blue-300/50 dark:border-gray-600 outline-0 rounded-2xl transition-colors focus:border-blue-500 dark:focus:border-blue-400"
          placeholder=" "
        />
        <label
          htmlFor="tempUserId"
          className="absolute right-4 top-2 md:top-4 text-xs text-blue-300/70 dark:text-gray-400 transition-all duration-200 ease-out
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base
               peer-focus:top-0 peer-focus:text-[11px] md:peer-focus:text-[12px] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 peer-not-placeholder-shown:-top-2
               peer-not-placeholder-shown:text-xs md:peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md dark:peer-not-placeholder-shown:bg-gray-800"
        >
          {t('tempUserId')}
        </label>
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <svg
            width="16"
            height="13"
            className="md:w-[19px] md:h-[15px]"
            viewBox="0 0 19 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.58333 1.58333L8.0601 6.62082C8.66195 7.08892 9.50472 7.08892 10.1066 6.62082L16.5833 1.58333M3.41667 14.0833H14.75C15.6834 14.0833 16.1501 14.0833 16.5067 13.9017C16.8203 13.7419 17.0752 13.4869 17.235 13.1733C17.4167 12.8168 17.4167 12.3501 17.4167 11.4167V3.41667C17.4167 2.48325 17.4167 2.01654 17.235 1.66002C17.0752 1.34641 16.8203 1.09144 16.5067 0.931656C16.1501 0.75 15.6834 0.75 14.75 0.75H3.41667C2.48325 0.75 2.01654 0.75 1.66002 0.931656C1.34641 1.09144 0.931656 1.34641 0.75 1.66002C0.75 2.01654 0.75 2.48325 0.75 3.41667V11.4167C0.75 12.3501 0.75 12.8168 0.931656 13.1733C1.09144 13.4869 1.34641 13.7419 1.66002 13.9017C2.01654 14.0833 2.48325 14.0833 3.41667 14.0833Z"
              stroke="#0887CA"
              strokeOpacity="0.7"
              strokeWidth="1.5"
              className="dark:stroke-gray-400"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-2 relative w-full">
        <input
          type="text"
          name="verificationCode"
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          className="peer w-full dark:text-white dark:bg-gray-800 border text-[13px] md:text-[14px] pt-1 px-4 h-11 md:h-12 bg-white border-blue-300/50 dark:border-gray-600 outline-0 rounded-2xl transition-colors focus:border-blue-500 dark:focus:border-blue-400"
          placeholder=" "
        />
        <label
          htmlFor="verificationCode"
          className="absolute right-4 top-2 md:top-4 text-xs text-blue-300/70 dark:text-gray-400 transition-all duration-200 ease-out
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base
               peer-focus:top-0 peer-focus:text-[11px] md:peer-focus:text-[12px] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 peer-not-placeholder-shown:-top-2
               peer-not-placeholder-shown:text-xs md:peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md dark:peer-not-placeholder-shown:bg-gray-800"
        >
          {t('verifyCode')}
        </label>
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <svg
            width="16"
            height="13"
            className="md:w-[19px] md:h-[15px]"
            viewBox="0 0 19 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.58333 1.58333L8.0601 6.62082C8.66195 7.08892 9.50472 7.08892 10.1066 6.62082L16.5833 1.58333M3.41667 14.0833H14.75C15.6834 14.0833 16.1501 14.0833 16.5067 13.9017C16.8203 13.7419 17.0752 13.4869 17.235 13.1733C17.4167 12.8168 17.4167 12.3501 17.4167 11.4167V3.41667C17.4167 2.48325 17.4167 2.01654 17.235 1.66002C17.0752 1.34641 16.8203 1.09144 16.5067 0.931656C16.1501 0.75 15.6834 0.75 14.75 0.75H3.41667C2.48325 0.75 2.01654 0.75 1.66002 0.931656C1.34641 1.09144 0.931656 1.34641 0.75 1.66002C0.75 2.01654 0.75 2.48325 0.75 3.41667V11.4167C0.75 12.3501 0.75 12.8168 0.931656 13.1733C1.09144 13.4869 1.34641 13.7419 1.66002 13.9017C2.01654 14.0833 2.48325 14.0833 3.41667 14.0833Z"
              stroke="#0887CA"
              strokeOpacity="0.7"
              strokeWidth="1.5"
              className="dark:stroke-gray-400"
            />
          </svg>
        </div>
      </div>

      {error && <p className="text-red-500 dark:text-red-400 text-xs md:text-sm text-center -mt-2">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`h-11 md:h-12 w-full rounded-2xl text-white cursor-pointer transition-colors duration-300 ease-in-out text-sm md:text-base
          ${loading ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed" : "bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700"}`}
      >
        {loading ? t('verifying') : t('confirmAndRegister')}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="text-blue-100 dark:text-blue-200 h-11 md:h-12 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 font-bold border-2 border-blue-100 dark:border-blue-700 rounded-2xl text-[13px] md:text-[15px] transition-colors"
      >
        {t('previousStep')}
      </button>
    </form>
  );
};

export default StepTwoForm;