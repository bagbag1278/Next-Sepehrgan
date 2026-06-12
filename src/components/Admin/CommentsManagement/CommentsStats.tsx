import { MessageSquare, Star, Home } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

interface CommentsStatsProps {
  totalComments: number;
  averageRating: string;
  uniqueHotelsCount: number;
}

export const CommentsStats = ({ totalComments, averageRating, uniqueHotelsCount }: CommentsStatsProps) => {
  const stats = [
    { label: "کل نظرات", value: totalComments, icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20", delay: 0.1 },
    { label: "میانگین امتیاز", value: averageRating, icon: Star, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/20", delay: 0.2, suffix: "از ۵" },
    { label: "هتل‌های دارای نظر", value: uniqueHotelsCount, icon: Home, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20", delay: 0.3 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, idx) => (
        <AdvancedScrollAnimation key={idx} type="fade" delay={stat.delay}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md hover:shadow-lg transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">
                  {stat.value}
                  {stat.suffix && <span className="text-sm font-normal mr-1">{stat.suffix}</span>}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon size={24} className={stat.color} />
              </div>
            </div>
          </div>
        </AdvancedScrollAnimation>
      ))}
    </div>
  );
};