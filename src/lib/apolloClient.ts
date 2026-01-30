import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://graphql.pokeapi.co/v1beta2/",
  }),
  cache: new InMemoryCache(),
});
