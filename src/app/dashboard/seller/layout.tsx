import DashboardHeader from "@/components/Dashboard/header";
import DarkModeHero from "@/components/landing/components/HeroSction/HeroFilter/DarkModeHero";
import Link from "next/link";
import { cookies } from "next/headers";
import SellersideBar from '../../../components/DashboardSeller/SellersideBar'
import { redirect } from "next/navigation";

interface IChildren {
  children: React.ReactNode;
}


export default async function SellerLayout({ children, }: IChildren) {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken");

  if (!token) {
    redirect("/login");
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen   bg-gray-50 dark:bg-gray-900 p-6"
    >
      {/* دسکتاپ */}
      <div className="hidden lg:grid grid-cols-[280px_1fr] gap-6">
        {/* سایدبار */}
        <SellersideBar />

        <div className=" flex flex-wrap gap-10   ">
          {/* هدر */}
          <header className="w-255 h-18 rounded-2xl shadow-[0_0_8px] shadow-blue-300/30 dark:shadow-blue-500/10 bg-white dark:bg-blue-400 p-4">
            <div className=" flex justify-between items-center">
              <DashboardHeader />
            </div>
          </header>


          <main className="relative w-255 h-168  rounded-tl-[40px] rounded-br-[40px] shadow-[0_0_8px] shadow-blue-300/15 dark:shadow-blue-500/5 bg-white dark:bg-blue-400 p-4 sm:p-6">
            {children}
          </main>

        </div>
      </div>


      {/* mobile  */}
      <div className="lg:hidden">
        {/* <MobileSidebar menuItems={MenuItems}> */}
        {children}
        {/* </MobileSidebar> */}
      </div>
    </div>
  );
}