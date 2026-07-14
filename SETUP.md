# Setup

## Prerequisites

- **Node 24+** — this repo's `.nvmrc` pins `24.12.0`. If you use [fnm](https://github.com/Schniz/fnm) or [nvm](https://github.com/nvm-sh/nvm), `cd`-ing into this repo will pick up the right version automatically (as long as your shell is configured with `--use-on-cd` / equivalent auto-switching).
- **pnpm** — this is a pnpm workspace monorepo (see `pnpm-workspace.yaml`). Install via `corepack enable` or `npm i -g pnpm`.

## Install

From the repo root:

```sh
pnpm install
```

This installs dependencies for every package in `packages/*`.

## Run the client

```sh
pnpm dev
```

This runs `@magic/client`'s dev server (Nuxt), which includes hot module replacement.

## Build the client

```sh
pnpm build
```

Runs `nuxt generate` for `@magic/client`, producing a static site in `packages/magic-client/.output/public` — deployable to any static host (e.g. Netlify) with no server process required.

## Other useful scripts

- `pnpm test` — runs the vitest suite across all packages.
- `pnpm format` — formats the repo with Prettier.
- `pnpm build:types` — type-checks and builds declaration files across all workspace packages via TypeScript project references.
- `pnpm clean:nuke` — wipes `node_modules`, the lockfile, and all `dist` folders, then reinstalls and rebuilds types. Use this if something in the workspace gets into a weird state.

## Repo structure

- `packages/magic-client` — the product/marketing site (Nuxt, SSG).
- `packages/core-components` — shared, colorless component library (Reka UI + Tailwind), consumed by product code and themed on top.
- `packages/core-ui`, `packages/core-utils` — legacy/shared core utilities.
- `packages/graph-*`, `packages/canvas-*` — the framework-agnostic graph engine and its plugins/primitives.
- `packages/magic-products` — product-specific graph configurations.
