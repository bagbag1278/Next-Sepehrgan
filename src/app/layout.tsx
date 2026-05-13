<<<<<<< HEAD
// فایل اصلی: src/app/layout.tsx

"use client";
=======
>>>>>>> dcd68ad0423988d9833a75e7371d13233beccce3
import "./globals.css";
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

<<<<<<< HEAD
  return (
    <html lang="fa" dir="ltr" suppressHydrationWarning>
      <body className={`${iran.className} overflow-x-hidden bg-white text-black dark:bg-black dark:text-white`}>
=======
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${iran.className} overflow-x-hidden bg-white text-black dark:bg-[#121212] dark:text-white`}
      >
        {" "}
>>>>>>> dcd68ad0423988d9833a75e7371d13233beccce3
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
<<<<<<< HEAD
          <Header />
          
          <main>{children}</main>
          
          {!isBookingPage && <Footer />}
=======
        
          {children}
         
>>>>>>> dcd68ad0423988d9833a75e7371d13233beccce3
        </ThemeProvider>
      </body>
    </html>
  );
}