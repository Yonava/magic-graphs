import {
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
} from 'vue'
import type { Ref } from 'vue'
import type {
  GNode,
  GEdge,
  MouseEventMap,
  KeyboardEventMap,
  MouseEventEntries,
  KeyboardEventEntries,
  SchemaItem,
  GraphOptions,
  Aggregator,
} from '@graph/types'
import { prioritizeNode } from '@graph/helpers';
import { getNodeSchematic } from '@graph/schematics/node';
import { getEdgeSchematic } from '@graph/schematics/edge';
import { THEMES } from '@graph/themes';
import type { GraphTheme } from '@graph/themes'
import { getInitialThemeMap } from '@graph/themes/types';
import { delta } from '@utils/deepDelta';
import { clone } from '@utils/clone';
import { getInitialEventBus, generateSubscriber } from '@graph/events';
import type { PartiallyPartial } from '@utils/types';
import { DEFAULT_GRAPH_SETTINGS } from '@graph/settings';
import type { GraphSettings } from '@graph/settings';
import { getThemeResolver } from '@graph/themes/getThemeResolver';
import { useNodeEdgeMap } from './useNodeEdgeMap';
import { useAggregator } from './useAggregator';
import { useGraphCRUD } from './useGraphCRUD';

export const useBaseGraph = (
  canvas: Ref<HTMLCanvasElement | undefined | null>,
  options: Partial<GraphOptions> = {},
) => {

  const theme = ref<GraphTheme>({
    ...THEMES.light,
    ...options.theme,
  })

  const themeMap = getInitialThemeMap()
  const getTheme = getThemeResolver(theme, themeMap)

  const settings = ref<GraphSettings>({
    ...DEFAULT_GRAPH_SETTINGS,
    ...options.settings,
  })

  const eventBus = getInitialEventBus()

  const { subscribe, unsubscribe, emit } = generateSubscriber(eventBus)


  const nodes = ref<GNode[]>([])
  const edges = ref<GEdge[]>([])

  const mouseEvents: Partial<MouseEventMap> = {
    click: (ev: MouseEvent) => emit('onClick', ev),
    mousedown: (ev: MouseEvent) => emit('onMouseDown', ev),
    mouseup: (ev: MouseEvent) => emit('onMouseUp', ev),
    mousemove: (ev: MouseEvent) => emit('onMouseMove', ev),
    dblclick: (ev: MouseEvent) => emit('onDblClick', ev),
    contextmenu: (ev: MouseEvent) => emit('onContextMenu', ev),
  }

  const keyboardEvents: Partial<KeyboardEventMap> = {
    keydown: (ev: KeyboardEvent) => emit('onKeydown', ev),
  }

  const {
    aggregator,
    updateAggregator,
    getSchemaItemsByCoordinates,
    repaint,
  } = useAggregator({ canvas, emit })

  const addNodesAndEdgesToAggregator = (aggregator: Aggregator) => {
    const edgeOptions = {
      edges,
      getNode,
      getTheme,
      settings,
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

  const initCanvas = () => {
    if (!canvas.value) {
      throw new Error('canvas element not found')
    }

    for (const [event, listeners] of Object.entries(mouseEvents) as MouseEventEntries) {
      canvas.value.addEventListener(event, listeners)
    }

    for (const [event, listeners] of Object.entries(keyboardEvents) as KeyboardEventEntries) {
      document.addEventListener(event, listeners)
    }
  }

  onMounted(initCanvas)

  onBeforeUnmount(() => {
    if (!canvas.value) {
      throw new Error('Canvas element not found')
    }

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
    removeNode,
    removeEdge,
  } = useGraphCRUD({
    nodes,
    edges,
    nodeMap: nodeIdToNodeMap,
    edgeMap: edgeIdToEdgeMap,
    repaint,
    emit,
  })

  const getNodeByCoordinates = (x: number, y: number) => {
    const topItem = getSchemaItemsByCoordinates(x, y).pop()
    if (!topItem) return
    if (topItem.graphType !== 'node') return
    return getNode(topItem.id)
  }

  let currHoveredNode: GNode | undefined = undefined
  subscribe('onMouseMove', (ev) => {
    const { offsetX: x, offsetY: y } = ev
    const node = getNodeByCoordinates(x, y)
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

  const reset = () => {
    nodes.value = []
    edges.value = []
    emit('onGraphReset')
  }

  subscribe('onGraphReset', () => emit('onStructureChange', nodes.value, edges.value))

  const activeTheme = ref(clone(theme.value))
  watch(theme, (newTheme) => {
    const themeDiff = delta(activeTheme.value, theme.value)
    if (!themeDiff) return
    activeTheme.value = clone(newTheme)
    emit('onThemeChange', themeDiff)
  }, { deep: true })

  const activeSettings = ref(clone(settings.value))
  watch(settings, (newSettings) => {
    const settingsDiff = delta(activeSettings.value, newSettings)
    if (!settingsDiff) return
    activeSettings.value = clone(settings.value)
    emit('onSettingsChange', settingsDiff)
  }, { deep: true })

  subscribe('onThemeChange', () => repaint('base-graph/on-theme-change')())
  subscribe('onSettingsChange', () => repaint('base-graph/on-settings-change')())
  subscribe('onGraphReset', () => repaint('base-graph/on-graph-reset')())
  subscribe('onEdgeLabelChange', () => repaint('base-graph/on-edge-label-change')())

  return {
    /**
     * all the nodes contained in the graph
     */
    nodes,
    /**
     * all the edges contained in the graph
     */
    edges,

    getNode,
    getEdge,


    addNode,
    addEdge,

    moveNode,

    removeNode,
    removeEdge,

    /**
     * get a node by its coordinates
     *
     * @param x - the x coord
     * @param y - the y coord
     * @returns the node at given coords or undefined if not there or obscured by another schema item
     */
    getNodeByCoordinates,

    getSchemaItemsByCoordinates,

    /**
     * a mapping of all graph events to a set of their callback functions
     */
    eventBus,
    subscribe,
    unsubscribe,
    emit,

    updateAggregator,
    aggregator,

    theme,
    getTheme,
    themeMap,
    settings,

    reset,

    repaint,
    canvas,
  }
}

export type BaseGraph = ReturnType<typeof useBaseGraph>