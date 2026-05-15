"use client";

import React, { useCallback, useEffect, useState } from "react";
import FilterButton from "@/components/FastReserve/FilterButton"; 
import Houses from "@/components/FastReserve/Houses";
import SearchForm from "@/components/FastReserve/SearchForm";
import Map from "@/components/Map/Map";
import { House } from "@/core/api/house"; 
import { debounce } from "lodash-es";


type SortByType = "--" | "last_updated" | "price";

type Props = {
  initialHouses: House[];
};

const HouseReserveClient = ({ initialHouses }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortByType>("--");

  useEffect(() => {
    const handler = debounce((value: string) => {
      setQuery(value);
    }, 500);

    handler(inputValue);

    return () => {
      handler.cancel();
    };
  }, [inputValue]);

  return (
    <div className="flex justify-between">
      <div className="h-12 absolute right-30 top-17.5 flex justify-between gap-4">
        
        <FilterButton
          query={inputValue}
          setQuery={setInputValue}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <SearchForm value={query} onSearchChange={setQuery} />
      </div>

      <Houses
        searchQuery={query}
        initialHouses={initialHouses}
        isLoading={false}
        sortBy={sortBy} 
      />

      <div className="w-[43%] h-209 mt-6 rounded-tl-lg overflow-hidden rounded-br-lg rounded-bl-[42px] rounded-tr-[42px] drop-shadow-blue-300">
        <Map lat={35.6892} lng={51.389} popupText="تهران" />
      </div>
    </div>
  );
};

export default HouseReserveClient;
