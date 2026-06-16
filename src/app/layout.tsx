import VoiceCommand from "@/components/VoiceCommand";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import LocalFont from "next/font/local";
import ClientLayout from "./ClientLayout";
import "./globals.css";

import { Metadata } from "next";
import ChatWidget from "@/components/chat/Chat";


const iran = LocalFont({
  src: "../assets/font/IRANSans-web.woff",
  variable: "--font-iran",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "رهن کده",
    template: "%s | رهن کده",
  },
  description: "رزرو سریع ویلا، هتل و آپارتمان در رهن کده با بهترین قیمت",
  metadataBase: new URL("http://localhost:3000"),
  keywords: ["رهن", "اجاره", "ویلا", "هتل", "آپارتمان", "رزرو آنلاین", "رهن کده", "اجاره روزانه"],
  authors: [{ name: "رهن کده" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: "رهن کده",
    locale: "fa_IR",
    type: "website",
    title: "رهن کده",
    description: "رزرو سریع ویلا، هتل و آپارتمان در رهن کده با بهترین قیمت",
  },
  twitter: {
    card: "summary_large_image",
    title: "رهن کده",
    description: "رزرو سریع ویلا، هتل و آپارتمان با بهترین قیمت",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={`${iran.className} bg-[#F5F5F5] overflow-x-hidden flex flex-col min-h-screen items-center text-black dark:from-[#121212] dark:via-blue-400 dark:to-[#121212] dark:bg-linear-to-br dark:text-white`}
      >
        <NextIntlClientProvider messages={messages}>
            <ClientLayout>{children}</ClientLayout>
            <ChatWidget/>
            <VoiceCommand />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}