
import LocalFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/header/Header";

const iran = LocalFont({
  src: "../assets/font/IRANSans.ttf",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <html lang="fa" dir="ltr" suppressHydrationWarning>
      <body className={`${iran.className}  overflow-x-hidden bg-white text-black dark:bg-black dark:text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          
          <main>{children}</main>
          
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}