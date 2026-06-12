// components/Admin/PaymentsManagement/PaymentsStats.tsx
import { CreditCard, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

interface PaymentsStatsProps {
  totalCount: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
}

export const PaymentsStats = ({ totalCount, totalAmount, paidAmount, pendingAmount }: PaymentsStatsProps) => {
  const stats = [
    { label: "کل تراکنش‌ها", value: totalCount, icon: CreditCard, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20", delay: 0.1 },
    { label: "مجموع مبلغ", value: totalAmount.toLocaleString(), icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20", delay: 0.2, suffix: "تومان" },
    { label: "پرداخت شده", value: paidAmount.toLocaleString(), icon: CheckCircle, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20", delay: 0.3, suffix: "تومان" },
    { label: "در انتظار", value: pendingAmount.toLocaleString(), icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/20", delay: 0.4, suffix: "تومان" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <AdvancedScrollAnimation key={idx} type="fade" delay={stat.delay}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <p className="text-gray-500 dark:text-gray-400 text-sm truncate">{stat.label}</p>
                <p className="text-base sm:text-lg font-bold mt-1 text-gray-800 dark:text-white break-words">
                  {stat.value}
                  {stat.suffix && <span className="text-xs font-normal mr-1 whitespace-nowrap">{stat.suffix}</span>}
                </p>
              </div>
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0 mr-2`}>
                <stat.icon size={20} className={stat.color} />
              </div>
            </div>
          </div>
        </AdvancedScrollAnimation>
      ))}
    </div>
  );
};