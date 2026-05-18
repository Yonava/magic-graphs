<script setup lang="ts">
import { useGraphWithCanvas } from "../shared/useGraphWithCanvas";
import GraphProduct from "../shared/ui/general/GraphProduct.vue";
import * as ts from 'typescript';

import { AST_GRAPH_SETTINGS } from "./settings";
import GButton from "../shared/ui/graph-core/button/GButton.vue"
import { useAutoTree, useMoveNodesIntoTreeFormation } from "../sandbox/ui/tree/useTreeShaper";
import { getRandomInRange } from "@magic/utils/random";

const graphWithCanvas = useGraphWithCanvas(AST_GRAPH_SETTINGS);

/**
 * coverts ts node object into a unique serializable form
 * @example getNodeUniqueId(node) // "example.ts:VariableStatement:0-21"
 */
const getNodeUniqueId = (node: ts.Node) => {
  const kindName = ts.SyntaxKind[node.kind];
  return `${kindName}:${node.pos}-${node.end}`;
}

const getAllNodesAndEdges = (node: ts.Node) => {
  const nodeIds: string[] = []
  const edges: { from: string, to: string }[] = []
  const processNode = (node: ts.Node) => {
    const parentNodeId = node.parent ? getNodeUniqueId(node.parent) : undefined
    const nodeId = getNodeUniqueId(node)
    if (parentNodeId) edges.push({ from: parentNodeId, to: nodeId })
    nodeIds.push(nodeId)
    node.forEachChild(processNode)
  }
  processNode(node)
  return { nodes: nodeIds, edges }
}

const { activate, rootNodeId } = useAutoTree(graphWithCanvas.graph, {
  debounceMs: 1500,
  rootNodeCoordinates: { x: 0, y: 0 }
})

const randomCoord = () => ({ x: getRandomInRange(-500, 500), y: getRandomInRange(-500, 500) })

const code = 'const hello = "world"'
const fileName = 'example.ts'
const rootNode = ts.createSourceFile(fileName, code, ts.ScriptTarget.Latest, true)
const { nodes, edges } = getAllNodesAndEdges(rootNode)
const graphNodes = nodes.map((nodeId) => ({
  id: nodeId, label: nodeId, ...randomCoord()
}))
rootNodeId.value = graphNodes[0].id;
const graphEdges = edges.map((e) => ({ ...e, id: `${e.from}-${e.to}`, label: '' }))

const loadAst = () => {
  graphWithCanvas.graph.reset();
  for (const node of graphNodes) {
    graphWithCanvas.graph.addNode({ ...node, ...randomCoord() }, { animate: true, focus: false })
  }
  for (const edge of graphEdges) {
    graphWithCanvas.graph.addEdge(edge, { animate: true, focus: false })
  }
}
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas">
    <template #top-center>
      <GButton @click="loadAst">
        Load AST
      </GButton>
      <GButton @click="activate">
        Shape
      </GButton>
    </template>
  </GraphProduct>
</template>
