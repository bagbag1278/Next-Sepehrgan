import { 
  Camera,         
  Briefcase,       
  Send, 
  Globe, 
  MessageCircle, 
  MessageSquare, 
  Edit, 
  Trash2, 
  ExternalLink 
} from "lucide-react";
import { SocialLink } from "../../../app/Admin/SocialLink/page";

interface SocialLinkCardProps {
  link: SocialLink;
  onEdit: () => void;
  onDelete: () => void;
}

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "instagram":
      return <Camera size={20} className="text-pink-500" />;
    case "linkedin":
      return <Briefcase size={20} className="text-blue-600" />;
    case "telegram":
      return <Send size={20} className="text-blue-500" />;
    case "whatsapp":
      return <MessageCircle size={20} className="text-green-500" />;
    case "bale":
      return <MessageSquare size={20} className="text-cyan-500" />;
    case "website":
      return <Globe size={20} className="text-purple-500" />;
    default:
      return <Globe size={20} className="text-gray-500" />;
  }
};

const getPlatformLabel = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "instagram": return "اینستاگرام";
    case "linkedin": return "لینکدین";
    case "telegram": return "تلگرام";
    case "whatsapp": return "واتساپ";
    case "bale": return "بله";
    case "website": return "وبسایت";
    default: return platform;
  }
};

export const SocialLinkCard = ({ link, onEdit, onDelete }: SocialLinkCardProps) => {
  return (
    <div className="rounded-2xl p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-all shadow-[0_0_8px] shadow-blue-300/20">
      
      {/* Mobile View */}
      <div className="flex flex-col gap-3 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getPlatformIcon(link.platform)}
            <span className="font-medium text-gray-800 dark:text-white">{getPlatformLabel(link.platform)}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={onEdit} className="p-2 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors">
              <Edit size={16} className="text-yellow-500" />
            </button>
            <button onClick={onDelete} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
              <Trash2 size={16} className="text-red-500" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Globe size={14} className="text-gray-400" />
          <a 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 text-sm truncate hover:underline"
          >
            {link.url}
          </a>
          <ExternalLink size={12} className="text-gray-400" />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex md:items-center justify-between w-full">
        <div className="w-[20%] flex items-center gap-2 justify-center">
          {getPlatformIcon(link.platform)}
          <span className="font-medium text-gray-800 dark:text-white">{getPlatformLabel(link.platform)}</span>
        </div>
        <div className="w-[55%] flex items-center gap-2">
          <Globe size={14} className="text-gray-400 flex-shrink-0" />
          <a 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 text-sm truncate hover:underline"
          >
            {link.url}
          </a>
          <ExternalLink size={12} className="text-gray-400 flex-shrink-0" />
        </div>
        <div className="w-[25%] flex justify-center gap-3">
          <button 
            onClick={onEdit} 
            className="p-2 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors" 
            title="ویرایش"
          >
            <Edit size={18} className="text-yellow-500" />
          </button>
          <button 
            onClick={onDelete} 
            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" 
            title="حذف"
          >
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};