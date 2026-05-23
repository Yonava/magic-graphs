import colors from '@magic/utils/colors';

import { TextStyles } from '../types';

export const textDefaults: Omit<TextStyles, 'text'> = {
  textColor: colors.WHITE,
  textSize: 24,
  textFontWeight: 'bold',
};
