"use client";

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
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (

    <html lang="en" suppressHydrationWarning>
      <body
<<<<<<< HEAD
        className={`${iran.className} overflow-x-hidden bg-white text-black dark:bg-black dark:text-white`}
=======
        className={`${iran.className} bg-white overflow-x-hidden flex flex-col min-h-screen items-center text-black dark:bg-black dark:text-white`}
>>>>>>> 47ba05b (a)
      >
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
<<<<<<< HEAD
          <Header />
          {children}
          <Footer />
=======
          <Toaster position="top-center" gutter={8} />

          <Header/>
          <main className=" w-full max-w-360 ">{children}</main>
          <Footer/>
>>>>>>> 47ba05b (a)
        </ThemeProvider>
      </body>
    </html>
  );
}
