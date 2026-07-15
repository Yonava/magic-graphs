import type { ScribbleSchema } from '@canvas/primitives/shapes/scribble/types';

/**
 * a scribble that is on the graph as an annotation
 */
export type Annotation = ScribbleSchema & { id: string };

export type AnnotationMode = 'drawing' | 'erasing' | 'laser';
