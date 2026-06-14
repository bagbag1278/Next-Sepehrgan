"use client";

import { useMemo, useState } from "react";
import FavoriteSearch from "./FavoriteSearch";
import FavoriteHouses from "./FavoriteHouses";
import AnimatedCard from "@/components/ui/AnimatedCard";

interface Props {
  favorites: any[];
}

export default function FavoriteContainer({ favorites }: Props) {
  const [search, setSearch] = useState("");

  const filteredFavorites = useMemo(() => {
    return favorites.filter((favorite) =>
      favorite.house.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [favorites, search]);

  return (
    <>
      <div className="absolute left-8 top-16">
        <FavoriteSearch value={search} onChange={setSearch} />
      </div>

      <div className="h-72 flex flex-col gap-2 py-1 px-0.5">
        {filteredFavorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <span className="text-5xl">💖</span>
            <span className="text-blue-300 font-bold text-lg">
              اقامتگاه مورد علاقه‌ای وجود ندارد
            </span>
          </div>
        ) : (
          filteredFavorites.map((favorite, index) => (
            <AnimatedCard key={favorite.id} index={index}>
              <FavoriteHouses favoriteId={favorite.id} house={favorite.house} />
            </AnimatedCard>
          ))
        )}
      </div>
    </>
  );
}
