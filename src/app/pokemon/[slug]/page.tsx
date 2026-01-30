import { GetPokemonDetailResponse } from "@/app/types/pokemonDetail";
import { GET_POKEMON_BY_NAME } from "@/graphql/queries";
import { graphqlFetch } from "@/lib/graphqlFetch";
import Link from "next/link";
import { PokemonDetailCard } from "./components/pokemonDetailCard";

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const data = await graphqlFetch<GetPokemonDetailResponse>({
      query: GET_POKEMON_BY_NAME?.loc?.source.body || "",
      variables: {
        name: slug,
      },
    });

    if (!data?.pokemon?.length || !data?.species?.length) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Pokémon Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The Pokémon &quot;{slug}&quot; could not be found.
            </p>
            <Link
              href="/"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Back to Pokédex
            </Link>
          </div>
        </div>
      );
    }

    const pokemon = data.pokemon[0];
    const species = data.species[0];

    return <PokemonDetailCard pokemon={pokemon} species={species} />;
  } catch {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Pokémon
          </h1>
          <p className="text-gray-600 mb-6">
            There was an error loading the Pokémon data.
          </p>
          <Link
            href="/"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Pokédex
          </Link>
        </div>
      </div>
    );
  }
}
