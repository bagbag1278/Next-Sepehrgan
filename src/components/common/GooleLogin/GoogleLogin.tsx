"use client";

import React from "react";
import { useTranslations } from 'next-intl';

const GoogleLogin = () => {
  const t = useTranslations('Auth');

  return (
    <div>
      <button className="w-full py-1 bg-blue-300 dark:bg-blue-700 rounded-2xl font-medium text-white flex justify-center gap-2 items-center hover:bg-blue-400 dark:hover:bg-blue-600 transition-colors duration-200 cursor-pointer">
        <span className="text-2xl font-bold">G</span>
        <span className="text-[12px] font-light">{t('loginWithGoogle')}</span>
      </button>
      <div className="flex items-center justify-center mx-auto mt-5">
        <div className="flex-1 border-t border-blue-400/50 dark:border-blue-500"></div>
        <span className="px-2 text-blue-300 dark:text-blue-400 text-[12px]">{t('or')}</span>
        <div className="flex-1 border-t border-blue-400/50 dark:border-blue-500"></div>
      </div>
    </div>
  );
};

export default GoogleLogin;