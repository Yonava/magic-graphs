import type { Ref } from 'vue';

import { GraphSettings } from '../settings/index.ts';

type BooleanSettingsKeys = {
  [K in keyof GraphSettings]: GraphSettings[K] extends boolean ? K : never;
}[keyof GraphSettings];

/**
 * temporarily disable (set to `false`) boolean graph settings.
 *
 * after a hold is released, the setting returns to its previous state
 * before the hold
 *
 * @param holdId - a unique identifier for each consumer of `usePluginHoldController`
 */
export type PluginHoldController = (holdId: string) => {
  hold: (setting: BooleanSettingsKeys) => void;
  release: (setting: BooleanSettingsKeys) => void;
};

export const usePluginHoldController = (
  settings: Ref<GraphSettings>,
): PluginHoldController => {
  /**
   * maps the setting to the number of holds currently active
   */
  const holdCountMap: Map<BooleanSettingsKeys, number> = new Map();
  /**
   * couples together the hold id with a setting. ensures idempotency
   * when invoking hold on a particular setting
   */
  const holdIdSet: Set<`${string}-${BooleanSettingsKeys}`> = new Set();
  /**
   * maps of the settings before the hold went into effect
   */
  const holdState: Map<BooleanSettingsKeys, boolean> = new Map();

  return (holdId) => {
    const hold = (setting: BooleanSettingsKeys) => {
      const holdAlreadyActive = holdIdSet.has(`${holdId}-${setting}`);
      if (holdAlreadyActive) return;

      const currentHolds = holdCountMap.get(setting) ?? 0;
      if (currentHolds === 0) {
        holdState.set(setting, settings.value[setting]);
        settings.value[setting] = false;
      }

      holdCountMap.set(setting, currentHolds + 1);
      holdIdSet.add(`${holdId}-${setting}`);
    };

    const release = (setting: BooleanSettingsKeys) => {
      if (!holdIdSet.has(`${holdId}-${setting}`)) return;
      const currentHolds = holdCountMap.get(setting) ?? 0;
      if (currentHolds === 0) return;
      if (currentHolds === 1) {
        const value = holdState.get(setting);
        if (value === undefined) throw new Error('holdState not found');
        settings.value[setting] = value;
        holdState.delete(setting);
      }

      holdCountMap.set(setting, currentHolds - 1);
      holdIdSet.delete(`${holdId}-${setting}`);
    };

    return {
      hold,
      release,
    };
  };
};
