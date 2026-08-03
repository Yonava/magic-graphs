# nodeLabel

Attaches human-readable labels to nodes, auto-generating A, B, C... for new ones, and draws them on the node.

| Export      | Dependencies | Optional dependencies |
| ----------- | ------------ | --------------------- |
| `nodeLabel` | `canvas`     | `focus`               |

**Controls:** `get`, `set`, `setMany`, `lifecycle`

**Extends:** `getNode` gains a `label` field, `addNode` and `addElements` gain a `label` option.

**Transit:** the node id to label mapping.
