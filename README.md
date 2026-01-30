# Project Plan – Pokémon Explorer (Next.js + GraphQL)

## Objective

Build a Pokémon explorer web app inspired by the reference Pokedex, focusing on **clarity of logic, clean code structure, and sound technical decisions** rather than visual perfection.

Tech stack:

* Next.js (App Router)
* TypeScript
* TailwindCSS
* GraphQL (https://graphql.pokeapi.co/v1beta2)

---

## High-level Approach

* Fetch Pokémon data once using GraphQL
* Perform search, filter, sort, and comparison **client-side**
* Keep data logic centralized and UI components simple
* Optimize for readability, maintainability, and predictable data flow

### Core Features

#### 1. Search

* Case-insensitive search by Pokémon name or ID
* Client-side filtering

#### 2. Filter

* Filter by Pokémon type
* Type list derived from fetched Pokémon data
* Pokémon matches if it has **any** selected type

#### 3. Sort

* Sort by name (A–Z)
* Sort by ID
* Sorting applied after search and filter

#### 4. Comparison

* Select up to 5 Pokémon
* Side-by-side comparison view
* Clear selection and removal behavior

### Data Flow Strategy

```
rawPokemonList
  → search (debounced)
  → filter
  → sort
  → visiblePokemon
```

### Architecture Decisions

* Centralize logic in a custom hook (`usePokemonList`)
* Avoid unnecessary GraphQL refetching
* Use debouncing for search to improve performance

## Key Technical Decisions

### Client-side Data Processing

* Dataset size (~1025 Pokémon) is small enough for in-memory filtering
* Enables instant UI interactions
* Avoids unnecessary network requests

### Pagination

* PokeAPI GraphQL only supports limit and offset
* Pagination not required for this scope
* Client-side processing preferred for clarity

### Pokémon Types for Filter

* Derived from Pokémon list data
* Single source of truth
* Avoids additional GraphQL queries

---

## Future Improvements (Out of Scope)

* Server-side filtering and pagination for large datasets
* URL persistence for search, filter, and sort (if needed)
* Cursor-based pagination (if API supports it)
* Advanced UI polish and animations
* Accessibility enhancements
* Testing
* Code generation
* Linting and formatting
