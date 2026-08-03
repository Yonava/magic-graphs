# history

Undo and redo, implemented as full graph snapshots rather than inverse actions so plugin-owned state (labels, etc.) is restored too.

| Export    | Dependencies | Optional dependencies |
| --------- | ------------ | --------------------- |
| `history` | none         | none                  |

**Controls:** `captureSnapshot`, `undo`, `redo`, `canUndo`, `canRedo`, `clear`, `recordCount`, `events`, `lifecycle`

**Events:** `onUndo`, `onRedo`, `onHistoryChanged`
