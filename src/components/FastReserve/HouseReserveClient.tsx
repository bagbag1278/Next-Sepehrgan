"use client";

import React, { useState } from "react";
import FilterButton from "@/components/FastReserve/FilterButton";
import Houses from "@/components/FastReserve/Houses";
import SearchForm from "@/components/FastReserve/SearchForm";
import Map from "@/components/Map/Map";
import { House } from "@/core/api/house";

type Props = {
  initialHouses: House[];
};

const HouseReserveClient = ({ initialHouses }: Props) => {
  const [query, setQuery] = useState("");

  return (
    <>
      <div className="h-12 absolute right-30 top-17.5 flex justify-between gap-4">
        <FilterButton />
        <SearchForm value={query} onSearchChange={setQuery} />
      </div>

      <Houses
        searchQuery={query}
        initialHouses={initialHouses}
        isLoading={false}
      />

      <div className="w-[43%] h-209 mt-6 rounded-tl-lg overflow-hidden rounded-br-lg rounded-bl-[42px] rounded-tr-[42px] drop-shadow-blue-300">
        <Map lat={35.6892} lng={51.389} popupText="تهران" />
      </div>
    </>
  );
};

export default HouseReserveClient;
