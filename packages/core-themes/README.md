# @core/themes

The theming engine: layered token resolution with fall-through, where a token value can be a direct value or a getter that defers to the layer beneath it.

Carries no graph, canvas, or Vue coupling. `@graph/computed-tokens` binds it to nodes and edges.

**Key exports:** `createThemeController`, `createTokenResolver`, `createLayer`
