import Footer from "@/components/Footer/Footer";
import Header from "@/components/header/Header";
import NeshanMapLoader from "@/components/utils/NeshanMapLoader";
import ThemeManager from "@/components/utils/ThemeManager";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import LocalFont from "next/font/local";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <body
        className={`${iran.className} flex flex-col min-h-screen items-center text-black transition-colors duration-500
                bg-white bg-linear-to-br 
                dark:from-[#121212] dark:via-gray-900 dark:to-[#121212] dark:bg-linear-to-br dark:text-white`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <ThemeManager>
            <NeshanMapLoader />
            <main className=" w-full ">{children}</main>
          </ThemeManager>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
