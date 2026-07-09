/**
 * text explaining why cant the simulation run on the given graph
 */
export type ReasonText = {
  /**
   * a title for the reason
   */
  title: string;
  /**
   * a longer description that will display as a hint or tooltip
   * for the user
   */
  description: string;
};

export type ReasonTextGetter = (...args: any[]) => ReasonText;

/**
 * themes the graph to highlight the reason why the simulation cannot run
 */
export type ReasonThemer = {
  /**
   * activates the theme
   */
  theme: () => void;
  /**
   * deactivates the theme
   */
  untheme: () => void;
};

/**
 * text and themer for the reason why the simulation cannot run
 */
export type Reason = ReasonText & {
  /**
   * a themer for the reason
   */
  themer?: ReasonThemer;
};
