import { GEdge } from '../../../types';
import { textDefaults } from './text';

export const edgeShared = {
  ...textDefaults,
  text: ({ label }: GEdge) => label,
  width: 10,
} as const;
