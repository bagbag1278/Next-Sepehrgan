// فایل اصلی: src/app/layout.tsx

"use client";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/header/Header";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import LocalFont from "next/font/local";

const iran = LocalFont({
  src: "../assets/font/IRANSans-web.woff", 
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const isBookingPage = pathname?.includes("/booking");

  return (
    <html lang="fa" dir="ltr" suppressHydrationWarning>
      <body className={`${iran.className} overflow-x-hidden bg-white text-black dark:bg-black dark:text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          
          <main>{children}</main>
          
          {!isBookingPage && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  );
}