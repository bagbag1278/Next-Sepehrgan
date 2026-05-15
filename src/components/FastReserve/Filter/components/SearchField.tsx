import React from "react";

type SearchFieldProps = {
  query: string;
  setQuery: (value: string) => void;
};

const SearchField = ({ query, setQuery }: SearchFieldProps) => {
    console.log("Props received in SearchField:", { query, setQuery });
  return (
    <form className="relative" onSubmit={(e) => e.preventDefault()}>
      <div>
        <input
          type="text"
          name="searchlocation"
          placeholder="مقصد یا هتل شما"
          value={query}
           onChange={(e) => {
                console.log("Input onChange triggered. Value:", e.target.value); // این خط هم اضافه کن
                if (setQuery) { // چک کن که setQuery واقعا وجود داره
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
