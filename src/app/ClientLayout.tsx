"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/header/Header";
import ThemeManager from "@/components/Untils/ThemeManager";
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
  "/forgetpass",
  "/dashboard",
];

const noFooterRoutes = [
  "/housereserve",
  "/booking",
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isNoLayoutRoute = noLayoutRoutes.some(
    (route) => pathname === route || pathname?.startsWith(route),
  );

  const isNoFooterRoute = noFooterRoutes.some(
    (route) => pathname === route,
  );

  const isHouseReserveDetail = pathname?.startsWith("/housereserve/") && pathname !== "/housereserve";

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster position="top-center" gutter={8} />
      
      {isNoLayoutRoute ? (
        <main className="w-full min-h-screen">{children}</main>
      ) : isNoFooterRoute ? (
        <>
          <Header />
          <main className="w-full min-h-screen">{children}</main>
        </>
      ) : (
        <>
          <Header />
          {isHouseReserveDetail ? (
            <main className="w-full min-h-screen">{children}</main>
          ) : (
            <ThemeManager>
              <main className="w-full">{children}</main>
            </ThemeManager>
          )}
          <Footer />
        </>
      )}
    </ThemeProvider>
  );
}