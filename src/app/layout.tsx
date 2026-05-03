"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LocalFont from "next/font/local";
import "./globals.css";

import Footer from "@/components/Footer/Footer";

import { ThemeProvider } from "next-themes";


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
    <html lang="en" className="bg-amber-50  h-full antialiased flex justify-center">


      <body className={`flex flex-col w-360 ${iran.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

