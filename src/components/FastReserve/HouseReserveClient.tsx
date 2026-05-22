"use client";

import React, { useCallback, useEffect, useState } from "react";
import FilterButton from "@/components/FastReserve/FilterButton";
import Houses from "@/components/FastReserve/Houses";
import SearchForm from "@/components/FastReserve/SearchForm";
import Map from "@/components/Map/Map";
import { House } from "@/core/api/house";
import { IReserveHouse } from "@/core/types/ReserveHouse/IHouse";
import { debounce } from "lodash-es";
import { toast } from "react-hot-toast";
import CompareModal from "./CompareModal";

type SortByType = "--" | "last_updated" | "price";

type Props = {
  initialHouses: House[];
};

interface CompareItem {
  id: number;
  title: string;
  price: number;
  rooms: number;
  bathrooms: number;
  parking: number;
  area: number;
  image: string;
  address: string;
}

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

  const [compareList, setCompareList] = useState<CompareItem[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

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

  const handleClearAllFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedRooms(0);
    setSelectedBathrooms(0);
    setSelectedToilets(0);
    setSelectedParking(0);
    setSortBy("--");
    setInputValue("");
    setQuery("");
    setCompareList([]);
    toast.success("تمامی فیلترها پاک شد");
  };

  // تبدیل House[] به IReserveHouse[]
  const convertToIReserveHouse = (houses: House[]): IReserveHouse[] => {
    return houses.map((house) => ({
      id: house.id,
      title: house.title || "",
      price: house.price || 0,
      discounted_price: house.discounted_price || house.price || 0,
      location: house.address || "",
      capacity: house.capacity || 1,
      rooms: house.rooms || 0,
      bathrooms: house.bathrooms || 0,
      toilets: house.toilets || 0,
      parking: house.parking || 0,
      area: house.area || 0,
      image: house.photos?.[0] || "/default-house.jpg",
      rate: house.rate || "0",
      last_updated_at: house.last_updated || new Date().toISOString(),
    }));
  };

  const handleAddToCompare = (house: CompareItem) => {
    if (compareList.length >= 2) {
      if (compareList.length === 2) {
        setIsCompareModalOpen(!isCompareModalOpen);
      }

      toast.error("حداکثر می‌توانید 2 ملک را مقایسه کنید");
      return;
    }
    if (!compareList.find((item) => item.id === house.id)) {
      const newList = [...compareList, house];
      setCompareList(newList);
      toast.success("ملک به لیست مقایسه اضافه شد");
    } else {
      toast.error("این ملک قبلاً به لیست مقایسه اضافه شده است");
    }
  };

  const handleRemoveFromCompare = (id: number) => {
    setCompareList(compareList.filter((item) => item.id !== id));
    toast.success("ملک از لیست مقایسه حذف شد");
  };

  const handleClearCompare = () => {
    setCompareList([]);
    toast.success("لیست مقایسه خالی شد");
  };

  const userLat = 35.6892;
  const userLng = 51.389;
  const neshanApiKey = "YOUR_NESHAN_API_KEY";

  const convertedHouses = convertToIReserveHouse(initialHouses);

  return (
    <>
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
            compareList={compareList}
            compareCount={compareList.length}
            onClearAllFilters={handleClearAllFilters}
          />
          <SearchForm value={query} onSearchChange={setQuery} />
        </div>

        <Houses
          searchQuery={query}
          initialHouses={convertedHouses}
          isLoading={false}
          sortBy={sortBy}
          filters={filters}
          onAddToCompare={handleAddToCompare}
          compareList={compareList}
        />

        <div className="w-[43%] h-209 mt-6 rounded-tl-lg overflow-hidden rounded-br-lg rounded-bl-[42px] rounded-tr-[42px] drop-shadow-blue-300">
          {/* <Map
            lat={userLat}
            lng={userLng}
            zoom={14}
            popupText="اینجا تهران است"
            height="100%"
            apiKey={neshanApiKey}
          /> */}
        </div>
      </div>

      {isCompareModalOpen && (
        <CompareModal
          items={compareList}
          onRemove={handleRemoveFromCompare}
          onClose={() => setIsCompareModalOpen(false)}
          onClearAll={handleClearCompare}
        />
      )}
    </>
  );
};

export default HouseReserveClient;
