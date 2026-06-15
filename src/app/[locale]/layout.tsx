import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ThemeProvider } from "next-themes";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer/Footer";
import "../globals.css";
import ThemeManager from '@/components/Untils/ThemeManager';
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  const validLocales = ['fa', 'en', 'ar'];
  if (!validLocales.includes(locale)) {
    notFound();
  }
  
  const messages = await getMessages();

  const isRTL = locale === 'fa' || locale === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className="overflow-x-hidden bg-white text-black dark:bg-black dark:text-white">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <ThemeManager>

              {/* <NeshanMapLoader /> */}

              <main className="w-full">{children}</main>
            </ThemeManager>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}