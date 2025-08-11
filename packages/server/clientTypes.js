"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markovSccColorizer = exports.TUTORIAL_THEME_ID = exports.DELAY_UNTIL_NEXT_STEP = exports.NON_COLOR_THEMES = exports.resolveThemeForEdge = exports.resolveThemeForNode = exports.THEMES = exports.getThemeResolver = exports.DEFAULT_GRAPH_SETTINGS = exports.getInitialEventBus = void 0;
/**
 * @returns an empty event bus with all events initialized to empty sets
 */
const getInitialEventBus = () => {
    const eventBus = {
        /**
         * BaseGraphEvents
         */
        onStructureChange: new Set(),
        onNodeAdded: new Set(),
        onNodeRemoved: new Set(),
        onNodeMoved: new Set(),
        onEdgeAdded: new Set(),
        onEdgeRemoved: new Set(),
        onEdgeWeightChange: new Set(),
        onRepaint: new Set(),
        onNodeHoverChange: new Set(),
        onGraphReset: new Set(),
        onClick: new Set(),
        onMouseDown: new Set(),
        onMouseUp: new Set(),
        onMouseMove: new Set(),
        onDblClick: new Set(),
        onContextMenu: new Set(),
        onKeyDown: new Set(),
        onThemeChange: new Set(),
        onSettingsChange: new Set(),
        /**
         * FocusGraphEvents
         */
        onFocusChange: new Set(),
        /**
         * DraggableGraphEvents
         */
        onNodeDragStart: new Set(),
        onNodeDrop: new Set(),
        /**
         * NodeAnchorGraphEvents
         */
        onNodeAnchorDragStart: new Set(),
        onNodeAnchorDrop: new Set(),
    };
    return eventBus;
};
exports.getInitialEventBus = getInitialEventBus;
/**
 * the default settings for a graph instance
 */
exports.DEFAULT_GRAPH_SETTINGS = {
    ...DEFAULT_BASE_SETTINGS,
    ...DEFAULT_FOCUS_SETTINGS,
    ...DEFAULT_DRAGGABLE_SETTINGS,
    ...DEFAULT_NODE_ANCHOR_SETTINGS,
    ...DEFAULT_MARQUEE_SETTINGS,
    ...DEFAULT_USER_EDITABLE_SETTINGS,
    ...DEFAULT_PERSISTENT_SETTINGS,
    ...DEFAULT_COLLABORATIVE_SETTINGS,
};
const getThemeResolver = (theme, themeMap) => (prop, ...args) => {
    const themeMapEntry = themeMap[prop].findLast((themeMapEntryItem) => {
        const themeGetterOrValue = themeMapEntryItem.value;
        const themeValue = getValue(themeGetterOrValue, ...args);
        return themeValue ?? false;
    });
    const getter = themeMapEntry?.value ?? theme.value[prop];
    if (!getter)
        throw new Error(`Theme property "${prop}" not found`);
    return getValue(getter, ...args);
};
exports.getThemeResolver = getThemeResolver;
exports.THEMES = {
    light: LIGHT_THEME,
    dark: DARK_THEME,
};
/**
 * gets the theme attributes for a GNode at the point in time the function is called
 *
 * @param getTheme - the theme getter function
 * @param node - the node to get the theme for
 * @returns the theme attributes for the node
 */
const resolveThemeForNode = (getTheme, node) => ({
    nodeSize: getTheme('nodeSize', node),
    nodeBorderWidth: getTheme('nodeBorderWidth', node),
    nodeColor: getTheme('nodeColor', node),
    nodeBorderColor: getTheme('nodeBorderColor', node),
    nodeFocusColor: getTheme('nodeFocusColor', node),
    nodeFocusBorderColor: getTheme('nodeFocusBorderColor', node),
    nodeTextSize: getTheme('nodeTextSize', node),
    nodeTextColor: getTheme('nodeTextColor', node),
    nodeFocusTextColor: getTheme('nodeFocusTextColor', node),
    nodeText: getTheme('nodeText', node),
    nodeShape: getTheme('nodeShape', node),
});
exports.resolveThemeForNode = resolveThemeForNode;
/**
 * gets the theme attributes for a GEdge at the point in time the function is called
 *
 * @param getTheme - the theme getter function
 * @param edge - the edge to get the theme for
 * @returns the theme attributes for the edge
 */
const resolveThemeForEdge = (getTheme, edge) => ({
    edgeWidth: getTheme('edgeWidth', edge),
    edgeColor: getTheme('edgeColor', edge),
    edgeTextSize: getTheme('edgeTextSize', edge),
    edgeTextColor: getTheme('edgeTextColor', edge),
    edgeFocusColor: getTheme('edgeFocusColor', edge),
    edgeFocusTextColor: getTheme('edgeFocusTextColor', edge),
    edgeTextFontWeight: getTheme('edgeTextFontWeight', edge),
});
exports.resolveThemeForEdge = resolveThemeForEdge;
/**
 * themes that do not depend on color scheme
 */
exports.NON_COLOR_THEMES = {
    nodeShape: 'circle',
    nodeSize: 35,
    nodeBorderWidth: 8,
    nodeTextSize: 24,
    // Math.ceil(Math.sqrt(nodeSize) * 2)
    nodeAnchorRadius: Math.ceil(Math.sqrt(35) * 2),
    edgeWidth: 10,
    edgeTextSize: 20,
    nodeText: ({ label }) => label,
    edgeTextFontWeight: 'bold',
    linkPreviewWidth: 10,
};
/**
 * time to wait (in milliseconds) between the dismissal of a step and the initialization of the next step
 */
exports.DELAY_UNTIL_NEXT_STEP = 1000;
exports.TUTORIAL_THEME_ID = 'tutorial';
from;
"@colors";
const colors_1 = require("./colors");
const useSCC_1 = require("./useSCC");
const defaultColors = [
    color.RED,
    color.YELLOW,
    color.GREEN,
    color.BLUE,
    color.INDIGO,
    color.PURPLE,
    color.PINK,
];
const markovSccColorizer = (graph, colors = defaultColors) => {
    const adjList = computed(() => nodesEdgesToAdjList(graph.nodes.value, graph.edges.value));
    const { markovClasses, nodeToConnectedComponentMap } = (0, useSCC_1.useMarkovChainSCC)(adjList);
    const transientStates = computed(() => markovClasses.value.transientClasses.flat());
    const getColor = (node) => {
        const label = Number(node.label);
        if (transientStates.value.includes(label))
            return colors_1.TRANSIENT_COLOR;
        const componentIndex = nodeToConnectedComponentMap.value.get(label);
        if (componentIndex === undefined)
            return colors_1.TRANSIENT_COLOR;
        return colors[componentIndex % colors.length];
    };
    graph.theme.value.nodeBorderColor = getColor;
    graph.theme.value.nodeAnchorColor = getColor;
    graph.theme.value.nodeAnchorColorWhenParentFocused = getColor;
    graph.theme.value.nodeFocusBorderColor = getColor;
    graph.theme.value.nodeFocusColor = GRAY_800;
};
exports.markovSccColorizer = markovSccColorizer;
