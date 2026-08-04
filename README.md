# Welcome To Graph Kit

The TypeScript Native, Framework Agnostic Graph SDK.

Composable and Progressive.

**Progressive.** The core is a bare graph data structure: nodes, edges, weights,
and the actions, getters, and events that move them. Capability is bought one
plugin at a time, so a graph that only answers structural questions never carries
the machinery for dragging, undo, or selection. Everything past the core is a
plugin you opt into:

|                     |                                                                |
| ------------------- | -------------------------------------------------------------- |
| **canvas**          | draws the graph and tracks what sits under the cursor          |
| **interactive**     | double-click to add a node, drag between nodes to connect them |
| **nodeDrag**        | pick up nodes and move them, one or a whole selection          |
| **focus**           | tracks and highlights what is selected                         |
| **history**         | undo and redo                                                  |
| **characteristics** | is the graph connected, complete, bipartite, cyclic            |

That is 6 of 13. See [`packages/graph-plugins`](./packages/graph-plugins) for
the full list, and each plugin's own README for its dependencies and API.

**Composable.** The plugin array is the configuration. `createGraph` folds it into
one surface of actions, getters, controls, and events, and derives the type of that
surface from the array you passed, so `characteristics` appears on the graph only
because you asked for it:

```ts
const graph = createGraph({
  plugins: [canvas(surface), adjacencyLists, characteristics],
  themePresets: { light, dark },
});

graph.characteristics.bipartite();
```

Plugins compose with each other the same way. Each declares what it builds on
through `dependsOn`, which is how `characteristics` reads the adjacency lists it
needs and how `marquee` reaches both `canvas` and `focus`, types carried across
the seam.

## Status

Graph Kit is in **early alpha**. Expect breaking changes!

## Development

Node 24+ and pnpm. From the repo root:

```sh
pnpm install
pnpm dev
```

See [SETUP.md](./SETUP.md) for the full script list and repo layout.
