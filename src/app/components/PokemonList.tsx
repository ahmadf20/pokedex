"use client";

import { usePokemonList } from "@/hooks/usePokemonList";
import { GetPokemonResponse } from "../types/pokemon";
import { MemoizedPokemonCard } from "./PokemonCard";
import { SearchInput } from "./SearchInput";
import { FilterSelection } from "./FilterSelection";
import { SortSelection } from "./SortSelection";

export const PokemonList = ({ data }: { data: GetPokemonResponse }) => {
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
    data: data.gen3_species,
  });

  return (
    <div className="flex flex-col gap-6 text-black relative">
      <div className="flex gap-6 items-center flex-wrap">
        <div className="w-full  sm:flex-1">
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
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out "
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Scroll to top
      </button>
    </div>
  );
};
