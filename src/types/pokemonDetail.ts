export type GetPokemonDetailResponse = {
  species: Species[];
  pokemon: Pokemon[];
};

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  pokemon_species_id: number;
  pokemonstats: PokemonStat[];
  pokemontypes: PokemonType[];
  pokemonabilities: PokemonAbility[];
};

export type PokemonAbility = {
  ability: {
    name: string;
  };
};

export type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

export type PokemonType = {
  type: {
    name: string;
  };
};

export type Species = {
  id: number;
  name: string;
  generation_id: number;
  base_happiness: number;
  capture_rate: number;
  growthrate: {
    name: string;
  };
  pokemonhabitat?: {
    name: string;
  };
  pokemonspeciesflavortexts: PokemonSpeciesFlavorText[];
};

export type PokemonSpeciesFlavorText = {
  flavor_text: string;
};
