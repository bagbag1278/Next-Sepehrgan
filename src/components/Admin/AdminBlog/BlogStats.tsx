// components/Admin/AdminBlog/BlogStats.tsx
import { FileText, Eye, Clock } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

interface BlogStatsProps {
  totalCount: number;
}

export const BlogStats = ({ totalCount }: BlogStatsProps) => {
  const stats = [
    { label: "کل پست‌ها", value: totalCount, icon: FileText, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20", delay: 0.1 },
    { label: "منتشر شده", value: totalCount, icon: Eye, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20", delay: 0.2 },
    { label: "پیش‌نویس", value: 0, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/20", delay: 0.3 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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