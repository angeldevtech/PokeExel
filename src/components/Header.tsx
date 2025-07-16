import { createSignal, onMount } from "solid-js";
import { Sun, Moon } from 'lucide-solid';

export function Header() {
  const [isDarkMode, setIsDarkMode] = createSignal(false);

  onMount(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode());
    if (isDarkMode()) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header class="bg-gray-100 dark:bg-gray-800 shadow-md">
      <div class="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">PokeExel</h1>
        <button
          onClick={toggleDarkMode}
          class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode() ? 
          <Sun />
          :
          <Moon />
          }
        </button>
      </div>
    </header>
  );
}
