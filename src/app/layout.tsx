import Header from "@/components/header/Header";
import "./globals.css";
import { ThemeProvider } from "next-themes";

import { Geist, Geist_Mono } from "next/font/google";
import LocalFont from "next/font/local";
import Footer from "@/components/Footer/Footer";
import LayoutWrapper from "./(main)/housereserve/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const iran = LocalFont({
  src: "../assets/font/IRANSans-web.woff",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${iran.className} overflow-x-hidden bg-white text-black dark:bg-[#121212] dark:text-white`}
      >
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
