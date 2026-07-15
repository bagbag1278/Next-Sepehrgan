import { Users, UserCog, Store, User as UserIcon } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

interface UsersStatsProps {
  totalUsers: number;
  adminCount: number;
  sellerCount: number;
  buyerCount: number;
}

export const UsersStats = ({ totalUsers, adminCount, sellerCount, buyerCount }: UsersStatsProps) => {
  const stats = [
    { label: "کل کاربران", value: totalUsers, icon: Users, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20", delay: 0.1 },
    { label: "ادمین‌ها", value: adminCount, icon: UserCog, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20", delay: 0.2 },
    { label: "فروشندگان", value: sellerCount, icon: Store, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20", delay: 0.3 },
    { label: "کاربران عادی", value: buyerCount, icon: UserIcon, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20", delay: 0.4 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <AdvancedScrollAnimation key={idx} type="fade" delay={stat.delay}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon size={20} className={stat.color} />
              </div>
            </div>
          </div>
        </AdvancedScrollAnimation>
      ))}
    </div>
  );
};