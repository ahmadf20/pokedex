export type PokemonType = {
  type: {
    name: string;
  };
};

export type Pokemon = {
  id: number;
  name: string;
  pokemons: {
    pokemontypes: PokemonType[];
  }[];
};

export type GetPokemonResponse = {
  gen3_species: Pokemon[];
};
