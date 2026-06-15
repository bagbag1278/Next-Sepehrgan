"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer/Footer";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hiddenRoutes = [
    "/dashboard",
    "/login",
    "/register",
    "/forgot-password","/chat",
  ];

  const hideHeaderFooter = hiddenRoutes.some((route) =>
    pathname.startsWith(route),
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster position="top-center" gutter={8} />
      {!hideHeaderFooter && <Header />}
      <main className="w-full max-w-360">{children}</main>
      {!hideHeaderFooter && <Footer />}
    </ThemeProvider>
  );
}
