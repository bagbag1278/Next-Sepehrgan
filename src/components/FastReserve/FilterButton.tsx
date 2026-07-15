"use client";
import { useTranslations } from 'next-intl';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import FastFilter from "./Filter/FastFilter";
import { useState } from "react";
import CompareModal from "./CompareModal";

type SortByType = "--" | "last_updated" | "price";

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

type FilterButtonProps = {
  query: string;
  setQuery: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  selectedRooms: number;
  setSelectedRooms: (value: number) => void;
  selectedBathrooms: number;
  setSelectedBathrooms: (value: number) => void;
  selectedToilets: number;
  setSelectedToilets: (value: number) => void;
  selectedParking: number;
  setSelectedParking: (value: number) => void;
  sortBy: SortByType;
  setSortBy: (sortBy: SortByType) => void;
  compareList?: CompareItem[];
  compareCount?: number;
  onClearAllFilters?: () => void;
  onRemoveFromCompare?: (id: number) => void;
  onClearCompare?: () => void;
};

const FilterButton = ({
  query,
  setQuery,
  sortBy,
  setSortBy,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedRooms,
  setSelectedRooms,
  selectedBathrooms,
  setSelectedBathrooms,
  selectedToilets,
  setSelectedToilets,
  selectedParking,
  setSelectedParking,
  compareList = [],
  compareCount = 0,
  onClearAllFilters,
  onRemoveFromCompare,
  onClearCompare,
}: FilterButtonProps) => {
  const t = useTranslations('FilterButton');
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="w-37 border outline-0 border-blue-300/70 dark:bg-gray-800   rounded-2xl font-normal cursor-pointer hover:border-2 transition-colors duration-150 text-blue-300/70 flex justify-center gap-1 items-center text-sm p-2"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M17.3358 0.75H2.16421C1.38316 0.75 0.75 1.38317 0.75 2.16421C0.75 2.53929 0.898997 2.899 1.16421 3.16421L6.16421 8.16421C6.53929 8.53929 6.75 9.04799 6.75 9.57843V14.5139C6.75 15.2715 7.178 15.964 7.85557 16.3028L12.0264 18.3882C12.3588 18.5544 12.75 18.3127 12.75 17.941V9.57843C12.75 9.04799 12.9607 8.53929 13.3358 8.16421L18.3358 3.16421C18.601 2.899 18.75 2.53929 18.75 2.16421C18.75 1.38317 18.1168 0.75 17.3358 0.75Z"
                stroke="#0887CA"
                strokeOpacity="0.7"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            {t('moreFilters')}
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="z-50 w-76 rounded-tl-2xl rounded-bl-2xl border border-blue-300/40 dark:bg-gray-800  bg-white px-5 py-6 shadow-lg">
            <FastFilter
              query={query}
              setQuery={setQuery}
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
              onClearAllFilters={onClearAllFilters}
              onCompare={() => {
                if (compareCount === 2) {
                  setShowModal(!showModal);
                }
              }}
              compareCount={compareCount}
            />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {showModal && (
        <CompareModal
          items={compareList}
          onRemove={(id) => onRemoveFromCompare?.(id)}
          onClose={() => setShowModal(false)}
          onClearAll={() => onClearCompare?.()}
        />
      )}
    </>
  );
};

export default FilterButton;