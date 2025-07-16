import { For } from "solid-js";
import type { Pokemon } from "../types";
import { RegionChip } from "./RegionChip";

interface PokemonTableProps {
  pokemon: Pokemon[];
}

export function PokemonTable(props: PokemonTableProps) {
  return (
    <div class="overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">ID</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Base EXP</th>
            <th scope="col" class="px-6 py-3">EV Yield</th>
            <th scope="col" class="px-6 py-3">Regions</th>
          </tr>
        </thead>
        <tbody>
          <For each={props.pokemon}>
            {(p) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{p.id}</td>
                <td class="px-6 py-4">{p.name}</td>
                <td class="px-6 py-4">{p.base_exp}</td>
                <td class="px-6 py-4">
                  {Object.entries(p.ev_yield)
                    .filter(([_, value]) => value > 0)
                    .map(([stat, value]) => `${value} ${stat.replace("_", " ").toUpperCase()}`)
                    .join(", ")}
                </td>
                <td class="px-6 py-4">
                  <For each={p.regions} fallback={<span>No regions</span>}>
                    {(region) => <RegionChip region={region} />}
                  </For>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}