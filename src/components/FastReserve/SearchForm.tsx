import React, { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import VoiceInput from "@/components/common/voice/VoiceInput";
import { Search } from "lucide-react";

type Props = {
  value?: string;
  onSearchChange: (value: string) => void;
};

const SearchForm = ({ value = "", onSearchChange }: Props) => {
  const t = useTranslations('SearchForm');
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(inputValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, onSearchChange]);

  const handleVoiceInput = (text: string) => {
    setInputValue(text);
  };

  return (
    <form className="relative  w-120" onSubmit={(e) => e.preventDefault()}>
 <VoiceInput
  onTranscript={handleVoiceInput}
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  placeholder={t('placeholder')}
  lang="fa"
  dir="rtl"
  icon={<Search size={18} className="text-blue-300/70 dark:text-blue-300/50" />}
  className="w-full outline-none border border-[#0887CAB2] dark:border-[#0887CA]/50 rounded-2xl py-3 text-sm placeholder:text-[#0887CAB2] dark:placeholder:text-[#0887CA]/50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white pl-10 pr-10"/>
    </form>
  );
};

export default SearchForm;