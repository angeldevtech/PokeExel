import { ChevronDown } from "lucide-solid";
import type { Setter } from "solid-js";
import { getNameDisplay } from "../lib/utils";

interface FiltersProps {
  setEvYieldFilter: (value: string) => void;
  setRegionFilter: Setter<string[]>;
  regions: string[];
}

export function Filters(props: FiltersProps) {
  const evStats = ["hp", "attack", "defense", "special_attack", "special_defense", "speed"];

  const handleRegionChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      props.setRegionFilter((prev) => [...prev, target.value]);
    } else {
      props.setRegionFilter((prev) => prev.filter((r) => r !== target.value));
    }
  };

  return (
    <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-200" for="ev-yield">EV Yield</label>
          <div class="relative">
            <select
              name="ev-yield"
              class="appearance-none pr-8 mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              onChange={(e) => props.setEvYieldFilter(e.currentTarget.value)}
              aria-label="EV Yield Filter"
            >
              <option value="">All</option>
              {evStats.map((stat) => {
                const display = getNameDisplay(stat);
                return <option value={stat}>{display}</option>;
              })}
            </select>
            <ChevronDown class="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 dark:text-gray-300" />
          </div>
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-700 dark:text-gray-200">Regions</h3>
          <div class="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {props.regions.map((region) => (
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id={region}
                  value={region}
                  class="h-4 w-4 text-indigo-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                  onChange={handleRegionChange}
                />
                <label for={region} class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  {region}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
