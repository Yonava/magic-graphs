import { core } from '@graph/core/index';
import { adjacencyLists } from '@graph/plugins/adjacency-lists/index';
import { characteristics } from '@graph/plugins/characteristics/index';
import { transitionMatrix } from '@graph/plugins/transition-matrix/index';
import { expect, it } from 'vitest';

import { foldPlugins } from './fold-plugins.ts';

const build = () =>
  foldPlugins(
    core({ weighted: true }),
    [adjacencyLists, characteristics, transitionMatrix] as any,
    {},
    () => 'default',
  );

it('transition matrix is populated and tracks structural change', () => {
  const folded = build();
  const matrixOf = (folded.controls as any).transitionMatrix;

  expect(matrixOf()).toEqual([]);

  const a = folded.actions.addNode({});
  const b = folded.actions.addNode({});
  folded.actions.addEdge({ source: a.id, target: b.id });

  const matrix = matrixOf();
  expect(matrix).toHaveLength(2);
  // every cell is a Fraction, including the unconnected ones
  expect(matrix[0][1].valueOf()).toBe(1);
  expect(matrix[0][0].valueOf()).toBe(0);
});

it('characteristics cache between reads and invalidate on structural change', () => {
  const folded = build();
  const { sccs } = (folded.controls as any).characteristics;

  folded.actions.addNode({});
  const first = sccs();
  expect(sccs()).toBe(first);

  folded.actions.addNode({});
  expect(sccs()).not.toBe(first);
});
