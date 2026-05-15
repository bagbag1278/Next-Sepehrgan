"use client";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import React, { useMemo } from "react";
import SkeletonProductHouse from "./SkeletonProductHouse";
import ProductHouse from "./ProductHouse";
import { IReserveHouse } from "@/core/types/ReserveHouse/IHouse";

type Props = {
  searchQuery: string;
  initialHouses: IReserveHouse[];
  isLoading: boolean;
  sortBy: "last_updated" | "price" ; 
};

const Houses = ({ searchQuery, initialHouses, isLoading, sortBy }: Props) => {
  const filteredAndSortedHouses = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    let result = [...initialHouses]; 

    
    if (normalizedQuery) {
      result = result.filter((house: IReserveHouse) => {
        const matchesTitle =
          house.title?.toLowerCase().includes(normalizedQuery) ?? false;
        const matchesLocation =
          house.location?.toLowerCase().includes(normalizedQuery) ?? false;
        return matchesTitle || matchesLocation;
      });
    }

   
    switch (sortBy) {
      case "last_updated":

        result.sort((a, b) => {
          const dateA = a.last_updated_at
            ? new Date(a.last_updated_at).getTime()
            : 0;
          const dateB = b.last_updated_at
            ? new Date(b.last_updated_at).getTime()
            : 0;
          return dateB - dateA;
        });
        break;
      case "price":

        result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0)); 
        break;
      case "--":
      default:

        break;
    }

    return result;
  }, [searchQuery, initialHouses, sortBy]); 

  return (
    <ScrollArea.Root className="w-177.5 h-174 mt-39 mr-22.25">
      <ScrollArea.Viewport className="h-full w-full">
        <div dir="ltr" className="flex justify-end flex-wrap gap-6 ">
          {isLoading ? (
            [...Array(initialHouses.length > 0 ? initialHouses.length : 3)].map(
              (_, index) => <SkeletonProductHouse key={index} />,
            )
          ) : filteredAndSortedHouses.length > 0 ? (
            filteredAndSortedHouses.map((house) => (
              <ProductHouse key={house.id} houses={house} />
            ))
          ) : (
            <div className="text-center text-lg text-blue-400 mt-6 col-span-full">
              .موردی یافت نشد
            </div>
          )}
        </div>
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar
        orientation="vertical"
        className="flex w-2.5 touch-none select-none rounded-2xl bg-[#ffffff] dark:bg-black"
      >
        <ScrollArea.Thumb className="flex-1 rounded-full bg-[#0089d0]" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};

export default Houses;
