export type GetPokemonListResponse = {
  species: Species[];
};

export type Species = {
  id: number;
  name: string;
  pokemons: {
    types: PokemonType[];
  }[];
};

export type PokemonType = {
  type: {
    name: string;
  };
};
