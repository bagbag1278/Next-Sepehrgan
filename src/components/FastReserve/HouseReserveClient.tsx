"use client";

import React, { useCallback, useEffect, useState, useMemo } from "react";
import FilterButton from "@/components/FastReserve/FilterButton";
import Houses from "@/components/FastReserve/Houses";
import SearchForm from "@/components/FastReserve/SearchForm";
import MapComponent from "@/components/FastReserve/MapComponent";
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
  const [selectedHouseId, setSelectedHouseId] = useState<number | undefined>();

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

  const filters = useMemo(() => ({
    minPrice,
    maxPrice,
    rooms: selectedRooms,
    bathrooms: selectedBathrooms,
    toilets: selectedToilets,
    parking: selectedParking,
  }), [minPrice, maxPrice, selectedRooms, selectedBathrooms, selectedToilets, selectedParking]);

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
    setSelectedHouseId(undefined);
    toast.success("تمامی فیلترها پاک شد");
  };

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

  const mapHouses = useMemo(() => {
    return initialHouses.map((house) => ({
      id: house.id,
      title: house.title || "",
      address: house.address || "",
      lat: house.latitude || 35.6892 + (Math.random() - 0.5) * 0.05,
      lng: house.longitude || 51.389 + (Math.random() - 0.5) * 0.05,
      price: house.price || 0,
      image: house.photos?.[0] || "/default-house.jpg",
    }));
  }, [initialHouses]);

  const handleAddToCompare = useCallback((house: CompareItem) => {
    if (compareList.length >= 2) {
      toast.error("حداکثر می‌توانید 2 ملک را مقایسه کنید");
      if (compareList.length === 2) {
        setIsCompareModalOpen(true);
      }
      return;
    }
    if (!compareList.find((item) => item.id === house.id)) {
      setCompareList((prev) => [...prev, house]);
      toast.success("ملک به لیست مقایسه اضافه شد");
    } else {
      toast.error("این ملک قبلاً به لیست مقایسه اضافه شده است");
    }
  }, [compareList]);

  const handleRemoveFromCompare = useCallback((id: number) => {
    setCompareList((prev) => prev.filter((item) => item.id !== id));
    toast.success("ملک از لیست مقایسه حذف شد");
  }, []);

  const handleClearCompare = useCallback(() => {
    setCompareList([]);
    toast.success("لیست مقایسه خالی شد");
  }, []);

  const handleMarkerClick = useCallback((houseId: number) => {
    setSelectedHouseId(houseId);
    // اسکرول به کارت مربوطه
    setTimeout(() => {
      const element = document.getElementById(`house-${houseId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.classList.add("ring-2", "ring-blue-500", "shadow-lg");
        setTimeout(() => {
          element.classList.remove("ring-2", "ring-blue-500", "shadow-lg");
        }, 2000);
      }
    }, 100);
  }, []);

  const convertedHouses = useMemo(() => convertToIReserveHouse(initialHouses), [initialHouses]);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 p-4">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-wrap gap-4 mb-6">
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
            onHouseClick={handleMarkerClick}
            selectedHouseId={selectedHouseId}
          />
        </div>

        {/* بخش سمت چپ - نقشه */}
        <div className="w-full lg:w-1/2 h-[500px] lg:h-[700px] mt-6 rounded-tl-lg overflow-hidden rounded-br-lg rounded-bl-[42px] rounded-tr-[42px] drop-shadow-lg bg-gray-100 sticky top-6">
          <MapComponent
            houses={mapHouses}
            selectedHouseId={selectedHouseId}
            onMarkerClick={handleMarkerClick}
            userLocation={{ lat: 35.6892, lng: 51.389 }}
          />
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