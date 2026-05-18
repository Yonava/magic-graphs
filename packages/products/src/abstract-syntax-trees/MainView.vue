<script setup lang="ts">
import { useGraphWithCanvas } from "../shared/useGraphWithCanvas";
import GraphProduct from "../shared/ui/general/GraphProduct.vue";
import * as ts from 'typescript';

import { AST_GRAPH_SETTINGS } from "./settings";
import GButton from "../shared/ui/graph-core/button/GButton.vue"

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

const loadAst = () => {
  const code = 'const hello = "world"'
  const rootNode = ts.createSourceFile('example.ts', code, ts.ScriptTarget.Latest, true)
  const { nodes, edges } = getAllNodesAndEdges(rootNode)
  graphWithCanvas.graph.load({
    nodes:
      nodes.map((nodeId) => ({
        id: nodeId, label: nodeId, x: 50, y: 50
      })),
    edges: edges.map((e) => ({ ...e, id: `${e.from}-${e.to}`, label: '' }))
  })
}
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas">
    <template #top-center>
      <GButton @click="loadAst">
        Load AST
      </GButton>
    </template>
  </GraphProduct>
</template>
