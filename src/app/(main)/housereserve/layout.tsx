"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function HouseReserveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const shouldHide = pathname?.includes("/booking");

  return (
    <>
    
      {children}
    </>
  );
}