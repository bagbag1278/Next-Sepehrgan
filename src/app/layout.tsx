"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LocalFont from "next/font/local";
import "./globals.css";
<<<<<<< HEAD
import Footer from "@/components/Footer/Footer";
=======
import { ThemeProvider } from "next-themes";
>>>>>>> e7c1f23d90dc8265aa13f3b023e04b299362d0cc

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html lang="en" className="bg-amber-50 ">
      <body
        className={`bg-[#121212] ${iran.className} p-0 m-0`}
      >
        {children}
        <Footer />
=======
    <html lang="en" className=" h-full antialiased flex justify-center">
      <body className={`flex flex-col w-360 ${iran.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
        </ThemeProvider>
>>>>>>> e7c1f23d90dc8265aa13f3b023e04b299362d0cc
      </body>
    </html>
  );
}

