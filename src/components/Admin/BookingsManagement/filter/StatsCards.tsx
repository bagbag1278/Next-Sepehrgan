import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

interface StatsCardsProps {
  total: number;
  confirmed: number;
  pending: number;
  canceled: number;
}

export const StatsCards = ({ total, confirmed, pending, canceled }: StatsCardsProps) => {
  const stats = [
    { label: "کل رزروها", value: total, color: "text-gray-800 dark:text-white", delay: 0.1 },
    { label: "تأیید شده", value: confirmed, color: "text-green-600", delay: 0.2 },
    { label: "در انتظار", value: pending, color: "text-yellow-600", delay: 0.3 },
    { label: "لغو شده", value: canceled, color: "text-red-600", delay: 0.4 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <AdvancedScrollAnimation key={idx} type="fade" delay={stat.delay}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
            <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        </AdvancedScrollAnimation>
      ))}
    </div>
  );
};