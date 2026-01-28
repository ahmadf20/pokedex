export const GET_POKEMON = `
  query GetPokemon($limit: Int!, $offset: Int!) {
    gen3_species: pokemonspecies(limit: $limit, offset: $offset) {
      id
      name
    }
    pokemonspecies_aggregate {
      aggregate {
        count
      }
    }
  }
`;
