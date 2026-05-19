"use client";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import React, { useMemo } from "react";
import SkeletonProductHouse from "./SkeletonProductHouse";
import ProductHouse from "./ProductHouse";
import { IReserveHouse } from "@/core/types/ReserveHouse/IHouse";
import { motion } from "framer-motion";
type Props = {
  searchQuery: string;
  initialHouses: IReserveHouse[];
  isLoading: boolean;
  sortBy: "last_updated" | "price";
  filters?: {
    minPrice?: string;
    maxPrice?: string;
    rooms?: number;
    bathrooms?: number;
    toilets?: number;
    parking?: number;
  };
};

const Houses = ({
  searchQuery,
  initialHouses,
  isLoading,
  sortBy,
  filters = {},
}: Props) => {
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
    if (filters.minPrice) {
      const min = Number(filters.minPrice);
      result = result.filter((house) => (house.price ?? 0) >= min);
    }
    if (filters.maxPrice) {
      const max = Number(filters.maxPrice);
      result = result.filter((house) => (house.price ?? 0) <= max);
    }

    // ۳. فیلتر اتاق‌ها (جدید)
    if (filters.rooms && filters.rooms > 0) {
      result = result.filter((house) => house.rooms === filters.rooms);
    }

    // ۴. فیلتر سرویس‌ها (جدید)
    if (filters.bathrooms && filters.bathrooms > 0) {
      result = result.filter((house) => house.bathrooms === filters.bathrooms);
    }

    // ۵. فیلتر توالت (جدید)
    if (filters.toilets && filters.toilets > 0) {
      result = result.filter((house) => house.toilets === filters.toilets);
    }

    // ۶. فیلتر پارکینگ (جدید)
    if (filters.parking && filters.parking > 0) {
      result = result.filter((house) => house.parking === filters.parking);
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
  }, [searchQuery, initialHouses, sortBy, filters]);
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15, // فاصله زمانی بین هر کارت
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -40, // از چپ وارد شود
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <ScrollArea.Root className="w-177.5 h-174 mt-39 mr-22.25">
      <ScrollArea.Viewport className="h-full w-full">
        <motion.div
          dir="ltr"
          className="flex justify-end flex-wrap gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {isLoading ? (
            [...Array(initialHouses.length > 0 ? initialHouses.length : 3)].map(
              (_, index) => <SkeletonProductHouse key={index} />,
            )
          ) : filteredAndSortedHouses.length > 0 ? (
            filteredAndSortedHouses.map((house) => (
              <motion.div key={house.id} variants={itemVariants}>
                <ProductHouse houses={house} />
              </motion.div>
            ))
          ) : (
            <div className="text-center text-lg text-blue-400 mt-6 col-span-full">
              موردی یافت نشد
            </div>
          )}
        </motion.div>
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
