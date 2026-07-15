import { CheckCircle, Clock, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = {
    confirmed: { icon: CheckCircle, className: "text-green-500" },
    pending: { icon: Clock, className: "text-yellow-500" },
    canceled: { icon: XCircle, className: "text-red-500" },
    cancelled: { icon: XCircle, className: "text-red-500" },
  };

  const { icon: Icon, className } = config[status as keyof typeof config] || {
    icon: XCircle,
    className: "text-gray-400",
  };

  return <Icon size={18} className={className} />;
};