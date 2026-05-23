import { TextStyles } from '../../types';

export const textDefaults: Omit<TextStyles, 'text' | 'textColor'> = {
  textSize: 24,
  textFontWeight: 'bold',
};
