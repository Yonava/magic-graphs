# @magic/graph-algorithms

Well-documented, well-tested graph algorithm implementations. Documentation is the differentiator — every function must be thorough and consistent.

## Contributing

### File naming

Use full names. No abbreviations.

### Directory structure

Each algorithm lives in its own directory. The directory is named after the algorithm; the implementation and test files are `index.ts` and `index.test.ts`.

```text
traversals/
  breadth-first-search/
    index.ts
    index.test.ts
```

### Code standards

#### No abbreviations

Abbreviations are banned in all contexts: variable names, parameter names, function names, file names, and comments. This applies everywhere, not just public APIs.

```ts
const vis = new Set<string>();       ✗
const visited = new Set<string>();   ✓

for (const nbr of graph[node])       ✗
for (const neighbor of graph[node])  ✓
```

#### Do not reimplement existing algorithms

If your algorithm depends on another algorithm already in this package, import and use it. Do not copy-paste or rewrite it inline.

```ts
// Kosaraju's requires two DFS passes. USE OUR IMPLEMENTATION!
import { depthFirstSearch } from '../traversals/depth-first-search.ts';
```

This keeps implementations composable and ensures bug fixes propagate automatically.

#### Comment density

Most algorithms are dense and mathy. Err on the side of over-commenting rather than under-commenting. A reader should be able to follow the logic without needing to look anything up.

- Label each logical phase of the algorithm (e.g. `// Phase 1: build the residual graph`)
- Explain non-obvious invariants inline, not just in the JSDoc
- When an index, pointer, or value carries semantic meaning, say what it represents

```ts
// Relax all edges V - 1 times. A shortest path can have at most V - 1 edges,
// so after this many iterations every shortest distance is finalized.
for (let i = 0; i < vertexCount - 1; i++) {
```

### JSDoc template

Every exported function must include all six complexity bounds. Copy this template:

```ts
/**
 * [Full algorithm name]. [One sentence describing what it does and what it returns.]
 *
 * [Optional: one or two sentences on the approach taken, if non-obvious.]
 *
 * @complexity
 * Time:  O([worst])   Θ([average])   Ω([best])
 * Space: O([worst])   Θ([average])   Ω([best])
 *
 * where [V = number of vertices, E = number of edges, etc.]
 */
```

Notes on complexity:

- Always define your variables (V, E, etc.) on the last line.
- Ω(1) is correct when the start node has no neighbors — do not write Ω(V + E) just to match the other bounds.
- If time and space best/average/worst are all identical, they still must be written out explicitly.

### Tests

Every algorithm file must have a corresponding `.test.ts` file alongside it. Both unit tests and property-based tests are required... no exceptions!

#### Unit tests

Cover concrete, hand-constructed cases:

- The standard case
- Edge cases (empty graph, single node, disconnected graph, cycles)
- Any behavior explicitly called out in the JSDoc

#### Property-based tests

Cover invariants that must hold for all valid inputs (use [fast-check](https://github.com/dubzzz/fast-check)). Properties should express algorithmic guarantees rather than re-implementing the algorithm. Examples:

- Every node in the output was present in the input
- The output contains no duplicates
- Running the algorithm twice on the same input produces the same result
- For path-finding: the returned path cost equals the sum of its edge weights
- For MST: the result spans all nodes and has exactly V - 1 edges

If you are unsure what properties to assert, ask: "what must always be true about a correct result, regardless of the specific graph?"
