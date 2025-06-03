import type { ScribbleSchema } from '@shape/shapes/scribble';

/**
 * a scribble that is on the graph as an annotation
 */
export type Annotation = ScribbleSchema & { id: string };
