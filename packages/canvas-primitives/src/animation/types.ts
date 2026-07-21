import type { EverySchemaPropName, WithId } from '../types/index.ts';
import type { TimelineId } from './timeline/define.ts';

/**
 * the value of a {@link LooseSchema}
 */
export type LooseSchemaValue = any;

/**
 * a looser version of a shape schema (when fully type safe schemas become a nuisance)
 */
export type LooseSchema = WithId<
  Partial<Record<EverySchemaPropName, LooseSchemaValue>>
>;

export type ActiveAnimation = {
  /**
   * links the active animation to the animation definition
   */
  timelineId: TimelineId;
  /**
   * number of times this animation will run before automatically stopping (can be fractional).
   * set to `Infinity` to run animation indefinitely
   */
  runCount: number;

  /**
   * unix timestamp when the animation started
   */
  startedAt: number;

  /**
   * the schema at the point the animation started
   */
  schemaWithDefaults?: LooseSchema;

  /**
   * called the moment this animation naturally exhausts its `runCount`
   * (the same tick {@link GetAnimatedSchema} cleans it up). Not called
   * when the animation is interrupted early via `stop`.
   */
  onComplete?: () => void;

  /**
   * called the moment this animation stops playing for any reason: natural
   * completion (same tick as `onComplete`), an explicit `stop`, or being
   * displaced by `stopAllAnimations`. Use this over `onComplete` for cleanup
   * that must always happen once the animation is no longer active, so it
   * can't be skipped by an interruption.
   */
  onOver?: () => void;
};
