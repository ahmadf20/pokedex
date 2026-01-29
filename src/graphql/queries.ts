import { gql } from "@apollo/client";

export const GET_POKEMON = gql`
  query GetPokemon {
    gen3_species: pokemonspecies {
      id
      name
      pokemons {
        pokemontypes {
          type {
            name
          }
        }
      }
    }
  }
`;
