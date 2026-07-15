import { Users, Building2, CalendarCheck, Star } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

interface DashboardStatsCardsProps {
  stats: {
    totalUsers: number;
    totalHouses: number;
    totalBookings: number;
    averageRating: number;
  };
}

const toPersianNum = (num: number) => num.toLocaleString("fa-IR");

export const DashboardStatsCards = ({ stats }: DashboardStatsCardsProps) => {
  const cards = [
    { id: 1, title: "کاربران کل", value: toPersianNum(stats.totalUsers), icon: Users, bg: "bg-blue-50 dark:bg-blue-900/20", iconColor: "text-blue-600" },
    { id: 2, title: "کل املاک", value: toPersianNum(stats.totalHouses), icon: Building2, bg: "bg-green-50 dark:bg-green-900/20", iconColor: "text-green-600" },
    { id: 3, title: "کل رزروها", value: toPersianNum(stats.totalBookings), icon: CalendarCheck, bg: "bg-amber-50 dark:bg-amber-900/20", iconColor: "text-amber-600" },
    { id: 4, title: "میانگین امتیاز", value: stats.averageRating.toFixed(1), icon: Star, bg: "bg-yellow-50 dark:bg-yellow-900/20", iconColor: "text-yellow-600", suffix: "از ۵" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((item, idx) => (
        <AdvancedScrollAnimation key={item.id} type="fade" delay={0.1 + idx * 0.05}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md hover:shadow-lg transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{item.title}</p>
                <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">
                  {item.value}
                  {item.suffix && <span className="text-sm font-normal mr-1">{item.suffix}</span>}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center`}>
                <item.icon size={24} className={item.iconColor} />
              </div>
            </div>
          </div>
        </AdvancedScrollAnimation>
      ))}
    </div>
  );
};