# canvas

Owns the drawing surface. Aggregates every shape plugins want rendered, runs the animation loop, tracks what sits under the cursor, and re-emits DOM mouse and keyboard events as graph-aware ones.

| Export                | Dependencies | Optional dependencies |
| --------------------- | ------------ | --------------------- |
| `canvas(magicCanvas)` | none         | none                  |

**Controls:** `aggregator`, `shapes`, `renderer`, `graphUnderCursor`, `getNodePriority`, `theme`, `events`

**Events:** `onClick`, `onDblClick`, `onContextMenu`, `onMouseDown`, `onMouseMove`, `onMouseUp`, `onKeyDown`, `onKeyUp`, `onBeforeDraw`, `onDraw`, `onGraphUnderCursorChange`, `onHoveredElementChange`

**Transit:** pan and zoom.
