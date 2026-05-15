import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/header/Header";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import LocalFont from "next/font/local";

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
  // اگر فونت شما اعداد فارسی (۱۲۳) دارد، این خط را اضافه کن:
  // style: 'normal',
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <body
        className={`${iran.className} bg-white flex flex-col min-h-screen items-center text-black dark:bg-black dark:text-white`}
      >
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className=" w-full max-w-360 ">{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
