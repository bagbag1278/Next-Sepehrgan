"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
// فرض می‌کنیم این مسیرها برای آیکون‌ها صحیح هستند
// اگر مسیرها متفاوت هستند، لطفاً آن‌ها را اصلاح کنید
import Payment from "../icon/PaymentSVG";
import EditSVG from "../icon/EditSVG";

const Links = () => {
  const pathname = usePathname();
  const links = [
    {
      name: "اطلاعات فردی",
      href: "/dashboard/buyer/buyerinfo",
      icon: <EditSVG />,
    },
    {
      name: "امنیت",
      href: "/dashboard/buyer/buyerinfo/security",
      icon: <Payment />,
    },
  ];

  return (
    <div className="w-82.75 h-9 flex items-center gap-6">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href} // اضافه کردن کلید برای map
            href={link.href}
            className={`flex items-center justify-center gap-2 text-[15px] transition-opacity rounded-xl ${
              isActive
                ? " bg-blue-400/10 h-10 pr-4 pl-2" 
                : "text-blue-400 dark:text-white h-6 opacity-70 hover:opacity-100 px-2"
            }`}
          >
            {/* نمایش آیکون */}
            <span className="text-[15px] flex items-center">{link.icon}</span>
            {/* نمایش نام لینک */}
            <span className="text-[15px]">{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Links;

