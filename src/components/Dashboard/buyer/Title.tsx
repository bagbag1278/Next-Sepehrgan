"use client";

import { usePathname } from "next/navigation";
import React from "react";

const Title = () => {
  const pathname = usePathname();
  const titleMap = [
    { title: "داشبورد", path: "/dashboard/buyer" },
    { title: "اطلاعات کاربری", path: "/dashboard/buyer/buyerinfo" },
    { title: "مدیریت رزرو ها", path: "/dashboard/buyer/manegereserve" },
    { title: "علاقه مندی ها", path: "/dashboard/buyer/favorite" },
    { title: "پرداخت ها", path: "/dashboard/buyer/payment" },
    { title: "اعلان ها", path: "/dashboard/buyer/notification" },
    { title: "امنیت", path: "/dashboard/buyer/buyerinfo/security" },
  ];

  const currentTitle =
    titleMap.find((item) => item.path === pathname)?.title || "صفحه نامعلوم";

  return <div className="text-lg font-bold text-blue-200 dark:text-blue-300">{currentTitle}</div>;
};

export default Title;
