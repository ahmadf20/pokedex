"use client";

import { usePokemonList } from "@/hooks/usePokemonList";
import { GetPokemonListResponse } from "../../types/pokemonList";
import { MemoizedPokemonCard } from "./PokemonCard";
import { SearchInput } from "./SearchInput";
import { FilterSelection } from "./FilterSelection";
import { SortSelection } from "./SortSelection";

export const PokemonList = ({ data }: { data: GetPokemonListResponse }) => {
  const {
    pokemonList,
    search,
    setSearch,
    typeOptions,
    selectedType,
    setSelectedType,
    sortOptions,
    selectedSort,
    setSelectedSort,
  } = usePokemonList({
    data: data.species,
  });

  return (
    <div className="flex flex-col gap-6 text-black relative">
      <div className="flex gap-6 items-end flex-wrap">
        <div className="w-full max-w-md sm:flex-1">
          <SearchInput onChange={(e) => setSearch(e)} value={search} />
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

      <button
        type="button"
        className="fixed bottom-4 right-4 text-black font-bold py-2 px-4 rounded-full border border-gray-300 bg-white focus:outline-none transition-colors"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Scroll to top
      </button>
    </div>
  );
};
