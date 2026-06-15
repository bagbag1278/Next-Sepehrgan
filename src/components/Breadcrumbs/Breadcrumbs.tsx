"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useTranslations } from "next-intl";
  
interface Breadcrumb {
  label: string;
  href: string;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations("Breadcrumbs");
  const segments = pathname.split("/").filter((segment) => segment !== "");

  const breadcrumbs: Breadcrumb[] = segments.map((segment, index) => {
    let label = segment.charAt(0).toUpperCase() + segment.slice(1);
    
    if (segment === "housereserve") label = t("hotelReserve");
    if (segment === "articles") label = t("articles");
    if (segment === "blog") label = t("blog");
    if (segment === "contactus") label = t("contactUs");
    if (segment === "dashboard") label = t("dashboard");
    if (segment === "admin") label = t("admin");
    if (segment === "login") label = t("login");
    if (segment === "register") label = t("register");
    if (segment === "about") label = t("about");
    if (segment === "faq") label = t("faq");
    if (segment === "HouseReserveDetails") label = t("houseReserveDetails");

    return {
      label: label,
      href: `/${segments.slice(0, index + 1).join("/")}`,
    };
  });

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex text-sm space-x-2 text-blue-400 dark:text-gray-300 rtl:space-x-reverse">
        <li key="home" className="opacity-70">
          <Link href="/">{t("home")}</Link>
        </li>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            <span className="mx-1">/</span>
            <li
              key={crumb.href}
              className={index === breadcrumbs.length - 1 ? "font-bold text-blue-100 dark:text-blue-300" : ""}
            >
              <Link href={crumb.href}>{crumb.label}</Link>
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}