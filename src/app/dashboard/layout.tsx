import type { Metadata } from "next";
import React, { FC, ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "داشبورد",
    template: "%s | رهن کده",  
  },
  robots: {
    index: false,
    follow: false,
  },
};

interface IChildren {
  children: ReactNode;
}

const DashboardLayout: FC<IChildren> = ({ children }) => {
  return (
    <div dir="rtl" className="min-h-screen flex justify-center items-center">
      {children}
    </div>
  );
};

export default DashboardLayout;