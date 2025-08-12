import type { GEdge } from '@graph/types';
import { generateId } from '@utils/id';
import { describe, expect, test } from 'vitest';

import { ref } from 'vue';

import { useBaseGraph } from '..';
import { ADD_EDGE_DEFAULTS } from '../types';

describe('base graph - addEdge', () => {
  const graph = useBaseGraph(ref());

  graph.nodes.value = Array(5)
    .fill(0)
    .map((_, i) => ({
      id: generateId(),
      label: i.toString(),
      x: 0,
      y: 0,
    }));

  test('add basic edge', () => {
    graph.edges.value = [];
    const basicDirectedEdge: GEdge = {
      from: graph.nodes.value[0].id,
      to: graph.nodes.value[1].id,
      id: generateId(),
      label: 'a',
    };
    graph.addEdge(basicDirectedEdge);
    expect(graph.edges.value).toEqual([basicDirectedEdge]);

    const basicUndirectedEdge: GEdge = {
      from: graph.nodes.value[2].id,
      to: graph.nodes.value[3].id,
      id: generateId(),
      label: 'b',
    };
    graph.addEdge(basicUndirectedEdge);
    expect(graph.edges.value).toEqual([basicDirectedEdge, basicUndirectedEdge]);
  });

  test('added edge defaults applied properly', () => {
    graph.edges.value = [];
    const edge1 = {
      from: graph.nodes.value[0].id,
      to: graph.nodes.value[1].id,
    } as const;
    graph.addEdge(edge1);
    const [addedEdge1] = graph.edges.value;
    expect(addedEdge1.label).toEqual(ADD_EDGE_DEFAULTS.label);
    expect(addedEdge1.id).toBeDefined();
  });

  test('add edge with invalid node ids', () => {
    graph.edges.value = [];
    const edge = {
      from: 'invalid',
      to: 'invalid',
    } as const;
    graph.addEdge(edge);
    expect(graph.edges.value).toEqual([]);
  });

  test('add directed edge when another directed edge already exists', () => {
    graph.edges.value = [];
    graph.settings.value.isGraphDirected = true;

    const edge1 = {
      from: graph.nodes.value[0].id,
      to: graph.nodes.value[1].id,
    } as const;
    const addedEdge1 = graph.addEdge(edge1);

    const edge2 = {
      from: graph.nodes.value[0].id,
      to: graph.nodes.value[1].id,
    } as const;
    graph.addEdge(edge2);

    expect(graph.edges.value).toEqual([addedEdge1]);
  });

  test('add undirected edge when another undirected edge already exists', () => {
    graph.edges.value = [];
    graph.settings.value.isGraphDirected = false;

    // standard case
    const edge1 = {
      from: graph.nodes.value[0].id,
      to: graph.nodes.value[1].id,
    } as const;
    const addedEdge1 = graph.addEdge(edge1);

    const edge2 = {
      from: graph.nodes.value[0].id,
      to: graph.nodes.value[1].id,
    } as const;
    graph.addEdge(edge2);

    expect(graph.edges.value).toEqual([addedEdge1]);

    // now we flip the from and to nodes
    const edge3 = {
      from: graph.nodes.value[1].id,
      to: graph.nodes.value[0].id,
    } as const;
    graph.addEdge(edge3);

    expect(graph.edges.value).toEqual([addedEdge1]);
  });
});
