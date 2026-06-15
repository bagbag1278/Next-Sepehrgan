import VoiceCommand from "@/components/VoiceCommand";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import LocalFont from "next/font/local";
import ClientLayout from "./ClientLayout";
import "./globals.css";

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
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={`${iran.className} bg-[#F5F5F5] overflow-x-hidden flex flex-col min-h-screen items-center text-black dark:from-[#121212] dark:via-blue-400 dark:to-[#121212] dark:bg-linear-to-br dark:text-white`}
      >
        <NextIntlClientProvider messages={messages}>
            <ClientLayout>{children}</ClientLayout>
            <VoiceCommand />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}