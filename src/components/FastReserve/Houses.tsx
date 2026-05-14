"use client";

import React, { useMemo } from "react";
import SkeletonProductHouse from "./SkeletonProductHouse";
import ProductHouse from "./ProductHouse";
import { IReserveHouse } from "@/core/types/ReserveHouse/IHouse";

type Props = {
  searchQuery: string;
  initialHouses: IReserveHouse[];
  isLoading: boolean;
};

const Houses = ({ searchQuery, initialHouses, isLoading }: Props) => {
  const filteredHouses = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return initialHouses;
    }

    return initialHouses.filter((house: IReserveHouse) => {
      const matchesTitle =
        house.title?.toLowerCase().includes(normalizedQuery) ?? false;
      const matchesLocation =
        house.location?.toLowerCase().includes(normalizedQuery) ?? false;
      return matchesTitle || matchesLocation;
    });
  }, [searchQuery, initialHouses]);

  return (
    <div
      dir="ltr"
      className="w-177.5 h-174 scroll-smooth custom-scroll flex justify-end flex-wrap gap-6 overflow-y-auto mt-39 mr-22.25"
    >
      {isLoading ? (
        [...Array(initialHouses.length > 0 ? initialHouses.length : 3)].map(
          (_, index) => <SkeletonProductHouse key={index} />,
        )
      ) : filteredHouses.length > 0 ? (
        filteredHouses.map((house) => (
          <ProductHouse key={house.id} houses={house} />
        ))
      ) : (
        <div className="text-center text-lg text-blue-400 mt-6 col-span-full">
          .موردی یافت نشد
        </div>
      )}
    </div>
  );
};

export default Houses;
