import { debounce } from '@core/utils/debounce';

import { onMounted } from 'vue';

import { Magic } from './useMagicProduct.ts';

const localStorageKey = (id: string) => 'product-data-' + id;

export const useLocalStorageSync = (magic: Magic) => {
  const key = localStorageKey(magic.manifest.id);

  const save = debounce(() => {
    window?.localStorage.setItem(key, JSON.stringify(magic.transit.encode()));
  }, 500);

  const sync = () => {
    const data = window?.localStorage.getItem(key);
    if (!data) return;
    magic.transit.decode(JSON.parse(data));
  };

  onMounted(sync);

  return save;
};
