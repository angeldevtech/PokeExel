import { For } from "solid-js";
import type { Pokemon } from "../types";
import { RegionChip } from "./RegionChip";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard(props: PokemonCardProps) {
  const evYields = () => {
    const yields = props.pokemon.ev_yield;
    return Object.entries(yields)
      .filter(([_, value]) => value > 0)
      .map(([stat, value]) => `${value} ${stat.replace("_", " ").toUpperCase()}`)
      .join(", ");
  };

  return (
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <div class="p-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">{props.pokemon.name}</h2>
          <span class="text-sm font-mono text-gray-500 dark:text-gray-400">#{props.pokemon.id}</span>
        </div>
        <div class="mt-4">
          <p class="text-sm text-gray-600 dark:text-gray-300">Base EXP: {props.pokemon.base_exp}</p>
          <p class="text-sm text-gray-600 dark:text-gray-300">EV Yield: {evYields()}</p>
          <div class="mt-2">
            <For each={props.pokemon.regions} fallback={<span>No regions</span>}>
              {(region) => <RegionChip region={region} />}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
}