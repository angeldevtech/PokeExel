import { createSignal, createEffect, onMount, For, Show, onCleanup } from "solid-js";
import type { Pokemon } from "./types/index";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { Filters } from "./components/Filters";
import { PokemonCard } from "./components/PokemonCard";
import { PokemonTable } from "./components/PokemonTable";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { SortDropdown } from "./components/SortDropdown";
import { ViewSwitcher } from "./components/ViewSwitcher";
import { ArrowUp } from "lucide-solid";

function App() {
  const [allPokemon, setAllPokemon] = createSignal<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = createSignal<Pokemon[]>([]);
  const [filteredBeforeSort, setFilteredBeforeSort] = createSignal<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = createSignal("");
  const [evYieldFilter, setEvYieldFilter] = createSignal("");
  const [regionFilter, setRegionFilter] = createSignal<string[]>([]);
  const [sortOption, setSortOption] = createSignal("id");
  
  // Handle EV filter changes to update sorting
  const handleEvYieldFilterChange = (value: string) => {
    setEvYieldFilter(value);
    if (value) {
      // When selecting an EV filter, automatically sort by that value
      setSortOption("ev_value");
      setSortOrder("desc");
    } else if (sortOption() === "ev_value") {
      // Only reset sort to ID if it was sorting by EV value
      setSortOption("id");
    }
  };
  const [sortOrder, setSortOrder] = createSignal("asc");
  const [viewMode, setViewMode] = createSignal("card");
  const [regions, setRegions] = createSignal<string[]>([]);
  const [isLoading, setIsLoading] = createSignal(true);

  const [showBackToTop, setShowBackToTop] = createSignal(false);
  const handleScroll = () => {
    setShowBackToTop(window.scrollY > 100);
  };
  onMount(() => {
    window.addEventListener("scroll", handleScroll);
  });
  onCleanup(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  onMount(async () => {
    try {
      const res = await fetch(import.meta.env.BASE_URL + "/pokemon.json");
      const data = await res.json();
      setAllPokemon(data);
      setFilteredPokemon(data);
      const allRegions = [...new Set(data.flatMap((p: Pokemon) => p.regions))];
      setRegions(allRegions as string[]);
    } catch (error) {
      console.error("Failed to fetch Pokémon data:", error);
    } finally {
      setIsLoading(false);
    }
  });

  createEffect(() => {
    setIsLoading(true);
    let filtered = allPokemon();

    if (searchTerm()) {
      const lowerCaseSearch = searchTerm().toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerCaseSearch) ||
          p.id.toString().includes(lowerCaseSearch)
      );
    }

    if (evYieldFilter()) {
      filtered = filtered.filter((p) => p.ev_yield[evYieldFilter() as keyof typeof p.ev_yield] > 0);
    }

    if (regionFilter().length > 0) {
      filtered = filtered.filter((p) =>
        regionFilter().every((region) => p.regions.includes(region))
      );
    }

    setFilteredBeforeSort(filtered);
    setIsLoading(false);
  });

  createEffect(() => {
    const filtered = [...filteredBeforeSort()];
    const order = sortOrder() === "asc" ? 1 : -1;
    
    if (sortOption() === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name) * order);
    } else if (sortOption() === "base_exp") {
      filtered.sort((a, b) => (b.base_exp - a.base_exp) * order);
    } else if (sortOption() === "ev_value" && evYieldFilter()) {
      filtered.sort((a, b) => {
        const aValue = a.ev_yield[evYieldFilter() as keyof typeof a.ev_yield];
        const bValue = b.ev_yield[evYieldFilter() as keyof typeof b.ev_yield];
        return (aValue - bValue) * order;
      });
    } else {
      filtered.sort((a, b) => (a.id - b.id) * order);
    }

    setFilteredPokemon(filtered);
  });

  return (
    <div class="bg-gray-50 dark:bg-gray-900 min-h-screen relative">
      <Header />
      <main class="container mx-auto flex flex-col p-4 gap-4">
        <SearchBar setSearchTerm={setSearchTerm} />
        <Filters
          setEvYieldFilter={handleEvYieldFilterChange}
          setRegionFilter={setRegionFilter}
          regions={regions()}
        />
        <div class="flex flex-wrap justify-between items-stretch gap-4">
          <ViewSwitcher
            viewMode={viewMode()}
            setViewMode={setViewMode}
          />
          <SortDropdown
            sortOption={sortOption()}
            setSortOption={setSortOption}
            sortOrder={sortOrder()}
            setSortOrder={setSortOrder}
            evYieldFilter={evYieldFilter()}
          />
        </div>
        <Show when={!isLoading()} fallback={<LoadingIndicator />}>
          <Show
            when={filteredPokemon().length > 0}
            fallback={<p class="text-center text-xl text-gray-500 dark:text-gray-400 py-8">No Pokemon match your query.</p>}
          >
            <Show when={viewMode() === "card"}>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <For each={filteredPokemon()}>
                  {(pokemon) => <PokemonCard pokemon={pokemon} />}
                </For>
              </div>
            </Show>
            <Show when={viewMode() === "table"}>
              <PokemonTable pokemon={filteredPokemon()} />
            </Show>
          </Show>
        </Show>
        {/* Back to Top Floating Button */}
        <Show when={showBackToTop()}>
          <button
            class="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-white dark:bg-gray-700 text-black dark:text-white shadow-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"            
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <ArrowUp />
          </button>
        </Show>
      </main>
      {/* Footer */}
      <footer class="w-full text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
        Pokémon data by reddit user <a href="https://www.reddit.com/user/Dan_t654" target="_blank" rel="noopener noreferrer" class="underline hover:text-blue-600">Dan_t654</a>
      </footer>
    </div>
  );
}

export default App;
