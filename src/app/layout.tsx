import Footer from "@/components/Footer/Footer";
import Header from "@/components/header/Header";
import NeshanMapLoader from "@/components/utils/NeshanMapLoader";
import ThemeManager from "@/components/utils/ThemeManager";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import LocalFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <body
        className={`${iran.className} bg-white text-black dark:bg-black dark:text-white`}
      >
        {/* اضافه کردن مدیریت خطای اسکریپت‌ها */}
        <Script
          id="error-handler"
          strategy="beforeInteractive"
        >
          {`
            window.addEventListener('error', function(e) {
              if (e.target.tagName === 'SCRIPT') {
                console.warn('Script failed to load:', e.target.src);
                return true;
              }
            });
          `}
        </Script>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <ThemeManager>
            <NeshanMapLoader />
            <main className="w-full">{children}</main>
          </ThemeManager>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}