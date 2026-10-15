# Sergio Gómez - Portfolio

This is the source code for my personal website, developed as a project to showcase my skills as a web developer.

## Features

*   **Astro:** Static site generation with optimized images.
*   **Semantic HTML5:** Clear and accessible content structure.
*   **Modern CSS with SASS:** Modular and maintainable styling.
*   **Responsive Design:** Adaptable to different screen sizes.

## Package manager

> **This project uses [pnpm](https://pnpm.io/). Never use npm (or yarn) to install dependencies or run scripts.**
>
> Only `pnpm-lock.yaml` is maintained. A `preinstall` guard (`only-allow pnpm`) makes `npm install` fail on purpose. Do not add a `package-lock.json`.

## Installation

1.  Clone this repository to your local machine.
2.  Navigate to the project directory.
3.  Install the dependencies:

    ```bash
    pnpm install
    ```

## Usage

### Development

To start the local development server with hot-reloading, run:

```bash
pnpm dev
```

The site is served at `http://localhost:4321`.

### Build

To bundle and optimize the project for production, run:

```bash
pnpm build
```

The final files will be generated in the `dist/` directory. Files in `public/` (such as the Apache `.htaccess`) are copied into `dist/` as-is on every build.
Note: The HTML output is minified, but the content within `<pre><code>  </code></pre>` tags is preserved to maintain code formatting.

### Preview

To preview the production build locally, run:

```bash
pnpm preview
```

The preview is served at `http://localhost:4321`.
