"use client";

import { usePathname, useParams } from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();

  const isHideLayout = pathname?.includes(`/booking`) || pathname?.includes(`housereserve/${params.id}/booking`);

  return (
    <>
      {!isHideLayout && <Header />}
      <main>{children}</main>
      {!isHideLayout && <Footer />}
    </>
  );
}