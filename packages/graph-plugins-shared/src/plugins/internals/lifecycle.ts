type PluginLifecycleControls = {
  /** Lifecycle management and runtime status */
  lifecycle: {
    /** Activates the plugin. */
    enable: () => void;
    /** Deactivates the plugin. */
    disable: () => void;
    // TODO implement: https://github.com/Yonava/magic-graphs/issues/702
    /** @returns true if the plugin is currently active */
    // isEnabled: () => boolean;
  };
};

export type WithLifecycle<PluginControls> = PluginControls &
  PluginLifecycleControls;
