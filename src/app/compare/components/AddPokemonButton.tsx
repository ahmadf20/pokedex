import { GetPokemonListResponse } from "@/types/pokemonList";
import { getPokemonImageUrl } from "@/utils/common";
import { GET_POKEMON } from "@/graphql/queries";
import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const MAX_POKEMON_COUNT = 5;

type Props = {
  selectedPokemons: string[];
  onSelectPokemon: (pokemonName: string) => void;
};

export const AddPokemonButton = ({
  selectedPokemons,
  onSelectPokemon,
}: Props) => {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: pokemonList } = useQuery<GetPokemonListResponse>(GET_POKEMON);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectPokemon = (pokemonName: string) => {
    onSelectPokemon(pokemonName);
    setDropdownOpen(false);
    setSearch("");
  };

  const filteredList =
    pokemonList?.species.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase()) &&
        !selectedPokemons.includes(pokemon.name),
    ) || [];

  if (selectedPokemons.length >= MAX_POKEMON_COUNT) return null;

  return (
    <div ref={ref} className="relative flex-1 w-fit">
      <button
        type="button"
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add Pokémon
      </button>

      {dropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[280px] max-w-[320px]">
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search Pokémon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              autoFocus
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredList?.slice(0, 10).map((pokemon) => (
              <button
                key={pokemon.id}
                type="button"
                onClick={() => selectPokemon(pokemon.name)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="relative w-8 h-8">
                  <Image
                    src={getPokemonImageUrl(pokemon.id)}
                    alt={pokemon.name}
                    fill
                    className="object-contain"
                    sizes="32px"
                  />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 capitalize">
                    {pokemon.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    #{String(pokemon.id).padStart(3, "0")}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
