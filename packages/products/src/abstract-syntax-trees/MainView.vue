<script setup lang="ts">
  import { GEdge, GNode } from '@magic/graph/types';
  import { getCtx } from '@magic/utils/ctx';
  import { debounce } from '@magic/utils/debounce';
  import * as ts from 'typescript';

  import { computed, onMounted, ref, watch } from 'vue';

  import { useTreeGraphPositioner } from '../shared/graph-tree-positioner/useTreeGraphPositioner';
  import GraphProduct from '../shared/ui/general/GraphProduct.vue';
  import GButton from '../shared/ui/graph-core/button/GButton.vue';
  import { useGraphWithCanvas } from '../shared/useGraphWithCanvas';
  import CodeEditor from './code-editor/CodeEditor.vue';
  import { AST_GRAPH_SETTINGS } from './settings';

  type ASTNode = ts.Node;
  type ASTEdge = { fromNode: ts.Node; toNode: ts.Node };

  const graphWithCanvas = useGraphWithCanvas(AST_GRAPH_SETTINGS);

  /**
   * coverts ts node object into a unique serializable form
   * @example getNodeUniqueId(node) // "example.ts:VariableStatement:0-21"
   */
  const getASTNodeId = (node: ts.Node) => {
    const kindName = ts.SyntaxKind[node.kind];
    return `${kindName}:${node.pos}-${node.end}`;
  };

  const getASTEdgeId = ({
    fromNode,
    toNode,
  }: {
    fromNode: ts.Node;
    toNode: ts.Node;
  }) => {
    const fromNodeId = getASTNodeId(fromNode);
    const toNodeId = getASTNodeId(toNode);
    return `[${fromNodeId}]->[${toNodeId}]`;
  };

  const getAllNodesAndEdges = (node: ts.Node) => {
    const nodeIds: ASTNode[] = [];
    const edges: ASTEdge[] = [];
    const processNode = (node: ASTNode) => {
      if (node.parent) edges.push({ fromNode: node.parent, toNode: node });
      nodeIds.push(node);
      node.forEachChild(processNode);
    };
    processNode(node);
    return { nodes: nodeIds, edges };
  };

  const { shapeGraph } = useTreeGraphPositioner(graphWithCanvas.graph, {
    rootNodeCoordinates: { x: 0, y: 0 },
  });

  const code = ref('// comment');

  const rootAstNode = computed(() => {
    const fileName = 'example.ts';
    return ts.createSourceFile(
      fileName,
      code.value,
      ts.ScriptTarget.Latest,
      true,
    );
  });

  const astNodesAndEdges = computed(() =>
    getAllNodesAndEdges(rootAstNode.value),
  );

  const graphNodesAndEdges = computed(() => {
    const { nodes, edges } = astNodesAndEdges.value;
    const graphNodes = nodes.map(
      (astNode): GNode => ({
        id: getASTNodeId(astNode),
        label: getASTNodeId(astNode),
        x: 0,
        y: 0,
      }),
    );

    const graphEdges = edges.map(
      (astEdge): GEdge => ({
        to: getASTNodeId(astEdge.toNode),
        from: getASTNodeId(astEdge.fromNode),
        id: getASTEdgeId(astEdge),
        label: '',
      }),
    );

    return {
      rootNode: graphNodes[0],
      nodes: graphNodes,
      edges: graphEdges,
    };
  });

  const loadAst = async () => {
    const { graph, canvas } = graphWithCanvas;
    const draw = () => {
      const ctx = getCtx(canvas.canvas.value);
      graph.draw(ctx);
    };
    const animate = graph.autoAnimate.captureFrame(draw);
    graph.load(graphNodesAndEdges.value);
    shapeGraph(graphNodesAndEdges.value.rootNode);
    animate();
  };

  onMounted(loadAst);
  const debouncedLoadAst = debounce(loadAst, 500);

  watch(code, debouncedLoadAst);
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas">
    <template #top-center>
      <!-- <GButton @click="shapeGraph(graphNodesAndEdges.rootNode)">
        Shape
      </GButton> -->
    </template>
    <template #center-left>
      <CodeEditor v-model="code" />
    </template>
  </GraphProduct>
</template>
