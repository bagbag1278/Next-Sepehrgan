import type { Metadata } from "next";
import Links from "@/components/Dashboard/buyer/info/Links";
import React, { FC, ReactNode } from "react";

export const metadata: Metadata = {
  title: "اطلاعات حساب",
  description: "مدیریت اطلاعات حساب کاربری در رهن کده",
  robots: {
    index: false,
    follow: false,
  },
};

interface IChildren {
  children: ReactNode;
}

const BuyerInfoLayout: FC<IChildren> = ({ children }) => {
  return (
    <>
      <div className="absolute top-16 pr-4 py-2.5 right-6 w-243 h-14 rounded-2xl dark:bg-slate-800 shadow-[0_0_8px] dark:shadow-slate-800 shadow-blue-300/15">
        <div>
          <Links />
        </div>
      </div>
      <div className="absolute pt-6 pr-6 top-32 right-6 w-243 h-110 rounded-2xl dark:bg-slate-800 shadow-[0_0_8px] dark:shadow-slate-800 shadow-blue-300/15">
        {children}
      </div>
    </>
  );
};

export default BuyerInfoLayout;