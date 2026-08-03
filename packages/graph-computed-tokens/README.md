# @graph/computed-tokens

Binds the `@core/themes` engine to graph data. Resolves the style tokens for a node or edge by running state detectors in precedence order, so the first active state wins (`error`, `focus`, `disabled`, `hovered`, `default`).

**Key exports:** `createComputedTokenResolver`, `computedTokenStatePrecedence`
