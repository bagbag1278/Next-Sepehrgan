import { Calendar } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export const EmptyState = ({ 
  title = "هیچ رزروی یافت نشد",
  message = "هیچ رزروی با این مشخصات وجود ندارد"
}: EmptyStateProps) => {
  return (
    <AdvancedScrollAnimation type="scale" delay={0.2}>
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow">
        <Calendar size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
        <p className="text-gray-500 dark:text-gray-400 font-medium">{title}</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">{message}</p>
      </div>
    </AdvancedScrollAnimation>
  );
};

export default EmptyState;