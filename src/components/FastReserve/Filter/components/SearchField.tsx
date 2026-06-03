import React from "react";
import { useTranslations } from 'next-intl';

type SearchFieldProps = {
  query: string;
  setQuery: (value: string) => void;
};

const SearchField = ({ query, setQuery }: SearchFieldProps) => {
  const t = useTranslations('SearchField');

  return (
    <form className="relative" onSubmit={(e) => e.preventDefault()}>
      <div>
        <input
          type="text"
          name="searchlocation"
          placeholder={t('placeholder')}
          value={query}
          onChange={(e) => {
            if (setQuery) {
              setQuery(e.target.value);
            } else {
              console.error("setQuery is undefined in SearchField!");
            }
          }}
          className="border border-blue-300 h-12 placeholder:text-blue-300/70 w-full outline-0 rounded-2xl py-2 px-4 text-sm text-blue-100"
        />
      </div>
    </form>
  );
};

export default SearchField;