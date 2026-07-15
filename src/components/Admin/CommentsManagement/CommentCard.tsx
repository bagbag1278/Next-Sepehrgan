import { Home, Star, Calendar, Edit, Trash2, Eye } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

interface CommentCardProps {
  comment: any;
  index: number;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const formatDate = (dateStr: string) => {
  try {
    return new Date(dateStr).toLocaleDateString("fa-IR");
  } catch {
    return "نامشخص";
  }
};

const renderStars = (rating: string) => {
  const rate = Number(rating);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= rate ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"}
        />
      ))}
    </div>
  );
};

export const CommentCard = ({ comment, index, onView, onEdit, onDelete }: CommentCardProps) => {
  const fullName = `${comment.user?.firstName || ""} ${comment.user?.lastName || ""}`.trim() || "کاربر ناشناس";

  return (
    <AdvancedScrollAnimation type="slide-up" delay={0.1 + index * 0.05} duration={0.4}>
      <div className="rounded-2xl p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-all shadow-[0_0_8px] shadow-blue-300/20">
        
        {/* Mobile View */}
        <div className="flex flex-col gap-3 md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                {comment.user?.firstName?.charAt(0) || "ک"}
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-white text-sm">{fullName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Calendar size={10} /> {formatDate(comment.created_at)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={onView} className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                <Eye size={16} className="text-blue-500" />
              </button>
              <button onClick={onEdit} className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                <Edit size={16} className="text-blue-300  " />
              </button>
              <button onClick={onDelete} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Home size={14} className="text-gray-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300 line-clamp-1">{comment.house?.title || "هتل نامشخص"}</span>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-white line-clamp-1">{comment.title || "بدون عنوان"}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{comment.caption}</p>
          </div>
          
          <div className="flex justify-between items-center">
            {renderStars(comment.rating)}
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{comment.rating} / ۵</span>
          </div>
        </div>

        <div className="hidden md:flex md:items-center justify-between w-full">
          <div className="w-[15%] flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold flex-shrink-0">
              {comment.user?.firstName?.charAt(0) || "ک"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-800 dark:text-white text-sm truncate">{fullName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(comment.created_at)}</p>
            </div>
          </div>
          
          <div className="w-[20%] min-w-0">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-300 truncate">{comment.house?.title || "هتل نامشخص"}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{comment.house?.address || "آدرس نامشخص"}</p>
          </div>
          
          <div className="w-[25%] min-w-0">
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300 truncate">{comment.title || "بدون عنوان"}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{comment.caption}</p>
          </div>
          
          <div className="w-[13%] flex items-center gap-2">
            {renderStars(comment.rating)}
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{comment.rating}</span>
          </div>
          
          <div className="w-[15%] relative left-2 text-gray-500 text-sm">
            {formatDate(comment.created_at)}
          </div>
          
          <div className="w-[15%] flex justify-center gap-2">
            <button onClick={onView} className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="جزئیات">
              <Eye size={18} className="text-blue-500" />
            </button>
            <button onClick={onEdit} className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="ویرایش">
              <Edit size={18} className="text-blue-300" />
            </button>
            <button onClick={onDelete} className="p-2  hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="حذف">
              <Trash2 size={18} className="text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </AdvancedScrollAnimation>
  );
};