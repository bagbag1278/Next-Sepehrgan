"use client";
import { useTranslations } from 'next-intl';
import { Search } from "lucide-react";
import VoiceInput from "@/components/common/voice/VoiceInput";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

interface BlogSearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onVoiceInput: (text: string) => void;
}

const BlogSearch = ({ searchQuery, setSearchQuery, onVoiceInput }: BlogSearchProps) => {
  const t = useTranslations('Blog');
  
  return (
    <AdvancedScrollAnimation type="slide-right" delay={0.2} duration={0.5}>
      <div className="w-full bg-[#F5F8FA] dark:bg-gray-800/50 border border-[#E8EFF3] dark:border-gray-700 rounded-[20px] p-5 shadow-sm shadow-[4px_4px_15px_rgba(8,135,202,0.1)] dark:shadow-none">
        <h3 className="text-[#10088F] dark:text-white text-[15px] font-bold mb-3 flex items-center gap-2">
          <Search size={18} className="text-[#0887CA] dark:text-white" />
          {t('searchInArticles')}
        </h3>
        <VoiceInput
          onTranscript={onVoiceInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          lang="fa"
          className="w-full h-[48px] rounded-[12px] border border-[#0887CA44] dark:border-gray-600 bg-white dark:bg-gray-800 px-4 text-[13px] outline-none focus:border-[#0887CA] dark:focus:border-white text-[#060425] dark:text-white font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
      </div>
    </AdvancedScrollAnimation>
  );
};

export default BlogSearch;