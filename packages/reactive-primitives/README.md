# @reactive/primitives

The reactivity layer the graph system builds on. A thin wrapper over [alien-signals](https://github.com/stackblitz/alien-signals) plus the reactive collections it does not ship.

Exists so plugin state can be tracked rather than manually invalidated. See issue #805 for the design and what it replaces.

## Surface

|                         |                                                                  |
| ----------------------- | ---------------------------------------------------------------- |
| `signal(initial)`       | readable and writable reactive value. `s()` reads, `s(v)` writes |
| `computed(getter)`      | derived value, memoized, recomputes lazily on read               |
| `reactiveMap(entries?)` | `Map` that tracks reads and notifies on real mutations           |
| `reactiveSet(values?)`  | `Set`, same                                                      |
| `untracked(fn)`         | read without registering a dependency                            |
| `batch(fn)`             | notify effects once across a run of writes                       |
| `effect(fn)`            | run on change. **framework binding layer only**, see below       |

## Rules

**Hold collection state in `reactiveMap`/`reactiveSet`, never a signal wrapping a plain one.** This is the whole reason the collections exist:

```ts
const labels = signal(new Map());
labels().set(id, label); // mutates in place, notifies nobody, type checks fine
```

**Keep everything pull based inside the SDK. No effects in core or plugins.** Computeds evaluate lazily on read, so a computed read inside an event handler is fresh because it evaluates at read time, not because the two systems were sequenced correctly. That is what lets signals and the event hub coexist without ordering hazards. `effect` is exported for the framework bindings (`@graph/vue`), which genuinely have to push into a render cycle.

**Signals answer "what is the current value". Events answer "what just happened".** If a subscriber would be equally happy just re-reading, it is a signal. If it needs to know which node, or added versus removed, it is an event.

## Notes

The version is pinned exactly. alien-signals has churned hard across major versions, and this package is the only place that should need to care.

Tracking is one version counter per collection rather than one per key. Graphs here are 10-50 nodes and edges, so over-invalidating a collection costs nothing measurable and per-key tracking would buy proxy machinery and its bugs. There is deliberately no deep `reactive` proxy for the same reason.

This package must resolve to a single instance. Two copies in a consumer's dependency tree break tracking across the boundary silently, with no error, so third-party plugins should take it as a peer dependency.
