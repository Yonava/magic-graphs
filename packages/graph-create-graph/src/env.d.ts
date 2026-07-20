// minimal ambient typing for import.meta.env.DEV, used by getters-audit.ts. kept local
// rather than depending on the `vite` package's types, since @graph/create-graph is
// meant to stay bundler-agnostic — Vite replaces import.meta.env.* at build time
// regardless of what this package declares; this is only so this package's own
// isolated `tsc -b` type-checks without needing a vite dependency.
interface ImportMetaEnv {
  readonly DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
