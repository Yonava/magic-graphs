import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import type { TransitionMatrix } from '@magic/graph/useTransitionMatrix';
import {
  Fraction,
  Matrix,
  divide,
  equal,
  fraction,
  identity,
  multiply,
  subtract,
  transpose,
} from 'mathjs';

import { computed } from 'vue';

// TODO add tests!!! rref function is untrusted AI output :(
const rref = (matrix: TransitionMatrix) => {
  const A = matrix.map((row) => row.map((cell) => fraction(cell))); // deep copy
  let lead = 0;
  const rowCount = A.length;
  const colCount = A[0].length;

  for (let r = 0; r < rowCount; r++) {
    if (lead >= colCount) return A;
    let i = r;
    while (equal(A[i][lead], 0)) {
      i++;
      if (i === rowCount) {
        i = r;
        lead++;
        if (lead === colCount) return A;
      }
    }

    // Swap rows
    [A[i], A[r]] = [A[r], A[i]];

    // Normalize row
    const val = A[r][lead];
    for (let j = 0; j < colCount; j++) {
      A[r][j] = divide(A[r][j], val) as Fraction;
    }

    // Eliminate other rows
    for (let i2 = 0; i2 < rowCount; i2++) {
      if (i2 !== r) {
        const val2 = A[i2][lead];
        for (let j = 0; j < colCount; j++) {
          A[i2][j] = subtract(A[i2][j], multiply(val2, A[r][j]) as Fraction);
        }
      }
    }
    lead++;
  }
  return A;
};

const getSteadyStateVector = (transitionMatrix: TransitionMatrix) => {
  if (transitionMatrix.length === 0) return [];

  const identityMatrix = identity(transitionMatrix.length) as Matrix<Fraction>;
  const transposedTransMatrix = transpose(transitionMatrix);

  const subtractedMatrix = subtract(
    transposedTransMatrix,
    identityMatrix,
  ).valueOf() as TransitionMatrix;
  subtractedMatrix[subtractedMatrix.length - 1] = Array(
    subtractedMatrix.length,
  ).fill(fraction(1));

  const b = Array(subtractedMatrix.length - 1)
    .fill(fraction(0))
    .concat([fraction(1)]);

  const augmented: TransitionMatrix = subtractedMatrix.map((row, i) => [
    ...row,
    b[i],
  ]);

  return rref(augmented).map((row) => row.at(-1)!);
};

export const useMarkovSteadyState = (graph: Graph) =>
  computed(() => {
    const matrix = graph.transitionMatrix.value;
    if (matrix.length === 0) return [];
    return getSteadyStateVector(graph.transitionMatrix.value);
  });

export type MarkovSteadyState = ReturnType<typeof useMarkovSteadyState>;
