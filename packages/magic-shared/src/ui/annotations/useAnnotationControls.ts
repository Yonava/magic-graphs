import { nullThrows } from '@core/utils/assert';

import { useProvidedMagic } from '../../product/useProvidedGraph.ts';

export const useAnnotationControls = () => {
  const magic = useProvidedMagic();
  return nullThrows(
    magic.ui.annotations,
    'annotation controls not on magic instance!',
  );
};
