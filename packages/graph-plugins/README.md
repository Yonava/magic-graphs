# @graph/plugins

Plugins for the graph SDK: canvas rendering, node dragging, marquee selection, focus management, keyboard shortcuts, and graph algorithm plugins (adjacency lists, graph characteristics, etc.).

## Authoring

**If it's a property of the element, it's an action option. If it's a property of the view, it's a control call.**

A label is element data, so `nodeLabel` extends `addNode` with a `label` option and wraps the action to record it. Focus and animation are view state that happened to be triggered by a data change, so they live at `controls.focus.set()` and `controls.animation.auto()` and wrap nothing.

```ts
// element data, so it rides along with the action
actions.addNode({ position, label: 'A' });

// view state, so the caller drives it
const finalize = controls.animation.auto();
actions.removeElements({ nodes, edges: [] });
actions.addElements(nextState);
finalize();
controls.focus.set([nodeId]);
```

Three reasons the line sits here:

**A flag can only wrap one action, a control call can bracket a sequence.** The example above animates a full teardown and rebuild as one captured frame. An `animate: true` option on each action would have produced two frames and a flicker, so the shorter form was also the weaker one.

**Action options are a flat bag with no owner.** `{ animate: true, focus: false, label: 'A' }` is three plugins writing into one object literal, with the same collision risk that controls avoid by being namespaced per plugin. Anything reachable as `controls.myPlugin.*` announces who owns it.

**Wrapping an action is real authority, so keep the set of plugins holding it small.** A plugin that wraps `addNode` sits in the hot path of every consumer's `addNode`, and when two plugins wrap the same action their resolution order comes from `dependsOn` rather than from anything the consumer wrote. Worth it for element data, not worth it for a side effect the caller could have triggered directly.

Corollary: an action must be safe to call for its data effect alone. If a consumer calls `removeElements` and gets a camera pan they did not ask for, some plugin put view state on the wrong side of the line.
