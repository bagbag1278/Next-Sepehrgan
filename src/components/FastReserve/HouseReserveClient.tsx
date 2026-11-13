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

  const filters = {
    minPrice,
    maxPrice,
    rooms: selectedRooms,
    bathrooms: selectedBathrooms,
    toilets: selectedToilets,
    parking: selectedParking,
    price: minPrice && maxPrice ? `${minPrice}-${maxPrice}` : undefined,
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
      image: house.photos?.[0] || house.image || "",
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
      price: typeof house.price === 'number' ? house.price : Number(house.price) || 0,
      image: house.photos?.[0] || house.image || "",
    }));
  }, [initialHouses]);

  const handleAddToCompare = (house: CompareItem) => {
    if (compareList.length >= 2) {
      if (compareList.length === 2) {
        setIsCompareModalOpen(true);
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

  const handleHouseClick = useCallback((houseId: number) => {
    setSelectedHouseId(houseId);
  }, []);

  const handleMarkerClick = useCallback((houseId: number) => {
    setSelectedHouseId(houseId);
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

  const convertedHouses = convertToIReserveHouse(initialHouses);

  return (
    <div className="w-full px-3 md:px-0">


      <div className="flex flex-col lg:flex-row justify-between gap-6 max-w-400 mx-auto">
        
        <div className="w-full lg:w-1/2 xl:w-auto order-2 lg:order-1 max-[780]:flex max-[780]:justify-center  ">
          <Houses
            searchQuery={query}
            initialHouses={convertedHouses}
            isLoading={false}
            sortBy={sortBy}
            filters={filters}
            onAddToCompare={handleAddToCompare}
            compareList={compareList}
            onHouseClick={handleHouseClick}
            selectedHouseId={selectedHouseId}
          />
        </div>

              <div className="flex flex-col  md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 max-w- relative md:absolute md:right-30 md:top-17.5 mb-4 md:mb-0">
        <div className="flex flex-col sm:flex-row gap-3 w-full ">
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
      </div>

        <div className="w-full lg:w-[43%] h-64 sm:h-80 md:h-96 lg:h-209 mt-0 lg:mt-6 order-1 lg:order-2 rounded-tl-lg overflow-hidden rounded-br-lg rounded-bl-[42px] rounded-tr-[42px] drop-shadow-blue-300">
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
    </div>
  );
};

export default HouseReserveClient;