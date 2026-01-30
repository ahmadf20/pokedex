"use client";

import { useMemo } from "react";
import {
  GetPokemonDetailResponse,
  Pokemon,
  Species,
} from "@/app/types/pokemonDetail";
import { GET_POKEMON_BY_NAME_COMPARISON } from "@/graphql/queries";
import { capitalize } from "@/app/utils/formatter";
import { getPokemonImageUrl } from "@/app/utils/common";
import Image from "next/image";
import { useQuery } from "@apollo/client/react";

type Props = {
  selectedPokemons: string[];
  onRemovePokemon: (pokemonName: string) => void;
};

export function PokemonComparison({
  selectedPokemons,
  onRemovePokemon,
}: Props) {
  const {
    data: queryData,
    loading,
    previousData,
  } = useQuery<GetPokemonDetailResponse>(GET_POKEMON_BY_NAME_COMPARISON, {
    variables: { names: selectedPokemons },
  });

  const data = queryData || previousData;

  const pokemonData = useMemo(() => {
    if (!data?.species?.length || !data?.pokemon?.length) return [];

    return selectedPokemons
      .map((name) => {
        const species = data.species.find((s) => s.name === name) as Species;
        const pokemon = data.pokemon.find((p) => p.name === name) as Pokemon;

        return { pokemon, species };
      })
      .filter((item) => item.pokemon && item.species);
  }, [data, selectedPokemons]);

  const detailInfo = [
    {
      label: "Height (m)",
      values: pokemonData.map((d) => d.pokemon.height / 10),
    },
    {
      label: "Weight (kg)",
      values: pokemonData.map((d) => d.pokemon.weight / 10),
    },
    {
      label: "Base Experience",
      values: pokemonData.map((d) => d.pokemon.base_experience),
    },
    {
      label: "Generation",
      values: pokemonData.map((d) => d.species.generation_id),
    },
    {
      label: "Capture Rate",
      values: pokemonData.map((d) => d.species.capture_rate),
    },
    {
      label: "Base Happiness",
      values: pokemonData.map((d) => d.species.base_happiness),
    },
  ];

  if (loading && !pokemonData.length && selectedPokemons.length) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {
        <>
          {/* Pokemon Cards */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {pokemonData.map((data) => (
              <div
                key={data.pokemon.name}
                className="min-w-[280px] max-w-[320px]"
              >
                <div className="flex-1 bg-white rounded-xl border overflow-hidden">
                  <div className="bg-linear-to-r from-blue-500 to-purple-600 text-white p-6">
                    <div className="text-center">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <Image
                          src={getPokemonImageUrl(data.pokemon.id)}
                          alt={data.pokemon.name}
                          fill
                          className="object-contain"
                          sizes="128px"
                        />
                      </div>
                      <h2 className="text-2xl font-bold capitalize mb-1">
                        {data.pokemon.name}
                      </h2>
                      <p className="opacity-90">
                        #{String(data.pokemon.id).padStart(3, "0")}
                      </p>
                      <div className="flex gap-2 justify-center mt-3">
                        {data.pokemon.pokemontypes.map((typeInfo) => (
                          <span
                            key={typeInfo.type.name}
                            className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium"
                          >
                            {capitalize(typeInfo.type.name)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <button
                      type="button"
                      onClick={() => onRemovePokemon(data.pokemon.name)}
                      className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {pokemonData.length > 0 && (
            <>
              {/* Comparison Table */}
              <div className="bg-white rounded-xl border overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-bold text-gray-800">
                    Detailed Comparison
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 text-left font-medium text-gray-700">
                          Attribute
                        </th>
                        {pokemonData.map((data) => (
                          <th
                            key={data.pokemon.name}
                            className="py-3 px-4 text-center font-medium text-gray-700"
                          >
                            {capitalize(data.pokemon.name)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {detailInfo.map((info) => (
                        <tr className="border-b" key={info.label}>
                          <td className="py-3 px-4 font-medium text-gray-700">
                            {info.label}
                          </td>
                          {info.values.map((value, index) => {
                            let className =
                              "py-3 px-4 text-center text-gray-400";

                            const numValue = Number(value);
                            const maxVal = Math.max(
                              ...(info.values as number[]),
                            );

                            const isHighest =
                              numValue === maxVal &&
                              info.values.filter((v) => v === maxVal).length !==
                                info.values.length;
                            className += isHighest
                              ? " text-green-600 font-bold"
                              : "";

                            return (
                              <td key={index} className={className}>
                                {value}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Stats Comparison */}
              <div className="bg-white rounded-xl border overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-bold text-gray-800">
                    Base Stats Comparison
                  </h3>
                </div>

                <div className="p-6 space-y-4">
                  {pokemonData[0].pokemon.pokemonstats.map((stat1) => {
                    const formatName = (name: string) =>
                      name
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase());

                    const statValues = pokemonData.map(
                      (d) =>
                        d.pokemon.pokemonstats.find(
                          (s) => s.stat.name === stat1.stat.name,
                        )?.base_stat || 0,
                    );

                    return (
                      <div key={stat1.stat.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {formatName(stat1.stat.name)}
                          </span>
                          <div className="flex gap-4 text-sm flex-wrap">
                            {pokemonData.map((data, index) => {
                              const statValue = statValues[index];
                              const maxVal = Math.max(...statValues);
                              const isHighest =
                                statValue === maxVal &&
                                statValues.filter((v) => v === maxVal)
                                  .length === 1;

                              return (
                                <span
                                  key={data.pokemon.name}
                                  className={
                                    isHighest
                                      ? "text-green-600 font-bold"
                                      : "text-gray-400"
                                  }
                                >
                                  {data.pokemon.name}: {statValue}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                        <div className="space-y-2">
                          {pokemonData.map((data, index) => {
                            const statValue = statValues[index];
                            const colors = [
                              "bg-blue-500",
                              "bg-purple-500",
                              "bg-green-500",
                              "bg-orange-500",
                              "bg-pink-500",
                            ];

                            const width = Math.min(
                              (statValue / 255) * 100,
                              100,
                            );

                            return (
                              <div
                                key={data.pokemon.name}
                                className="w-full bg-gray-200 rounded-full h-3"
                              >
                                <div
                                  className={`${colors[index % colors.length]} h-3 rounded-full transition-all duration-500`}
                                  style={{
                                    width: `${width}%`,
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Abilities Comparison */}
              <div className="bg-white rounded-xl border overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-bold text-gray-800">
                    Abilities Comparison
                  </h3>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {pokemonData.map((data) => (
                      <div key={data.pokemon.name}>
                        <h4 className="font-medium text-gray-700 mb-3">
                          {capitalize(data.pokemon.name)}
                        </h4>
                        <div className="space-y-2">
                          {data.pokemon.pokemonabilities.map((abilityInfo) => (
                            <div
                              key={abilityInfo.ability.name}
                              className="px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-900"
                            >
                              {capitalize(
                                abilityInfo.ability.name.replace(/-/g, " "),
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      }
    </div>
  );
}
