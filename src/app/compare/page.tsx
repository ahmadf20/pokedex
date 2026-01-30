"use client";

import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { PokemonComparison } from "./components/PokemonComparison";
import {
  AddPokemonButton,
  MAX_POKEMON_COUNT,
} from "./components/AddPokemonButton";
import { useRouter } from "next/navigation";

export default function ComparePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedPokemons = useMemo(() => {
    const names = searchParams.get("names");
    return names?.split(",") || [];
  }, [searchParams]);

  const addPokemonToCompare = (pokemonName: string) => {
    if (selectedPokemons.length >= MAX_POKEMON_COUNT) return;
    if (selectedPokemons.includes(pokemonName)) return;

    updateURL([...selectedPokemons, pokemonName]);
  };

  const removePokemonFromCompare = (pokemonName: string) => {
    const newSelected = selectedPokemons.filter((name) => name !== pokemonName);
    updateURL(newSelected);
  };

  const updateURL = (pokemons: string[]) => {
    const params = new URLSearchParams();

    if (pokemons.length) {
      params.set("names", pokemons.join(","));
    } else {
      params.delete("names");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-900 ">Compare Pokémon</h1>
        <p className="text-gray-600">
          You can compare up to 5 Pokémon at once.
        </p>
        <AddPokemonButton
          selectedPokemons={selectedPokemons}
          onSelectPokemon={addPokemonToCompare}
        />
        <PokemonComparison
          selectedPokemons={selectedPokemons}
          onSelectPokemon={addPokemonToCompare}
          onRemovePokemon={removePokemonFromCompare}
        />
      </div>
    </div>
  );
}
