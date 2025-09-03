/**
 * props for the ProgressBar component.
 */
export type ProgressBarOptions = {
  /**
   * at the value in the 0th index, the progress bar will be empty.
   * at the 1st index, the progress bar will be full.
   */
  range: [number, number];
  /**
   * the current value of the progress bar.
   * should be within the range specified in the range prop.
   */
  progress: number;
  /**
   * the current value of the secondary progress bar that appears faded on top of the main progress bar
   */
  previewProgress?: number;
  /**
   * the time it takes, in milliseconds, for the progress bar
   * to visually adjust to the new progress value.
   * @default 250
   */
  transitionTimeMs?: number;
  /**
   * a css easing function used to transition the progress bar.
   * @default "ease-in-out"
   */
  transitionEasing?: 'linear' | 'ease-in-out';
  /**
   * the color of the progress bar.
   * @default colors.GRAY_200 // tailwind gray-200
   */
  color?: string;
  /**
   * called when the user clicks on the progress bar to set the progress.
   * @param progress the new progress value.
   */
  onProgressSet?: (progress: number) => void;
  onHover?: (progress: number) => void;
};

export const PROGRESS_DEFAULTS = {
  transitionTimeMs: 250,
  transitionEasing: 'ease-in-out',
} as const;
