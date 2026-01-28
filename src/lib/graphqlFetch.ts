type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export async function graphqlFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const res = await fetch("https://graphql.pokeapi.co/v1beta2/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // cache for 60 seconds
  });

  const json: GraphQLResponse<T> = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data as T;
}
