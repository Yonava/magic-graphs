import { twMerge } from 'tailwind-merge';

export const cn = (...classes: Array<string | undefined | false>) =>
  twMerge(classes.filter(Boolean).join(' '));
