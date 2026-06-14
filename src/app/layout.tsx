
import Footer from "@/components/Footer/Footer";
import Header from "@/components/header/Header";
import NeshanMapLoader from "@/components/utils/NeshanMapLoader";
import ThemeManager from "@/components/utils/ThemeManager";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";

import LayoutWrapper from "@/components/layout/LayoutWrapper";


import LocalFont from "next/font/local";
import VoiceCommand from "@/components/VoiceCommand";
import "./globals.css";

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
  variable: "--font-iran",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html lang="fa" suppressHydrationWarning>
      <body
        className={`${iran.className} bg-[#F5F5F5] overflow-x-hidden flex flex-col min-h-screen items-center text-black dark:from-[#121212] dark:via-blue-400 dark:to-[#121212] dark:bg-linear-to-br dark:text-white`}

      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <ThemeManager>
              <NeshanMapLoader />
              <main className="w-full">{children}</main>
            </ThemeManager>
            <Footer />
            <VoiceCommand />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}