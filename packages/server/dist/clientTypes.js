"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSimulationControls = exports.PROGRESS_DEFAULTS = exports.triangle = exports.TRIANGLE_DEFAULTS = exports.scribble = exports.ERASER_BRUSH_WEIGHT = exports.SCRIBBLE_DEFAULTS = exports.useSimulationRunner = exports.useMSTSimulationRunner = exports.kruskal = exports.useMarkupSizer = exports.useMarkupColorizer = exports.useDijkstra = exports.getWeightedAdjacencyList = exports.TUTORIAL_THEME_ID = exports.DELAY_UNTIL_NEXT_STEP = exports.ThemeToGraphColors = exports.NON_COLOR_THEMES = exports.resolveThemeForEdge = exports.resolveThemeForNode = exports.THEMES = exports.getThemeResolver = exports.DEFAULT_GRAPH_SETTINGS = exports.selectFromGraph = exports.ANIMATE_NODE_MOVE_OPTIONS_DEFAULTS = exports.getInitialEventBus = exports.useGraphCursor = void 0;
/**
 * manages the cursor type when hovering over the graph
 *
 * @param subscribe - the event subscriber
 * @param canvas - the canvas element
 * @param graphAtMousePosition - the graph items at the mouse position
 * @returns the cursor manager
 */
const useGraphCursor = ({ subscribe, canvas, graphAtMousePosition, }) => {
    const isMouseDown = ref(false);
    const graphCursorDisabled = ref(false);
    const graphToCursorMap = ref({
        'node': 'grab',
        'edge': 'pointer',
        'node-anchor': 'grab',
        'encapsulated-node-box': 'move',
    });
    const isItemSelectable = ref();
    const inSelectMode = computed(() => !!isItemSelectable.value);
    const activateCursorSelectMode = (predicate) => {
        isItemSelectable.value = predicate;
    };
    const deactivateCursorSelectMode = () => {
        isItemSelectable.value = undefined;
    };
    const getCursorType = (item) => {
        if (!item)
            return 'default';
        if (inSelectMode.value) {
            const isSelectable = isItemSelectable.value?.(item) ?? false;
            return isSelectable ? 'pointer' : 'default';
        }
        const cursor = graphToCursorMap.value[item.graphType] ?? 'default';
        if (cursor === 'grab' && isMouseDown.value)
            return 'grabbing';
        return cursor;
    };
    const changeCursorType = ({ items }) => {
        if (!canvas.value || graphCursorDisabled.value)
            return;
        const topItem = items.at(-1);
        canvas.value.style.cursor = getCursorType(topItem);
    };
    subscribe('onMouseDown', (ev) => {
        isMouseDown.value = true;
        changeCursorType(ev);
    });
    subscribe('onMouseUp', (ev) => {
        isMouseDown.value = false;
        changeCursorType(ev);
    });
    subscribe('onMouseMove', changeCursorType);
    watch(graphToCursorMap, () => {
        changeCursorType({
            items: graphAtMousePosition.value.items
        });
    }, { deep: true });
    return {
        /**
         * maps graph schema item types to browser cursor.
         * changing this mapping will change the cursor type when hovering over the graph.
         */
        graphToCursorMap,
        /**
         * activates a cursor select mode, where only the schema items that pass the
         * `predicate` will receive a pointer cursor.
         * everything else will receive the default cursor as long as this mode is active.
         * @param predicate - a predicate that determines, given a schema item, whether it is selectable.
         * @example activateCursorSelectMode((item) => item.graphType === 'node')
         * // in select mode
         * // only nodes will receive a pointer cursor
         */
        activateCursorSelectMode,
        /**
         * deactivates the cursor select mode. to be called after `activateCursorSelectMode`.
         * @example activateCursorSelectMode((item) => item.graphType === 'node')
         * // in select mode
         * deactivateCursorSelectMode()
         * // no longer in select mode
         */
        deactivateCursorSelectMode,
        /**
         * when the graph cursor is disabled, the cursor will always be the default cursor.
         */
        graphCursorDisabled,
    };
};
exports.useGraphCursor = useGraphCursor;
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
        onBulkNodeAdded: new Set(),
        onNodeRemoved: new Set(),
        onBulkNodeRemoved: new Set(),
        onNodeMoved: new Set(),
        onBulkNodeMoved: new Set(),
        onEdgeAdded: new Set(),
        onBulkEdgeAdded: new Set(),
        onEdgeRemoved: new Set(),
        onBulkEdgeRemoved: new Set(),
        onEdgeLabelEdited: new Set(),
        onRepaint: new Set(),
        onNodeHoverChange: new Set(),
        onGraphLoaded: new Set(),
        onGraphReset: new Set(),
        onClick: new Set(),
        onMouseDown: new Set(),
        onMouseUp: new Set(),
        onMouseMove: new Set(),
        onDblClick: new Set(),
        onContextMenu: new Set(),
        onKeyDown: new Set(),
        onKeyUp: new Set(),
        onThemeChange: new Set(),
        onSettingsChange: new Set(),
        /**
         * HistoryGraphEvents
         */
        onUndo: new Set(),
        onRedo: new Set(),
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
        /**
         * MarqueeGraphEvents
         */
        onGroupDragStart: new Set(),
        onGroupDrop: new Set(),
    };
    return eventBus;
};
exports.getInitialEventBus = getInitialEventBus;
exports.ANIMATE_NODE_MOVE_OPTIONS_DEFAULTS = {
    durationMs: 300,
    broadcast: true,
    history: true,
    persist: true,
};
/**
 * default predicate for `selectFromGraph`
 */
const DEFAULT_PREDICATE = () => true;
/**
 * waits for the user to click on an item in the graph and resolves to the selected item
 * or undefined if the cancel handler is invoked
 *
 * @param graph the graph to select from
 * @param options options for the selection process
 * @returns a promise that resolves to the selected item or undefined if the selection was cancelled
 * @example const { selectedItemPromise, cancelSelection } = selectFromGraph(graph);
 * const selectedItem = await selectedItemPromise;
 * if (!selectedItem) return; // selection was cancelled
 * // selection resolved. do something with the selected item
 */
const selectFromGraph = (graph, { predicate = DEFAULT_PREDICATE, } = {}) => {
    let resolver;
    const selectedItemPromise = new Promise((res) => resolver = res);
    const onClick = ({ items }) => {
        const topItem = items.at(-1);
        if (!topItem || !predicate(topItem))
            return;
        resolve(topItem);
    };
    const initialInteractive = graph.settings.value.interactive;
    const initialFocusable = graph.settings.value.focusable;
    /**
     * initializes the selection process
     */
    const init = () => {
        graph.subscribe('onClick', onClick);
        graph.settings.value.interactive = false;
        graph.settings.value.focusable = false;
        const cursorPredicate = predicate === DEFAULT_PREDICATE ? ((item) => !!item) : predicate;
        graph.activateCursorSelectMode(cursorPredicate);
    };
    /**
     * cleans up the selection process
     */
    const cleanup = () => {
        graph.unsubscribe('onClick', onClick);
        graph.settings.value.interactive = initialInteractive;
        graph.settings.value.focusable = initialFocusable;
        graph.deactivateCursorSelectMode();
    };
    /**
     * resolves the selection process and returns the selected item from the promise
     */
    const resolve = (item) => {
        cleanup();
        resolver(item);
    };
    /**
     * cancels the selection process and returns undefined from the promise (public)
     */
    const cancelSelection = () => {
        cleanup();
        resolver(undefined);
    };
    init();
    return {
        /**
         * resolves to the selected item or undefined if the
         * selection was cancelled by calling the cancel handler
         */
        selectedItemPromise,
        cancelSelection,
    };
};
exports.selectFromGraph = selectFromGraph;
/**
 * the default settings for a graph instance
 */
exports.DEFAULT_GRAPH_SETTINGS = {
    ...DEFAULT_BASE_SETTINGS,
    ...DEFAULT_FOCUS_SETTINGS,
    ...DEFAULT_DRAGGABLE_SETTINGS,
    ...DEFAULT_NODE_ANCHOR_SETTINGS,
    ...DEFAULT_MARQUEE_SETTINGS,
    ...DEFAULT_INTERACTIVE_SETTINGS,
    ...DEFAULT_PERSISTENT_SETTINGS,
    ...DEFAULT_SHORTCUT_SETTINGS,
};
const getThemeResolver = (themeName, themeMap) => (prop, ...args) => {
    const themeMapEntry = themeMap[prop].findLast((themeMapEntryItem) => {
        const themeGetterOrValue = themeMapEntryItem.value;
        const themeValue = getValue(themeGetterOrValue, ...args);
        return themeValue !== undefined;
    });
    const getter = themeMapEntry?.value ?? exports.THEMES[themeName.value][prop];
    if (!getter)
        throw new Error(`Theme property "${prop}" not found`);
    return getValue(getter, ...args);
};
exports.getThemeResolver = getThemeResolver;
exports.THEMES = {
    light: LIGHT_THEME,
    dark: DARK_THEME,
    girl: GIRL_THEME,
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
    nodeTextSize: getTheme('nodeTextSize', node),
    nodeTextColor: getTheme('nodeTextColor', node),
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
    edgeText: getTheme('edgeText', edge),
    edgeTextSize: getTheme('edgeTextSize', edge),
    edgeTextColor: getTheme('edgeTextColor', edge),
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
    edgeText: ({ label }) => label,
    edgeTextFontWeight: 'bold',
    linkPreviewWidth: 10,
};
exports.ThemeToGraphColors = {
    light: {
        primary: colors.GRAY_300,
        secondary: colors.GRAY_200,
        tertiary: colors.GRAY_400,
        contrast: colors.GRAY_800,
        text: colors.GRAY_900,
        brand: 'magic'
    },
    dark: {
        primary: colors.GRAY_800,
        secondary: colors.GRAY_700,
        tertiary: colors.GRAY_900,
        contrast: colors.GRAY_200,
        text: colors.GRAY_100,
        brand: 'magic'
    },
    girl: {
        primary: colors.PINK_700,
        secondary: colors.PINK_600,
        tertiary: colors.PINK_800,
        contrast: colors.PINK_200,
        text: colors.WHITE,
        brand: 'girl-magic'
    }
};
/**
 * time to wait (in milliseconds) between the dismissal of a step and the initialization of the next step
 */
exports.DELAY_UNTIL_NEXT_STEP = 1000;
exports.TUTORIAL_THEME_ID = 'tutorial';
/**
 * creates an adjacency list mapping node ids to nodes along with a added field `weight` that
 * represents the weight of the edge connecting them
 *
 * @param graph the graph instance
 * @param fallbackWeight the weight between two adjacent nodes if the label of the edge connecting them
 * cannot be parsed as a number. defaults to 1
 * @returns an adjacency list using ids of nodes as keys and the full node objects with weights as values
 * @example getWeightedAdjacencyList(graph)
 * // {
 * //   'abc123': [{ id: 'def456', label: 'B', weight: 1, x: 0, y: 0 }],
 * //   'def456': [{ id: 'abc123', label: 'A', weight: 1, x: 100, y: 100 }]
 * // }
 */
const getWeightedAdjacencyList = (graph, fallbackWeight = 1) => {
    const adjList = getAdjacencyList(graph);
    const adjListEntries = Object.entries(adjList);
    return adjListEntries.reduce((acc, [keyNodeId, toNodeIds]) => {
        acc[keyNodeId] = toNodeIds.map(toNodeId => ({
            ...graph.getNode(toNodeId),
            weight: getWeightBetweenNodes(keyNodeId, toNodeId, graph, fallbackWeight)
        }));
        return acc;
    }, {});
};
exports.getWeightedAdjacencyList = getWeightedAdjacencyList;
class PriorityQueue {
    heap = [];
    constructor() { }
    enqueue(node, distance) {
        this.heap.push({ node, distance });
        this.bubbleUp(this.heap.length - 1);
    }
    dequeue() {
        if (this.heap.length === 0)
            return undefined;
        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.bubbleDown(0);
        }
        return min;
    }
    bubbleUp(index) {
        const element = this.heap[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            if (element.distance >= parent.distance)
                break;
            this.heap[parentIndex] = element;
            this.heap[index] = parent;
            index = parentIndex;
        }
    }
    bubbleDown(index) {
        const length = this.heap.length;
        const element = this.heap[index];
        while (true) {
            let swap = null;
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            if (leftChildIndex < length) {
                const leftChild = this.heap[leftChildIndex];
                if (leftChild.distance < element.distance) {
                    swap = leftChildIndex;
                }
            }
            if (rightChildIndex < length) {
                const rightChild = this.heap[rightChildIndex];
                if ((swap === null && rightChild.distance < element.distance) ||
                    (swap !== null && rightChild.distance < this.heap[leftChildIndex].distance)) {
                    swap = rightChildIndex;
                }
            }
            if (swap === null)
                break;
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }
    isEmpty() {
        return this.heap.length === 0;
    }
    peek() {
        return this.heap[0];
    }
    getHeap() {
        return [...this.heap];
    }
}
const useDijkstra = (graph) => {
    const trace = ref([]);
    const output = ref();
    const { startNode } = state;
    const { transitionMatrix } = useTransitionMatrix(graph);
    const update = () => {
        if (!startNode.value)
            return;
        const startNodeIndex = graph.nodes.value.findIndex(node => node.id === startNode.value.id);
        if (startNodeIndex === -1)
            return;
        const res = dijkstras(transitionMatrix.value, startNodeIndex);
        // parses out the matrix trace into a more consumable format
        // by mapping the indices back to the actual nodes and node ids
        // it also optimizes the trace for quick lookups
        trace.value = res.trace.map(({ currentNode, distances, queue }) => ({
            currentNode: graph.nodes.value[currentNode ?? -1] ?? undefined,
            distances: Object.fromEntries(distances.map((distance, i) => [graph.nodes.value[i].id, distance])),
            queue: new Set(queue.map(i => graph.nodes.value[i.node].id))
        }));
        output.value = {
            startNode: startNode.value,
            distances: Object.fromEntries(res.res.map((distance, i) => [graph.nodes.value[i].id, distance]))
        };
    };
    watch([startNode, transitionMatrix], update, { immediate: true });
    return {
        output,
        trace: computed(() => trace.value),
    };
};
exports.useDijkstra = useDijkstra;
const useMarkupColorizer = (graph) => {
    const { setTheme, removeAllThemes } = useTheme(graph, MARKUP_USETHEME_ID);
    const colorMap = useLocalStorage('markup-color-map', new Map());
    // TODO
    // go through all keys in the colorMap and remove inactive nodes/edges
    // for (const key of colorMap.value.keys()) {
    //   if (!graph.nodes.value[key] && !graph.edges.value[key]) {
    //     colorMap.value.delete(key);
    //   }
    // }
    const colorNode = (node) => {
        const color = colorMap.value.get(node.id);
        if (!color)
            return;
        return graph.baseTheme.value.nodeColor;
    };
    const colorNodeBorder = (node) => {
        const color = colorMap.value.get(node.id);
        if (!color)
            return;
        if (graph.focus.isFocused(node.id))
            return adjustHex(color, 30);
        return color;
    };
    const colorEdge = (edge) => {
        const color = colorMap.value.get(edge.id);
        if (!color)
            return;
        if (graph.focus.isFocused(edge.id))
            return adjustHex(color, 30);
        return color;
    };
    const encapsulatedNodeBoxBorderColor = () => {
        const themes = {
            dark: colors.WHITE,
            light: colors.BLACK,
            girl: colors.PURPLE_800,
        };
        return themes[graph.themeName.value] + '80';
    };
    const colorize = () => {
        setTheme('nodeColor', colorNode);
        setTheme('nodeBorderColor', colorNodeBorder);
        setTheme('nodeFocusBorderColor', colorNodeBorder);
        setTheme('nodeAnchorColor', colorNodeBorder);
        setTheme('nodeAnchorColorWhenParentFocused', colorNodeBorder);
        setTheme('edgeColor', colorEdge);
        setTheme('marqueeSelectionBoxColor', colors.TRANSPARENT);
        setTheme('marqueeEncapsulatedNodeBoxBorderColor', encapsulatedNodeBoxBorderColor);
        setTheme('marqueeEncapsulatedNodeBoxColor', colors.TRANSPARENT);
    };
    const decolorize = () => {
        removeAllThemes();
    };
    return {
        colorize,
        decolorize,
        colorMap,
    };
};
exports.useMarkupColorizer = useMarkupColorizer;
const useMarkupSizer = (graph) => {
    const { setTheme, removeAllThemes } = useTheme(graph, MARKUP_USETHEME_ID);
    const sizeMap = useLocalStorage('markup-size-map', new Map());
    const sizeNode = (node) => {
        const size = sizeMap.value.get(node.id);
        if (!size)
            return;
        return SIZE_TO_RADIUS[size];
    };
    const sizeEdge = (edge) => {
        const size = sizeMap.value.get(edge.id);
        if (!size)
            return;
        return SIZE_TO_WIDTH[size];
    };
    const size = () => {
        setTheme('nodeSize', sizeNode);
        setTheme('edgeWidth', sizeEdge);
    };
    const desize = () => {
        removeAllThemes();
    };
    return {
        size,
        desize,
        sizeMap
    };
};
exports.useMarkupSizer = useMarkupSizer;
const kruskal = (graph) => {
    const { nodes, edges } = graph;
    const { getEdgeWeight } = graph.helpers;
    const find = (parent, nodeId) => {
        if (parent.get(nodeId) !== nodeId) {
            parent.set(nodeId, find(parent, parent.get(nodeId)));
        }
        return parent.get(nodeId);
    };
    const union = (parent, rank, nodeA, nodeB) => {
        const rootA = find(parent, nodeA);
        const rootB = find(parent, nodeB);
        if (rootA !== rootB) {
            const rankA = rank.get(rootA);
            const rankB = rank.get(rootB);
            if (rankA < rankB) {
                parent.set(rootA, rootB);
            }
            else if (rankA > rankB) {
                parent.set(rootB, rootA);
            }
            else {
                parent.set(rootB, rootA);
                rank.set(rootA, rankA + 1);
            }
        }
    };
    const run = () => {
        const sortedEdges = Object.values(edges.value).sort((edgeA, edgeB) => {
            return getEdgeWeight(edgeA.id) - getEdgeWeight(edgeB.id);
        });
        const parent = new Map();
        const rank = new Map();
        graph.nodes.value.forEach((node) => {
            parent.set(node.id, node.id);
            rank.set(node.id, 0);
        });
        const mst = [];
        for (const edge of sortedEdges) {
            const sourceRoot = find(parent, edge.from);
            const targetRoot = find(parent, edge.to);
            if (sourceRoot !== targetRoot) {
                mst.push(edge);
                union(parent, rank, sourceRoot, targetRoot);
                if (mst.length === nodes.value.length - 1)
                    break;
            }
        }
        return mst;
    };
    return run();
};
exports.kruskal = kruskal;
const useMSTSimulationRunner = (graph, trace) => {
    const simControls = (0, exports.useSimulationControls)(trace);
    const { activate, deactivate } = useSimulationTheme(graph, simControls);
    return {
        simControls,
        start: () => {
            activate();
            simControls.start();
        },
        stop: () => {
            deactivate();
            simControls.stop();
        },
    };
};
exports.useMSTSimulationRunner = useMSTSimulationRunner;
const useSimulationRunner = (graph) => {
    const { text } = useTextTip();
    const { activate: activeEdgeThickener, deactivate: deactivateEdgeThickener } = useEdgeThickener(graph, FLOW_USETHEME_ID + '-runner');
    const { stylize: activateFlowColorizer, destylize: deactivateFlowColorizer } = useSourceSinkTheme(graph, FLOW_USETHEME_ID + '-runner');
    const { createResidualEdges, cleanupResidualEdges } = useResidualEdges(graph);
    const { sourceNode, sinkNode } = state;
    const { trace } = useFordFulkerson(graph);
    const simControls = (0, exports.useSimulationControls)(trace, {
        allowEditingDuringPlayback: false,
    });
    const { activate: activateTheme, deactivate: deactivateTheme } = useSimulationTheme(graph, simControls);
    let cancelled = false;
    const start = async () => {
        graph.settings.value.persistent = false;
        activateFlowColorizer();
        activeEdgeThickener();
        if (!sourceNode.value) {
            text.value = 'Select a source node';
            await state.setNode(graph, sourceNode);
        }
        if (cancelled)
            return;
        if (!sinkNode.value) {
            text.value = 'Select a sink node';
            await state.setNode(graph, sinkNode);
        }
        text.value = undefined;
        if (cancelled)
            return;
        createResidualEdges();
        activateTheme();
        simControls.start();
    };
    const stop = async () => {
        cancelled = true;
        state.cancelNodeSelection.value?.();
        simControls.stop();
        cleanupResidualEdges();
        deactivateTheme();
        deactivateFlowColorizer();
        deactivateEdgeThickener();
        text.value = undefined;
        graph.settings.value.persistent = true;
        setTimeout(() => cancelled = false, 0);
    };
    return {
        start,
        stop,
        simControls,
    };
};
exports.useSimulationRunner = useSimulationRunner;
exports.SCRIBBLE_DEFAULTS = {
    color: "red",
    brushWeight: 3,
};
exports.ERASER_BRUSH_WEIGHT = 50;
const scribble = (options) => {
    if (options.points.length < 1) {
        throw new Error('not enough points to draw scribble');
    }
    if (options.brushWeight && options.brushWeight < 1) {
        throw new Error('brushWeight must be at least "1"');
    }
    const shapeHitbox = scribbleHitbox(options);
    const efficientHitbox = scribbleEfficientHitbox(options);
    const hitbox = (point) => {
        return shapeHitbox(point);
    };
    const getBoundingBox = getScribbleBoundingBox(options);
    const drawShape = drawScribbleWithCtx(options);
    const draw = (ctx) => {
        drawShape(ctx);
    };
    return {
        id: options.id ?? generateId(),
        name: 'scribble',
        drawShape,
        draw,
        hitbox,
        shapeHitbox,
        efficientHitbox,
        getBoundingBox,
    };
};
exports.scribble = scribble;
exports.TRIANGLE_DEFAULTS = {
    color: "black",
};
const triangle = (options) => {
    const drawShape = drawTriangleWithCtx(options);
    const shapeHitbox = triangleHitbox(options);
    const textHitbox = triangleTextHitbox(options);
    const efficientHitbox = triangleEfficientHitbox(options);
    const hitbox = (point) => {
        return shapeHitbox(point); // text not implemented yet
    };
    const getBoundingBox = getTriangleBoundingBox(options);
    const drawTextArea = drawTextAreaOnTriangle(options);
    const drawTextAreaMatte = drawTextAreaMatteOnTriangle(options);
    const drawText = drawTextOnTriangle(options);
    const draw = (ctx) => {
        drawShape(ctx);
        drawTextArea?.(ctx);
    };
    return {
        id: options.id ?? generateId(),
        name: "triangle",
        draw,
        drawShape,
        drawTextArea,
        drawTextAreaMatte,
        drawText,
        hitbox,
        shapeHitbox,
        textHitbox,
        efficientHitbox,
        getBoundingBox,
    };
};
exports.triangle = triangle;
exports.PROGRESS_DEFAULTS = {
    transitionTimeMs: 250,
    transitionEasing: "ease-in-out",
};
const DEFAULT_OPTIONS = {
    allowEditingDuringPlayback: true,
};
/**
 * the playback speed in ms per step of the simulation
 */
const DEFAULT_PLAYBACK_SPEED = 1000;
const useSimulationControls = (trace, options = {}) => {
    const { allowEditingDuringPlayback, lastStep } = {
        ...DEFAULT_OPTIONS,
        ...options,
    };
    const simLastStep = computed(() => lastStep?.value ?? trace.value.length);
    const step = ref(0);
    const paused = ref(true);
    const playbackSpeed = ref(DEFAULT_PLAYBACK_SPEED);
    const active = ref(false);
    const interval = ref();
    const isOver = computed(() => step.value === simLastStep.value);
    const hasBegun = computed(() => step.value > 0);
    const playbackSpeedToMs = [
        {
            label: "0.25x",
            value: DEFAULT_PLAYBACK_SPEED / 0.25
        },
        {
            label: "0.5x",
            value: DEFAULT_PLAYBACK_SPEED / 0.5
        },
        {
            label: "1x",
            value: DEFAULT_PLAYBACK_SPEED
        },
        {
            label: "2x",
            value: DEFAULT_PLAYBACK_SPEED / 2
        },
        {
            label: "4x",
            value: DEFAULT_PLAYBACK_SPEED / 4
        },
    ];
    const start = () => {
        if (active.value)
            return;
        graph.value.settings.value.interactive = allowEditingDuringPlayback;
        paused.value = false;
        active.value = true;
        step.value = 0;
        setupPlaybackInterval();
    };
    const stop = () => {
        if (interval.value)
            clearInterval(interval.value);
        graph.value.settings.value.interactive = true;
        active.value = false;
    };
    const setupPlaybackInterval = () => {
        if (interval.value)
            clearInterval(interval.value);
        interval.value = setInterval(() => {
            if (isOver.value || paused.value)
                return;
            nextStep();
        }, playbackSpeed.value);
    };
    watch(playbackSpeed, () => {
        if (active.value)
            setupPlaybackInterval();
    });
    const nextStep = () => {
        if (isOver.value)
            return;
        step.value++;
    };
    const prevStep = () => {
        if (!hasBegun.value)
            return;
        step.value--;
    };
    const setStep = (newStep) => {
        if (newStep < 0 || newStep > simLastStep.value)
            return;
        step.value = newStep;
    };
    return {
        nextStep,
        prevStep,
        setStep,
        trace,
        step: computed(() => step.value),
        start,
        stop,
        paused,
        playbackSpeed,
        playbackSpeedToMs,
        isOver,
        hasBegun,
        isActive: computed(() => active.value),
        lastStep: simLastStep,
    };
};
exports.useSimulationControls = useSimulationControls;
