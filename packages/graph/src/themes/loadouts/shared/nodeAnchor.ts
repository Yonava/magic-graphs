import { CURSOR } from '../../cursor.ts';
import { nodeShared } from './node.ts';

export const nodeAnchorShared = {
  radius: Math.ceil(Math.sqrt(nodeShared.size) * 2),
  cursor: CURSOR.GRAB,
} as const;

export const nodeAnchorLinkPreviewShared = {
  width: 10,
} as const;
