import {
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  computed,
} from 'vue'
import type { Ref } from 'vue'
import { onClickOutside } from '@vueuse/core';
import type {
  GNode,
  GEdge,
  SchemaItem,
  Aggregator,
} from '@graph/types'
import { prioritizeNode } from '@graph/helpers';
import { getNodeSchematic } from '@graph/schematics/node';
import { getEdgeSchematic } from '@graph/schematics/edge';
import { THEMES } from '@graph/themes'
import type { GraphTheme, GraphThemeName } from '@graph/themes'
import { getInitialThemeMap } from '@graph/themes/types';
import { delta } from '@utils/deepDelta';
import { clone } from '@utils/clone';
import { getInitialEventBus, generateSubscriber } from '@graph/events';
import type {
  PartiallyPartial,
  MouseEventMap,
  KeyboardEventMap,
  MouseEventEntries,
  KeyboardEventEntries,
} from '@utils/types';
import { DEFAULT_GRAPH_SETTINGS } from '@graph/settings';
import type { GraphSettings } from '@graph/settings';
import { getThemeResolver } from '@graph/themes/getThemeResolver';
import { useNodeEdgeMap } from './useNodeEdgeMap';
import { useAggregator } from './useAggregator';
import { useGraphCRUD } from './useGraphCRUD';
import { getCtx } from '@utils/ctx';
import type { GraphAtMousePosition } from './types';
import { useGraphCursor } from './useGraphCursor';
import { getCanvasCoords } from '@utils/components/useCanvasCoord';
import { useAnimationController } from '@graph/animationController';

export const useBaseGraph = (
  canvas: Ref<HTMLCanvasElement | undefined | null>,
  startupSettings: Partial<GraphSettings> = {},
) => {
  const themeName = ref<GraphThemeName>('light')

  const themeMap = getInitialThemeMap()
  const getTheme = getThemeResolver(themeName, themeMap)

  const settings = ref<GraphSettings>({
    ...DEFAULT_GRAPH_SETTINGS,
    ...startupSettings,
  })

  const eventBus = getInitialEventBus()
  const { subscribe, unsubscribe, emit } = generateSubscriber(eventBus)

  const canvasFocused = ref(true)

  onClickOutside(canvas, () => {
    canvasFocused.value = false
  })

  subscribe('onMouseDown', () => {
    canvasFocused.value = true
  })

  const nodes = ref<GNode[]>([])
  const edges = ref<GEdge[]>([])

  const graphAtMousePosition = ref<GraphAtMousePosition>({
    coords: { x: 0, y: 0 },
    items: [],
  })

  const graphCursorControls = useGraphCursor({
    canvas,
    subscribe,
    graphAtMousePosition,
  })

  const updateGraphAtMousePosition = (ev: MouseEvent) => {
    const ctx = getCtx(canvas)
    const coords = getCanvasCoords(ev, ctx)
    graphAtMousePosition.value = {
      coords,
      items: getSchemaItemsByCoordinates(coords),
    }
  }

  const graphMouseEv = (event: MouseEvent) => ({
    ...graphAtMousePosition.value,
    event,
  })

  const mouseEvents: Partial<MouseEventMap> = {
    click: (ev: MouseEvent) => {
      ev.preventDefault()
      emit('onClick', graphMouseEv(ev))
    },
    mousemove: (ev: MouseEvent) => {
      ev.preventDefault()
      emit('onMouseMove', graphMouseEv(ev))
    },
    mousedown: (ev: MouseEvent) => {
      ev.preventDefault()
      emit('onMouseDown', graphMouseEv(ev))
    },
    mouseup: (ev: MouseEvent) => {
      ev.preventDefault()
      emit('onMouseUp', graphMouseEv(ev))
    },
    dblclick: (ev: MouseEvent) => {
      ev.preventDefault()
      emit('onDblClick', graphMouseEv(ev))
    },
    contextmenu: (ev: MouseEvent) => {
      emit('onContextMenu', graphMouseEv(ev))
    },
  }

  const keyboardEvents: Partial<KeyboardEventMap> = {
    keydown: (ev: KeyboardEvent) => emit('onKeyDown', ev),
    keyup: (ev: KeyboardEvent) => emit('onKeyUp', ev),
  }

  const {
    aggregator,
    updateAggregator,
    getSchemaItemsByCoordinates,
  } = useAggregator({ canvas, emit })

  const animationController = useAnimationController()

  const addNodesAndEdgesToAggregator = (aggregator: Aggregator) => {
    const edgeOptions = {
      edges,
      getNode,
      getEdge,
      getTheme,
      settings,
      animationController,
    }

    const edgeSchemaItems = edges.value
      .map((edge) => getEdgeSchematic(edge, edgeOptions))
      .filter(Boolean)
      .map((item, i) => ({ ...item, priority: i * 10 })) as SchemaItem[]

    const nodeSchemaItems = nodes.value
      .map((node) => getNodeSchematic(node, getTheme))
      .filter(Boolean)
      .map((item, i) => ({ ...item, priority: (i * 10) + 1000 })) as SchemaItem[]

    aggregator.push(...edgeSchemaItems)
    aggregator.push(...nodeSchemaItems)

    return aggregator
  }

  updateAggregator.push(addNodesAndEdgesToAggregator)

  onMounted(() => {
    if (!canvas.value) {
      throw new Error('canvas element not found')
    }

    canvas.value.addEventListener('mousemove', updateGraphAtMousePosition)

    for (const [event, listeners] of Object.entries(mouseEvents) as MouseEventEntries) {
      canvas.value.addEventListener(event, listeners)
    }

    for (const [event, listeners] of Object.entries(keyboardEvents) as KeyboardEventEntries) {
      document.addEventListener(event, listeners)
    }
  })

  onBeforeUnmount(() => {
    if (!canvas.value) {
      throw new Error('Canvas element not found')
    }

    canvas.value.removeEventListener('mousemove', updateGraphAtMousePosition)

    for (const [event, listeners] of Object.entries(mouseEvents) as MouseEventEntries) {
      canvas.value.removeEventListener(event, listeners)
    }

    for (const [event, listeners] of Object.entries(keyboardEvents) as KeyboardEventEntries) {
      document.removeEventListener(event, listeners)
    }
  })

  const { nodeIdToNodeMap, edgeIdToEdgeMap } = useNodeEdgeMap(nodes, edges)
  const {
    getNode,
    getEdge,
    addNode,
    addEdge,
    moveNode,
    editEdgeLabel,
    removeNode,
    removeEdge,
    bulkAddNode,
    bulkRemoveNode,
    bulkAddEdge,
    bulkRemoveEdge,
  } = useGraphCRUD({
    nodes,
    edges,
    nodeMap: nodeIdToNodeMap,
    edgeMap: edgeIdToEdgeMap,
    emit,
    settings,
  })

  const nodeIdToIndex = computed(() => nodes.value.reduce<Map<GNode['id'], number>>((map, node, i) => {
    map.set(node.id, i)
    return map
  }, new Map()))

  const edgeIdToIndex = computed(() => edges.value.reduce<Map<GEdge['id'], number>>((map, edge, i) => {
    map.set(edge.id, i)
    return map
  }, new Map()))

  /**
   * get a node by its coordinates
   *
   * @param x - the x coord
   * @param y - the y coord
   * @returns the node at given coords or undefined if not there or obscured by another schema item
   */
  const getNodeByCoordinates = (x: number, y: number) => {
    const topItem = getSchemaItemsByCoordinates({ x, y }).pop()
    if (!topItem) return
    if (topItem.graphType !== 'node') return
    return getNode(topItem.id)
  }

  let currHoveredNode: GNode | undefined;
  subscribe('onMouseMove', ({ items }) => {
    const topItem = items.at(-1)
    // TODO change this to better support node anchors
    // that may be dragging over the node
    if (!topItem || topItem.graphType !== 'node') return
    const node = getNode(topItem.id)
    if (node === currHoveredNode) return
    emit('onNodeHoverChange', node, currHoveredNode)
    currHoveredNode = node
  })

  const liftHoveredNodeToTop = (aggregator: Aggregator) => {
    if (!currHoveredNode) return aggregator
    prioritizeNode(currHoveredNode.id, aggregator)
    return aggregator
  }

  updateAggregator.push(liftHoveredNodeToTop)

  /**
   * load a graph state into the graph
   * @param graphState - the graph state to load (nodes and edges)
   */
  const load = (graphState: { nodes: GNode[], edges: GEdge[] }) => {
    nodes.value = graphState.nodes
    edges.value = graphState.edges
    emit('onGraphLoaded')
    emit('onStructureChange')
  }

  /**
   * reset the graph to an empty state with no nodes or edges
   */
  const reset = () => {
    nodes.value = []
    edges.value = []
    emit('onGraphReset')
    emit('onStructureChange')
  }

  watch(themeName, async (newThemeName, oldThemeName) => {
    emit('onThemeChange', newThemeName, oldThemeName)
  })

  const activeSettings = ref(clone(settings.value))
  watch(settings, (newSettings) => {
    const settingsDiff = delta(activeSettings.value, newSettings)
    if (!settingsDiff) return
    activeSettings.value = clone(settings.value)
    emit('onSettingsChange', settingsDiff)
  }, { deep: true })

  return {
    /**
     * all the nodes contained in the graph
     */
    nodes,
    /**
     * all the edges contained in the graph
     */
    edges,

    nodeIdToIndex,
    edgeIdToIndex,

    getNode,
    getEdge,

    addNode,
    addEdge,

    moveNode,
    editEdgeLabel,

    removeNode,
    removeEdge,

    bulkAddNode,
    bulkRemoveNode,

    bulkAddEdge,
    bulkRemoveEdge,

    getSchemaItemsByCoordinates,
    getNodeByCoordinates,

    /**
     * a mapping of all graph events to a set of their callback functions
     */
    eventBus,
    subscribe,
    unsubscribe,
    emit,

    updateAggregator,
    aggregator,

    animationController,

    baseTheme: computed(() => THEMES[themeName.value]),
    themeName,
    getTheme,
    themeMap,
    settings,

    load,
    reset,

    canvas,
    /**
     * whether the canvas is currently focused in the browser
     */
    canvasFocused,

    graphAtMousePosition,
    updateGraphAtMousePosition,
    ...graphCursorControls,
  }
}

export type BaseGraph = ReturnType<typeof useBaseGraph>