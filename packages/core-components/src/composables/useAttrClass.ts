import { computed, normalizeClass, useAttrs } from 'vue';

// normalizes the fallthrough `class` attr (string, array, or object) so it can
// be merged into a component's own classes via cn()/twMerge.
export const useAttrClass = () => {
  const attrs = useAttrs();

  return computed(() => normalizeClass(attrs.class));
};
