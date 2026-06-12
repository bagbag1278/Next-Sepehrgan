import { Edit, Trash2, User, Calendar, Clock } from "lucide-react";
import { BlogPost } from "../../../app/admin/AdminBlog/page";

interface BlogPostCardProps {
  post: BlogPost;
  onEdit: () => void;
  onDelete: () => void;
}

const formatDate = (dateStr: string) => {
  try {
    return new Date(dateStr).toLocaleDateString("fa-IR");
  } catch {
    return "—";
  }
};

export const BlogPostCard = ({ post, onEdit, onDelete }: BlogPostCardProps) => {
  return (
    <div className="rounded-2xl p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-all shadow-[0_0_8px] shadow-blue-300/20">
      
      {/* Mobile View */}
      <div className="flex flex-col gap-3 md:hidden">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-800 dark:text-white line-clamp-2 flex-1">{post.title}</h3>
          <div className="flex gap-2 mr-2">
            <button onClick={onEdit} className="p-2 hover:bg-blue-50 rounded-lg">
              <Edit size={16} className="text-blue-300" />
            </button>
            <button onClick={onDelete} className="p-2 hover:bg-red-50 rounded-lg">
              <Trash2 size={16} className="text-blue-500" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <User size={12} /> <span>نویسنده: {post.author_id}</span>
          <Clock size={12} className="mr-2" /> <span>{post.estimated_reading_time}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar size={12} /> <span>{formatDate(post.created_at)}</span>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{post.caption}</p>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex md:items-center justify-between w-full">
        <div className="w-[35%]">
          <p className="font-medium text-gray-800 dark:text-white truncate">{post.title}</p>
          <p className="text-xs text-gray-500 line-clamp-1 mt-1">{post.caption?.slice(0, 60)}</p>
        </div>
        <div className="w-[15%] text-gray-600 dark:text-gray-400">نویسنده: {post.author_id}</div>
        <div className="w-[15%] text-gray-500 flex items-center gap-1">
          <Clock size={14} /> {post.estimated_reading_time}
        </div>
        <div className="w-[20%] text-gray-500 text-sm flex items-center gap-1">
          <Calendar size={14} /> {formatDate(post.created_at)}
        </div>
        <div className="w-[15%] flex justify-center gap-2">
         <button onClick={onEdit} className="p-2 hover:bg-blue-50 rounded-lg">
              <Edit size={16} className="text-blue-300" />
            </button>
          <button onClick={onDelete} className="p-2 hover:bg-red-50 rounded-lg" title="حذف">
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};