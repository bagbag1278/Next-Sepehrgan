import LayoutWrapper from "@/components/layout/LayoutWrapper";

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
        className={`${iran.className} bg-[#F5F5F5] overflow-x-hidden flex flex-col min-h-screen items-center text-black dark:from-[#121212] dark:via-blue-400 dark:to-[#121212] dark:bg-linear-to-br dark:text-white`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
