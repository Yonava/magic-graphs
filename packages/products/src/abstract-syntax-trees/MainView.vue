<script setup lang="ts">
import * as ts from 'typescript';

import {
  useTreeGraphPositioner,
} from '../shared/graph-tree-positioner/useTreeGraphPositioner';
import GraphProduct from '../shared/ui/general/GraphProduct.vue';
import GButton from '../shared/ui/graph-core/button/GButton.vue';
import { useGraphWithCanvas } from '../shared/useGraphWithCanvas';
import { AST_GRAPH_SETTINGS } from './settings';
import { GEdge, GNode } from '@magic/graph/types';
import CodeEditor from './code-editor/CodeEditor.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { debounce } from '@magic/utils/debounce';

const graphWithCanvas = useGraphWithCanvas(AST_GRAPH_SETTINGS);

/**
 * coverts ts node object into a unique serializable form
 * @example getNodeUniqueId(node) // "example.ts:VariableStatement:0-21"
 */
const getNodeUniqueId = (node: ts.Node) => {
  const kindName = ts.SyntaxKind[node.kind];
  return `${kindName}:${node.pos}-${node.end}`;
};

const getAllNodesAndEdges = (node: ts.Node) => {
  const nodeIds: string[] = [];
  const edges: { from: string; to: string }[] = [];
  const processNode = (node: ts.Node) => {
    const parentNodeId = node.parent
      ? getNodeUniqueId(node.parent)
      : undefined;
    const nodeId = getNodeUniqueId(node);
    if (parentNodeId) edges.push({ from: parentNodeId, to: nodeId });
    nodeIds.push(nodeId);
    node.forEachChild(processNode);
  };
  processNode(node);
  return { nodes: nodeIds, edges };
};

const { shapeGraph } = useTreeGraphPositioner(graphWithCanvas.graph, {
  rootNodeCoordinates: { x: 0, y: 0 },
});

const code = ref('// comment')

const rootAstNode = computed(() => {
  const fileName = 'example.ts';
  return ts.createSourceFile(
    fileName,
    code.value,
    ts.ScriptTarget.Latest,
    true,
  );
})

const astNodesAndEdges = computed(() => getAllNodesAndEdges(rootAstNode.value));

const graphNodesAndEdges = computed(() => {
  const { nodes, edges } = astNodesAndEdges.value;
  const graphNodes = nodes.map((nodeId): GNode => ({
    id: nodeId,
    label: nodeId,
    x: 0,
    y: 0,
  }));

  const graphEdges = edges.map((e): GEdge => ({
    ...e,
    id: `${e.from}-${e.to}`,
    label: ''
  }));

  return {
    rootNode: graphNodes[0],
    nodes: graphNodes,
    edges: graphEdges
  }
})

const loadAst = () => {
  graphWithCanvas.graph.load(graphNodesAndEdges.value)
  shapeGraph(graphNodesAndEdges.value.rootNode)
};

onMounted(loadAst)
const debouncedLoadAst = debounce(loadAst, 2000)

watch(code, debouncedLoadAst)
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas">
    <template #top-center>
      <GButton @click="shapeGraph(graphNodesAndEdges.rootNode)"> Shape </GButton>
    </template>
    <template #center-left>
      <CodeEditor v-model="code" />
    </template>
  </GraphProduct>
</template>
