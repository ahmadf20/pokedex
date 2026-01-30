import { Pokemon, Species } from "@/app/types/pokemonDetail";
import { capitalize } from "@/app/utils/formatter";
import { getPokemonImageUrl } from "@/app/utils/common";
import Image from "next/image";
import Link from "next/link";

export function PokemonDetailCard({
  pokemon,
  species,
}: {
  pokemon: Pokemon;
  species: Species;
}) {
  const formatName = (name: string) => {
    return name.replace(/-/g, " ");
  };

  const getStatWidth = (stat: number) => {
    return Math.min((stat / 255) * 100, 100);
  };

  const basicInfo = [
    { label: "Height", value: `${pokemon.height / 10} m` },
    { label: "Weight", value: `${pokemon.weight / 10} kg` },
    { label: "Base Experience", value: pokemon.base_experience.toString() },
    { label: "Generation", value: species.generation_id.toString() },
    {
      label: "Pokemon Habitat",
      value: capitalize(species.pokemonhabitat.name),
    },
    { label: "Growth Rate", value: capitalize(species.growthrate.name) },
    { label: "Capture Rate", value: species.capture_rate.toString() },
    { label: "Base Happiness", value: species.base_happiness.toString() },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Pokédex
          </Link>

          <Link
            href={`/compare?pokemon1=${pokemon.name}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Compare Pokémon
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl border overflow-hidden">
          {/* Header Section */}
          <div className="bg-linear-to-r from-blue-500 to-purple-600 text-white p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Pokemon Image */}
              <div className="relative w-48 h-48">
                <Image
                  src={getPokemonImageUrl(pokemon.id)}
                  alt={pokemon.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 192px"
                  priority
                  loading="eager"
                />
              </div>

              {/* Basic Info */}
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold capitalize mb-2">
                  {pokemon.name}
                </h1>
                <p className="text-xl opacity-90">
                  #{String(pokemon.id).padStart(3, "0")}
                </p>

                {/* Types */}
                <div className="flex gap-2 justify-center md:justify-start mt-4">
                  {pokemon.pokemontypes.map((typeInfo) => (
                    <span
                      key={typeInfo.type.name}
                      className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium"
                    >
                      {capitalize(typeInfo.type.name)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-8 grid md:grid-cols-2 gap-8">
            {/* Basic Stats */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Basic Info
              </h2>
              <div className="space-y-3">
                {basicInfo.map((info) => (
                  <div
                    key={info.label}
                    className="flex justify-between py-2 border-b"
                  >
                    <span className="text-gray-600">{info.label}</span>
                    <span className="font-medium text-gray-900">
                      {info.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Abilities */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Abilities
              </h2>
              <div className="space-y-2">
                {pokemon.pokemonabilities.map((abilityInfo) => (
                  <div
                    key={abilityInfo.ability.name}
                    className="px-4 py-2 bg-gray-100 rounded-lg capitalize text-gray-900"
                  >
                    {formatName(abilityInfo.ability.name)}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Base Stats
              </h2>
              <div className="space-y-4">
                {pokemon.pokemonstats.map((statInfo) => (
                  <div key={statInfo.stat.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {formatName(statInfo.stat.name)}
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {statInfo.base_stat}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-linear-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${getStatWidth(statInfo.base_stat)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            {species.pokemonspeciesflavortexts.length > 0 && (
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {species.pokemonspeciesflavortexts[0].flavor_text}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
