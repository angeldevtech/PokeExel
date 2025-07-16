import type { Setter } from "solid-js";

interface SearchBarProps {
  setSearchTerm: Setter<string>;
}

export function SearchBar(props: SearchBarProps) {
  return (
    <input
      type="text"
      name="search"
      placeholder="Search by name or pokedex ID"
      class="w-full p-2 border bg-gray-200 border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      onInput={(e) => props.setSearchTerm(e.currentTarget.value)}
    />
  );
}
