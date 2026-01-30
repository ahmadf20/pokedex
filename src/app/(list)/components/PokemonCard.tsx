import Image from "next/image";
import { Species } from "../../types/pokemonList";
import { memo } from "react";
import Link from "next/link";
import { getPokemonImageUrl } from "../../utils/common";

export const PokemonCard = ({ pokemon }: { pokemon: Species }) => {
  const formatName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const formatId = (id: number) => {
    return `#${id.toString().padStart(3, "0")}`;
  };

  return (
    <Link
      key={pokemon.id}
      href={`/pokemon/${pokemon.name}`}
      className="bg-white rounded-xl overflow-hidden duration-300 transform hover:-translate-y-1 border border-gray-300 focus:outline-none transition-colors appearance-none cursor-pointer hover:border-gray-400"
    >
      <div className="p-4 flex flex-col items-center">
        <div className="w-32 h-32 relative">
          <Image
            fill
            src={getPokemonImageUrl(pokemon.id)}
            alt={pokemon.name}
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="mt-2 text-center">
          <span className="text-sm text-gray-500 font-medium">
            {formatId(pokemon.id)}
          </span>
          <h3 className="text-xl font-semibold text-gray-800">
            {formatName(pokemon.name)}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export const MemoizedPokemonCard = memo(PokemonCard);
