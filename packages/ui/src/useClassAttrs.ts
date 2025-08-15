import { computed, useAttrs } from 'vue';

/**
 * extracts the classes of a component assigned by the parent caller
 *
 * @returns {ComputedRef<string[]>} the classes assigned to the component
 * @example
 * ```vue
 * <!-- parent component -->
 * <template>
 *  <div :class="specialClasses"></div>
 * </template>
 *
 * <!-- child components script -->
 * <script setup lang="ts">
 * import { useClassAttrs } from "./useClassAttrs";
 *
 * const classes = useClassAttrs(); // returns specialClasses
 * </script>
 * ```
 */
export const useClassAttrs = () => {
  const { class: classAttr } = useAttrs();

  return computed<string[]>(() => {
    if (!classAttr) return [];
    if (typeof classAttr !== 'string')
      throw new Error('class attribute must be a string');
    return classAttr.split(' ');
  });
};
