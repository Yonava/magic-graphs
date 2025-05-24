import type { ScribbleSchema } from '@shape/scribble';

/**
 * a scribble that is on the graph as an annotation
 */
export type Annotation = ScribbleSchema & { id: string };
