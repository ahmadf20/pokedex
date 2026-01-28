import { graphqlFetch } from "@/lib/graphqlFetch";
import { GET_POKEMON } from "@/graphql/queries";
import Image from "next/image";
import Link from "next/link";

const PAGE_SIZE = 25;

type Pokemon = {
  id: number;
  name: string;
};

type GetPokemonResponse = {
  gen3_species: Pokemon[];
  pokemonspecies_aggregate: {
    aggregate: {
      count: number;
    };
  };
};

export default async function Page({
  searchParams,
}: {
 searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParamsData = await searchParams;
  const page = parseInt(searchParamsData?.page?.toString() || "1") || 1;

  const data = await graphqlFetch<GetPokemonResponse>({
    query: GET_POKEMON,
    variables: {
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
    },
  });

  const getPokemonImageUrl = (id: number) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  };

  const formatName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const formatId = (id: number) => {
    return `#${id.toString().padStart(3, "0")}`;
  };

  const total = data.pokemonspecies_aggregate.aggregate.count;
  const hasNext = page * PAGE_SIZE < total;
  const hasPrev = page > 1;

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Pokédex
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data.gen3_species.map((pokemon) => (
            <div
              key={pokemon.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <div className="p-4 flex flex-col items-center">
                <div className="w-32 h-32 relative">
                  <Image
                    src={getPokemonImageUrl(pokemon.id)}
                    alt={pokemon.name}
                    fill
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
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-8 items-center gap-2 ">
          <Link
            href={hasPrev ? `/?page=${page - 1}` : "/"}
            aria-disabled={!hasPrev}
            tabIndex={hasPrev ? undefined : -1}
            className={`${
              !hasPrev && "pointer-events-none opacity-50"
            } bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 text-gray-800`}
          >
            Prev
          </Link>

          <span className="text-gray-500 ml-2">
            {`${page * 25 - 24} - ${Math.min(page * 25, total)} of ${total} Pokemon`}
          </span>

          <Link
            href={hasNext ? `/?page=${page + 1}` : "/"}
            aria-disabled={!hasNext}
            tabIndex={hasNext ? undefined : -1}
            className={`${
              !hasNext && "pointer-events-none opacity-50"
            } bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 text-gray-800`}
          >
            Next
          </Link>
        </div>
      </div>
    </main>
  );
}
