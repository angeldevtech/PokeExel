# PokéExcel

A simple and fast Pokémon EV tracker built with SolidJS, TypeScript, and Tailwind CSS. The Pokémon data is sourced from Reddit user [Dan_t654](https://www.reddit.com/user/Dan_t654).

## Features

*   **Search:** Find Pokémon by name or ID.
*   **Filter:** Filter Pokémon by EV yield and region.
*   **Sort:** Sort Pokémon by ID, name, or base experience.
*   **Dark Mode:** Toggle between light and dark mode.
*   **Responsive:** The layout is fully responsive and works on all screen sizes.

## Getting Started

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/poke-excel.git
    ```

2.  Install the dependencies:

    ```bash
    bun install
    ```

3.  Start the development server:

    ```bash
    bun dev
    ```

## Project Structure

```
src/
  ├── components/    # Solid components
  ├── lib/           # Utility functions
  ├── types/         # TypeScript type definitions
  ├── assets/        # Static assets
  └── App.tsx        # Main application component
```

## Deployment

To deploy this project to GitHub Pages:

1. **Build the project:**

    ```bash
    bun run build
    ```

    This will generate a `dist` folder with the static site.

2. **Deploy the `dist` folder to GitHub Pages.** You can do this manually or use the `gh-pages` branch. Here is a simple way using the `gh-pages` npm package:

    a. Install `gh-pages` globally (if you haven't already):
    ```bash
    bun add -D gh-pages
    ```

    b. Add the following script to your `package.json`:
    ```json
    "scripts": {
      // ...existing scripts...
      "deploy": "gh-pages -d dist"
    }
    ```

    c. Deploy:
    ```bash
    bun run deploy
    ```

3. **Configure GitHub Pages** in your repository settings to serve from the `gh-pages` branch.

After deployment, your site will be available at `https://<your-username>.github.io/<repo-name>/`.

## Acknowledgments

- Special thanks to Reddit user [Dan_t654](https://www.reddit.com/user/Dan_t654) for providing the Pokémon data.
- Pokémon data is converted from Excel to JSON using a Python script in the `convert` directory.