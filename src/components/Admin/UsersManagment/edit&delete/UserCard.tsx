import { Mail, Phone, CalendarDays } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import EditUser from "@/app/Admin/UsersManagment/edit&delete/EditUser";
import DeleteUser from "@/app/Admin/UsersManagment/edit&delete/DeleteUsers";
import { User } from "../page";

interface UserCardProps {
  user: User;
  index: number;
  onEdit: (updatedUser: User, originalUser?: User) => Promise<void>;
  onDelete: (id: number) => void;  
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("fa-IR");
  } catch {
    return "—";
  }
};

const getRoleBadge = (role: string) => {
  switch (role) {
    case "admin":
      return { label: "ادمین", className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" };
    case "seller":
      return { label: "فروشنده", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" };
    default:
      return { label: "کاربر عادی", className: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300" };
  }
};

export const UserCard = ({ user, index, onEdit, onDelete }: UserCardProps) => {
  const roleBadge = getRoleBadge(user.role);
  const firstLetter = user.fullName?.charAt(0) || "ک";

  const handleEdit = async (updatedUser: User, originalUser?: User) => {
    await onEdit(updatedUser, originalUser);
  };

  const handleDelete = () => {
    onDelete(user.id);
  };

  return (
    <AdvancedScrollAnimation type="slide-up" delay={0.4 + index * 0.05} duration={0.4}>
      <div className="rounded-2xl p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-all shadow-[0_0_8px] shadow-blue-300/20">
        
        {/* Mobile View */}
        <div className="flex flex-col gap-3 md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-sm">
                {firstLetter}
              </div>
              <span className="font-medium text-gray-800 dark:text-white">{user.fullName}</span>
            </div>
            <div className="flex items-center gap-2">
              <EditUser user={user} onEdit={handleEdit} />
              <DeleteUser user={user} onDelete={handleDelete} />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400 text-sm break-all">{user.email}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400 text-sm">{user.phoneNumber || "—"}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${roleBadge.className}`}>
              {roleBadge.label}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <CalendarDays size={12} />
              {formatDate(user.created_at)}
            </span>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex md:items-center justify-between w-full">
          <div className="w-[25%] flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-sm flex-shrink-0">
              {firstLetter}
            </div>
            <span className="font-medium text-gray-800 dark:text-white truncate">{user.fullName}</span>
          </div>
          
          <div className="w-[20%] text-gray-600 dark:text-gray-400 truncate text-sm">
            {user.email}
          </div>
          
          <div className="w-[15%] text-gray-600 dark:text-gray-400 text-sm">
            {user.phoneNumber || "—"}
          </div>
          
          <div className="w-[12%]">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${roleBadge.className}`}>
              {roleBadge.label}
            </span>
          </div>
          
          <div className="w-[15%] flex items-center gap-1 text-sm text-gray-500">
            <CalendarDays size={14} />
            <span>{formatDate(user.created_at)}</span>
          </div>
          
          <div className="w-[13%] flex items-center justify-center gap-2">
            <EditUser user={user} onEdit={handleEdit} />
            <DeleteUser user={user} onDelete={handleDelete} />
          </div>
        </div>
      </div>
    </AdvancedScrollAnimation>
  );
};