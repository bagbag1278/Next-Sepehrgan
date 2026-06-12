import { User, Calendar, Clock, LinkIcon, Edit2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import DeletePaymentButton from "./Action/DeletePaymentButton";

interface Payment {
  id: number;
  userId: number;
  amount: string;
  status: string;
  description: string;
  transactionId?: string;
  paymentUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface PaymentCardProps {
  payment: Payment;
  index: number;
  userName: string;
  onEdit: () => void;
  onDelete: (id: number) => Promise<void>;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/30", label: "پرداخت شده" };
    case "pending":
      return { icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/30", label: "در انتظار" };
    case "failed":
      return { icon: XCircle, color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/30", label: "ناموفق" };
    default:
      return { icon: AlertCircle, color: "text-gray-600", bg: "bg-gray-50 dark:bg-gray-800", label: "نامشخص" };
  }
};

const formatDate = (str: string) => {
  if (!str) return "-";
  try {
    return new Date(str).toLocaleDateString("fa-IR");
  } catch {
    return "-";
  }
};

const formatTime = (str: string) => {
  if (!str) return "-";
  try {
    return new Date(str).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "-";
  }
};

export const PaymentCard = ({ payment, index, userName, onEdit, onDelete }: PaymentCardProps) => {
  const status = getStatusIcon(payment.status);
  const StatusIcon = status.icon;

  const handleDelete = () => {
    return onDelete(payment.id);
  };

  return (
    <AdvancedScrollAnimation type="slide-up" delay={0.4 + index * 0.05} duration={0.4}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all shadow-[0_0_8px] shadow-blue-300/20">
        {/* Mobile View */}
        <div className="flex flex-col gap-3 md:hidden">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-800 dark:text-white">#{payment.id}</span>
            <div className="flex gap-2">
              <button
                onClick={onEdit}
                className="p-2 rounded-lg transition-transform duration-200 group-hover:scale-110 transition-colors"
                title="ویرایش"
              >
                <Edit2 size={16} className="text-[#0887CAB2]" />
              </button>
              <DeletePaymentButton
                paymentId={payment.id}
                paymentTitle={`پرداخت ${userName}`}
                onDelete={handleDelete}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium ${status.bg} ${status.color}`}>
              <StatusIcon size={12} />
              {status.label}
            </span>
            <span className="text-[#0887CAB2] font-bold">
              {parseFloat(payment.amount).toLocaleString()} تومان
            </span>
          </div>
          <div className="flex items-center gap-2">
            <User size={16} className="text-gray-400" />
            <span className="text-gray-800 dark:text-white text-sm">{userName}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <Calendar size={12} />
            <span>{formatDate(payment.createdAt)}</span>
            <Clock size={12} className="mr-2" />
            <span>{formatTime(payment.createdAt)}</span>
          </div>
          <div className="text-xs text-gray-500 line-clamp-2">
            {payment.description || "-"}
          </div>
          {payment.transactionId && (
            <div className="text-xs text-gray-400">
              کد تراکنش: {payment.transactionId}
            </div>
          )}
          {payment.paymentUrl && (
            <a
              href={payment.paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0887CAB2] text-xs flex items-center gap-1 hover:underline"
            >
              <LinkIcon size={12} />
              لینک پرداخت
            </a>
          )}
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex md:items-center justify-between w-full">
          <div className="w-[8%] font-mono text-gray-800 dark:text-white text-sm">
            #{payment.id}
          </div>
          <div className="w-[15%] text-gray-800 dark:text-white truncate text-sm">
            {userName}
          </div>
          <div className="w-[12%] font-bold text-[#0887CAB2] text-sm">
            {parseFloat(payment.amount).toLocaleString()} تومان
          </div>
          <div className="w-[12%]">
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${status.bg} ${status.color}`}>
              <StatusIcon size={12} />
              {status.label}
            </span>
          </div>
          <div className="w-[10%] text-gray-500 text-sm">
            {formatDate(payment.createdAt)}
          </div>
          <div className="w-[8%] text-gray-500 text-sm">
            {formatTime(payment.createdAt)}
          </div>
          <div className="w-[15%] text-gray-500 text-sm truncate" title={payment.description}>
            {payment.description || "-"}
          </div>
          <div className="w-[10%] text-gray-500 text-sm truncate" title={payment.transactionId}>
            {payment.transactionId || "-"}
          </div>
          <div className="w-[10%] flex justify-center gap-2">
            <button
              onClick={onEdit}
              className="p-2 rounded-lg transition-transform duration-200 group-hover:scale-110 ansition-colors"
              title="ویرایش"
            >
              <Edit2 size={16} className="text-[#0887CAB2] " />
            </button>
            <DeletePaymentButton
              paymentId={payment.id}
              paymentTitle={`پرداخت ${userName}`}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </AdvancedScrollAnimation>
  );
};