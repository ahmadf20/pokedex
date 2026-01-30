import { graphqlFetch } from "@/lib/graphqlFetch";
import { GET_POKEMON } from "@/graphql/queries";
import { PokemonList } from "./components/PokemonList";
import { GetPokemonListResponse } from "../types/pokemonList";

export default async function Page() {
  const data = await graphqlFetch<GetPokemonListResponse>({
    query: GET_POKEMON?.loc?.source.body || "",
  });

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Pokédex
        </h1>

        <PokemonList data={data} />
      </div>
    </main>
  );
}
