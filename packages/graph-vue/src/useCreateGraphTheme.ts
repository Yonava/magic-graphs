import { Graph } from '@graph/create-graph/index';

import { Ref, ref, watch } from 'vue';

type CreateGraph<PresetName extends string> = Graph<{
  // we  don't care about plugin-derived theme shape, so plugins is as loose as
  // it must be to accept a theme shape of a graph with any plugin combination
  plugins: any[];
  presetName: PresetName;
}>;

export const useCreateGraphTheme = <PresetName extends string>(
  theme: CreateGraph<PresetName>['theme'],
) => {
  const activePresetName = ref(theme.activePresetName()) as Ref<PresetName>;

  watch(activePresetName, (v) => {
    theme.setActivePreset(v);
  });

  return {
    ...theme,
    activePresetName,
  };
};
