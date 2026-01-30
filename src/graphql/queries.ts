import { gql } from "@apollo/client";

export const GET_POKEMON = gql`
  query GetPokemon {
    species: pokemonspecies {
      id
      name
      pokemons {
        types: pokemontypes {
          type {
            name
          }
        }
      }
    }
  }
`;

export const GET_POKEMON_BY_NAME = gql`
  query GetPokemonDetail($name: String!) {
    species: pokemonspecies(where: { name: { _eq: $name } }) {
      id
      name
      generation_id
      base_happiness
      capture_rate
      growthrate {
        name
      }
      pokemonhabitat {
        name
      }
      pokemonspeciesflavortexts(limit: 1, order_by: { id: asc }) {
        flavor_text
      }
    }
    pokemon(where: { name: { _eq: $name } }) {
      id
      name
      height
      weight
      base_experience
      pokemonstats {
        base_stat
        stat {
          name
        }
      }
      pokemontypes {
        type {
          name
        }
      }
      pokemonabilities {
        ability {
          name
        }
      }
    }
  }
`;
