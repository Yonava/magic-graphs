import { TextStyles } from '../../types.ts';

export const textDefaults: Omit<TextStyles, 'text' | 'textColor'> = {
  textSize: 24,
  textFontWeight: 'bold',
};
