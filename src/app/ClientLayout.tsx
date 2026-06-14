"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/header/Header";
import ThemeManager from "@/components/utils/ThemeManager";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

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
  "/admin/SocialLink",
  "/admin/AdminBlog",
  "/login",
  "/register",
  "/404",
];

const noLayoutBooking = ["/housereserve", "/booking"];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isNoLayoutRoute = noLayoutRoutes.some(
    (route) => pathname === route || pathname?.startsWith(route),
  );

  const isBookingRoute = noLayoutBooking.some((route) =>
    pathname?.startsWith(route),
  );

  if (isBookingRoute) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster position="top-center" gutter={8} />
        <Header />
        <main className="w-full min-h-screen">{children}</main>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster position="top-center" gutter={8} />
      {isNoLayoutRoute ? (
        <main className="w-full min-h-screen">{children}</main>
      ) : (
        <>
          <Header />
          <ThemeManager>
            <main className="w-full">{children}</main>
          </ThemeManager>
          <Footer />
        </>
      )}
    </ThemeProvider>
  );
}