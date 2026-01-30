import { Species } from "@/types/pokemonList";
import { useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";

export const usePokemonList = ({ data }: { data: Species[] }) => {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("");

  const debouncedSearch = useDebounce(search, 300);

  const typeOptions = useMemo(() => {
    const allTypes = new Set<string>();
    data.forEach((pokemon) => {
      pokemon.pokemons.at(0)?.types.forEach((type) => {
        allTypes.add(type.type.name);
      });
    });
    return Array.from(allTypes).sort();
  }, [data]);

  const sortOptions = useMemo(() => {
    return [
      { value: "", label: "Default" },
      { value: "id-asc", label: "ID (Ascending)" },
      { value: "id-desc", label: "ID (Descending)" },
      { value: "name-asc", label: "Name (A-Z)" },
      { value: "name-desc", label: "Name (Z-A)" },
    ];
  }, []);

  const filteredData = useMemo(() => {
    if (!debouncedSearch && !selectedType) return data;

    return data.filter(
      (pokemon) =>
        (pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          pokemon.id.toString().padStart(3, "0").includes(debouncedSearch)) &&
        (selectedType === "" ||
          pokemon.pokemons
            .at(0)
            ?.types.some((type) => type.type.name === selectedType)),
    );
  }, [data, debouncedSearch, selectedType]);

  const sortedData = useMemo(() => {
    if (!selectedSort) return filteredData;

    return filteredData.toSorted((a, b) => {
      if (selectedSort === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      if (selectedSort === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      if (selectedSort === "id-asc") {
        return a.id - b.id;
      }
      if (selectedSort === "id-desc") {
        return b.id - a.id;
      }
      return 0;
    });
  }, [filteredData, selectedSort]);

  const onSearchChange = (value: string) => {
    setSearch(value);

    setTimeout(() => {
      setSelectedType("");
      setSelectedSort("");
    }, 300);
  };

  return {
    pokemonList: sortedData,
    search,
    onSearchChange,
    typeOptions,
    selectedType,
    setSelectedType,
    sortOptions,
    selectedSort,
    setSelectedSort,
  };
};
