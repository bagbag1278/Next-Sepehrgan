import { MessageSquare, Users, Clock } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

interface ChatsStatsProps {
  roomsCount: number;
  usersCount: number;
  messagesCount: number;
}

export const ChatsStats = ({ roomsCount, usersCount, messagesCount }: ChatsStatsProps) => {
  const stats = [
    { label: "کل گفتگوها", value: roomsCount, icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/20", delay: 0.1 },
    { label: "کاربران درگیر", value: usersCount, icon: Users, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/20", delay: 0.2 },
    { label: "پیام‌ها", value: messagesCount, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100 dark:bg-yellow-900/20", delay: 0.3 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, idx) => (
        <AdvancedScrollAnimation key={idx} type="fade" delay={stat.delay}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        </AdvancedScrollAnimation>
      ))}
    </div>
  );
};