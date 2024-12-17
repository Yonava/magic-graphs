import { computed, watch } from "vue";
import type { ComputedRef, Ref } from "vue";
import { multiply, Fraction, matrix } from "mathjs";
import type { TransitionMatrix } from "@graph/useTransitionMatrix";
import type { MarkovChainTrace } from "./runner";

const memo = new Map<number, ReturnType<typeof getStateAfterNSteps>>();

/**
 * performs a matrix multiplication n times to get the state after n steps
 *
 * @param transitionMatrix graph transition matrix
 * @param initialState a vector representing the initial state
 * @param n number of steps to simulate
 * @returns a vector representing the state after n steps
 */
export const getStateAfterNSteps = (
  transitionMatrix: TransitionMatrix<Fraction>,
  initialState: Fraction[],
  n: number
): Fraction[] => {
  if (n < 0) throw new Error("n must be a non-negative integer");
  if (n === 0) return initialState;
  if (memo.has(n)) return memo.get(n)!;

  const vector = matrix(initialState);
  const tMatrix = matrix(transitionMatrix);
  const result = multiply(vector, tMatrix).toArray() as Fraction[];

  return getStateAfterNSteps(transitionMatrix, result, n - 1);
}

/**
 * returns a memoized version of {@link getStateAfterNSteps}
 */
export const useStateAfterNSteps = (
  transitionMatrix: Ref<TransitionMatrix<Fraction>>,
  initialState: Ref<Fraction[]>,
): ComputedRef<MarkovChainTrace> => {
  watch([transitionMatrix, initialState], () => {
    if (memo) memo.clear();
  });
  return computed(() => (n) => getStateAfterNSteps(transitionMatrix.value, initialState.value, n))
}