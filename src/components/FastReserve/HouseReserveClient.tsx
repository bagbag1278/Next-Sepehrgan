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

  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [selectedRooms, setSelectedRooms] = useState<number>(0);
  const [selectedBathrooms, setSelectedBathrooms] = useState<number>(0);
  const [selectedToilets, setSelectedToilets] = useState<number>(0);
  const [selectedParking, setSelectedParking] = useState<number>(0);
  useEffect(() => {
    const handler = debounce((value: string) => {
      setQuery(value);
    }, 500);

    handler(inputValue);

    return () => {
      handler.cancel();
    };
  }, [inputValue]);
  const filters = {
    minPrice,
    maxPrice,
    rooms: selectedRooms,
    bathrooms: selectedBathrooms,
    toilets: selectedToilets,
    parking: selectedParking,
  };
  const userLat = 35.6892; // مثال: مختصات تهران
  const userLng = 51.389;
  const neshanApiKey = "YOUR_NESHAN_API_KEY";
  return (
    <div className="flex justify-between">
      <div className="h-12 absolute right-30 top-17.5 flex justify-between gap-4">
        <FilterButton
          query={inputValue}
          setQuery={setInputValue}
          sortBy={sortBy}
          setSortBy={setSortBy}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          selectedRooms={selectedRooms}
          setSelectedRooms={setSelectedRooms}
          selectedBathrooms={selectedBathrooms}
          setSelectedBathrooms={setSelectedBathrooms}
          selectedToilets={selectedToilets}
          setSelectedToilets={setSelectedToilets}
          selectedParking={selectedParking}
          setSelectedParking={setSelectedParking}
        />
        <SearchForm value={query} onSearchChange={setQuery} />
      </div>

      <Houses
        searchQuery={query}
        initialHouses={initialHouses}
        isLoading={false}
        sortBy={sortBy}
        filters={filters}
      />

      <div className="w-[43%] h-209 mt-6 rounded-tl-lg overflow-hidden rounded-br-lg rounded-bl-[42px] rounded-tr-[42px] drop-shadow-blue-300">
        {/* <Map
          lat={userLat}
          lng={userLng}
          zoom={14}
          popupText="اینجا تهران است"
          height="100%" // ارتفاع 100% نسبت به parent div
          apiKey={neshanApiKey}
        /> */}
      </div>
    </div>
  );
};

export default HouseReserveClient;
