"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";

const AuthButtons = () => {
  const t = useTranslations('Auth');

  return (
    <div className="flex items-center gap-3">
      <Link href="/login">
        <span className="text-blue-100 font-bold cursor-pointer text-[16px] z-50 dark:text-[#28A5E6]">
          {t('login')}
        </span>
      </Link>
      <Link href="/register">
        <span className="bg-[#F5F5F5] shadow-[8px_0px_20px_rgba(8,135,202,0.30)] z-50 border-gray-200 px-6 py-2 rounded-2xl text-blue-100 dark:text-[#28A5E6] font-bold cursor-pointer text-[14px] inline-block">
          {t('register')}
        </span>
      </Link>
    </div>
  );
};

export default AuthButtons;