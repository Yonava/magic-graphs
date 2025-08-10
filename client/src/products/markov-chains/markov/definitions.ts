export default {
  valid:
    'For every state, the sum of the outgoing transition probabilities is 1.',
  periodic:
    'A Markov chain state is periodic if the greatest common divisor of the lengths of all possible return cycles to that state is greater than 1. A chain is periodic if all its states are periodic.',
  absorbing:
    'Contains at least one absorbing state, which is a state that, once entered, cannot be left (its self-transition probability is 1).',
  communicatingClasses:
    'A subset of states such that each state in the subset can be reached from every other state in the subset.',
  steadyState:
    'The probability distribution over states that does not change over time when the chain evolves.',
  irreducible: 'All states belong to a single communicating class',
  ergotic: 'Irreducible and Aperiodic'
} as const;
