import type { Setter } from "solid-js";
import { Grid, List } from "lucide-solid";

interface ViewSwitcherProps {
  viewMode: string;
  setViewMode: Setter<string>;
}

export function ViewSwitcher(props: ViewSwitcherProps) {
  return (
    <div class="flex items-center bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg">
      <button
        onClick={() => props.setViewMode("card")}
        class={`p-2 rounded-md transition-colors duration-200 ${ 
          props.viewMode === "card" 
            ? "bg-white dark:bg-gray-800 text-black dark:text-white"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <Grid />
      </button>
      <button
        onClick={() => props.setViewMode("table")}
        class={`p-2 rounded-md transition-colors duration-200 ${ 
          props.viewMode === "table" 
            ? "bg-white dark:bg-gray-800 text-black dark:text-white"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <List />
      </button>
    </div>
  );
}
