import React from "react";
import { useTranslations } from 'next-intl';
import VoiceInput from "@/components/common/voice/VoiceInput";
import { Search } from "lucide-react";

type SearchFieldProps = {
  query: string;
  setQuery: (value: string) => void;
};

const SearchField = ({ query, setQuery }: SearchFieldProps) => {
  const t = useTranslations('SearchField');

  const handleVoiceInput = (text: string) => {
    setQuery(text);
  };

  return (
    <form className="relative w-full" onSubmit={(e) => e.preventDefault()}>
      <VoiceInput
        onTranscript={handleVoiceInput}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('placeholder')}
        lang="fa"
        dir="rtl"
        icon={<Search size={18} className="text-blue-300/70" />}
        className="border border-blue-300 dark:border-blue-600 h-12 placeholder:text-blue-300/70 dark:placeholder:text-blue-300/50 w-full outline-0 rounded-2xl py-2 pr-10 pl-10 text-sm text-blue-100 dark:text-white bg-white dark:bg-gray-800"
      />
    </form>
  );
};

export default SearchField;