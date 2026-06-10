// app/ClientLayout.tsx
"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/header/Header";
import NeshanMapLoader from "@/components/utils/NeshanMapLoader";
import ThemeManager from "@/components/utils/ThemeManager";
import { ThemeProvider } from "next-themes";
import VoiceCommand from "@/components/VoiceCommand";
import { usePathname } from "next/navigation";

const noLayoutRoutes = [
  "/admin",
  "/admin/",
  "/admin/HotelsManagement",
  "/admin/UsersManagment",
  "/admin/BookingsManagement",
  "/admin/CommentsManagement",
  "/admin/PaymentsManagement",
  "/admin/ChatsManagement",
  "/admin/AdminNotifications",
  "/login",
  "/register",
  "/404",
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const isNoLayoutRoute = noLayoutRoutes.some(route => 
    pathname === route || pathname?.startsWith(route)
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {isNoLayoutRoute ? (
        <main className="w-full  min-h-screen">{children}</main>
      ) : (
        <>
          <Header />
          <ThemeManager>
            <NeshanMapLoader />
            <main className="w-full">{children}</main>
          </ThemeManager>
          <Footer />
          <VoiceCommand />
        </>
      )}
    </ThemeProvider>
  );
}