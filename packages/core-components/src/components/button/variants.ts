export type ButtonVariant = 'solid' | 'outline';

export const buttonVariants: Record<ButtonVariant, string> = {
  solid: 'bg-neutral-900 text-white hover:bg-neutral-700 active:bg-neutral-800 focus-visible:ring-neutral-900',
  outline:
    'border border-neutral-300 bg-transparent text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 focus-visible:ring-neutral-400',
};
