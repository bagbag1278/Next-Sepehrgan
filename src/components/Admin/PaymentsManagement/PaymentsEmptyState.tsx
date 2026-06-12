import { DollarSign } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

export const PaymentsEmptyState = () => {
  return (
    <AdvancedScrollAnimation type="scale" delay={0.2}>
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow">
        <DollarSign size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
        <p className="text-gray-500 dark:text-gray-400">هیچ پرداختی یافت نشد</p>
      </div>
    </AdvancedScrollAnimation>
  );
};