import type { ScribbleSchema } from '@canvas/primitives/shapes/scribble/types';

import { ANNOTATION_MODES } from './constants.ts';

/**
 * a scribble that is on the graph as an annotation
 */
export type Annotation = ScribbleSchema & { id: string };

export type AnnotationMode = (typeof ANNOTATION_MODES)[number];
