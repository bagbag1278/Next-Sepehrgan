import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { Geist, Geist_Mono } from "next/font/google";
import LocalFont from "next/font/local";
import "./globals.css";

const iran = LocalFont({
  src: "../assets/font/IRANSans-web.woff",
  variable: "--font-iran",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${iran.className} bg-[#F5F5F5] overflow-x-hidden flex flex-col min-h-screen items-center text-black dark:bg-linear-to-br from-blue-400 via-blue- to-blue-400 dark:text-white`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
