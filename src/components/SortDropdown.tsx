import { createSignal, type Setter } from "solid-js";
import { Check, ChevronDown } from "lucide-solid";
import { getNameDisplay } from "../lib/utils";

interface SortDropdownProps {
  sortOption: string;
  setSortOption: Setter<string>;
  sortOrder: string;
  setSortOrder: Setter<string>;
  evYieldFilter: string;
}

export function SortDropdown(props: SortDropdownProps) {
  const [isOpen, setIsOpen] = createSignal(false);

  const getOptions = () => ({
    "Sort by": [
      { value: "id", label: "ID" },
      { value: "name", label: "Name" },
      { value: "base_exp", label: "Base EXP" },
      ...(props.evYieldFilter ? [{ value: "ev_value", label: `${getNameDisplay(props.evYieldFilter)} EV` }] : []),
    ],
    "Order": [
      { value: "asc", label: "Ascending" },
      { value: "desc", label: "Descending" },
    ],
  });

  const handleOptionClick = (type: string, value: string) => {
    if (type === "Sort by") {
      props.setSortOption(value);
    } else {
      props.setSortOrder(value);
    }
    setIsOpen(false);
  };

  return (
    <div class="relative inline-block text-left">
      <div>
        <button
          type="button"
          class="inline-flex justify-center items-center w-full rounded-md shadow-sm px-4 py-2 gap-1 bg-gray-200 dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen())}
        >
          Sort By
          <ChevronDown class="w-5" />
        </button>
      </div>

      {isOpen() && (
        <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 ring-opacity-5">
          <div class="py-1 divide-y-1 divide-gray-200 dark:divide-gray-700" role="menu" aria-orientation="vertical">
            {Object.entries(getOptions()).map(([group, items]) => (
              <div>
                <div class="px-4 py-2 text-xs text-gray-400">{group}</div>
                {items.map((item: { value: string; label: string }) => (
                  <a
                    href="#"
                    class="flex justify-between items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={(e) => {
                      e.preventDefault();
                      handleOptionClick(group, item.value);
                    }}
                  >
                    {item.label}
                    {(props.sortOption === item.value || props.sortOrder === item.value) && (
                      <Check class="h-4 w-4 text-blue-500" />
                    )}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
