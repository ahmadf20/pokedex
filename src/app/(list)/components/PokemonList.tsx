"use client";

import { usePokemonList } from "@/hooks/usePokemonList";
import { GetPokemonListResponse } from "../../../types/pokemonList";
import { MemoizedPokemonCard } from "./PokemonCard";
import { SearchInput } from "./SearchInput";
import { FilterSelection } from "./FilterSelection";
import { SortSelection } from "./SortSelection";
import { useEffect, useState } from "react";

export const PokemonList = ({ data }: { data: GetPokemonListResponse }) => {
  const {
    pokemonList,
    search,
    onSearchChange,
    typeOptions,
    selectedType,
    setSelectedType,
    sortOptions,
    selectedSort,
    setSelectedSort,
  } = usePokemonList({
    data: data.species,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="flex flex-col gap-6 text-black relative">
      <div className="flex gap-6 items-end flex-wrap">
        <div className="w-full max-w-md sm:flex-1">
          <SearchInput onChange={(e) => onSearchChange(e)} value={search} />
        </div>
        <div>
          <FilterSelection
            label="Type"
            value={selectedType}
            options={typeOptions}
            onChange={setSelectedType}
          />
        </div>
        <div>
          <SortSelection
            options={sortOptions}
            value={selectedSort}
            onChange={setSelectedSort}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {pokemonList.map((pokemon) => (
          <MemoizedPokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {isVisible && (
        <button
          type="button"
          className="fixed bottom-4 right-4 text-black font-bold p-3 rounded-full border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none transition-colors shadow-md cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
