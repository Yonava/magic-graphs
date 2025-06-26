import { ref, onUnmounted } from 'vue';
import type { GEdge, GNode, Graph } from '@graph/types';
import { useTheme } from '@graph/themes/useTheme';
import { interpolateColors, EASING_PRESETS } from '@utils/animate';

export const useAnimateColorPulse = (graph: Graph) => {
  const { setTheme, removeAllThemes } = useTheme(graph, 'pulse_animation');

  const pulsingShapes = ref<Set<GEdge['id'] | GNode['id']>>(new Set());
  const animateInterval = ref<NodeJS.Timeout | null>(null);
  const pulseColor = ref('#FFFFFF');

  const easingFunction = EASING_PRESETS['in-out'];
  const pulseDuration = ref(1000);

  const animate = () => {
    const edgeBaseColor = graph.baseTheme.value.edgeColor;
    const nodeBorderBaseColor = graph.baseTheme.value.nodeBorderColor;
    const currentTime = Date.now();
    const elapsed = currentTime % pulseDuration.value;
    const progress = elapsed / pulseDuration.value;
    const easedProgress = easingFunction(
      progress < 0.5 ? progress : 1 - progress,
    ); // oscillate
    const interpolatedEdgeColor = interpolateColors(
      [edgeBaseColor, pulseColor.value],
      easedProgress,
    );
    const interpolatedNodeBorderColor = interpolateColors(
      [nodeBorderBaseColor, pulseColor.value],
      easedProgress,
    );

    const colorEdge = (edge: GEdge) => {
      return pulsingShapes.value.has(edge.id)
        ? interpolatedEdgeColor.toHexString()
        : edgeBaseColor;
    };
    const colorNodeBorder = (node: GNode) => {
      return pulsingShapes.value.has(node.id)
        ? interpolatedNodeBorderColor.toHexString()
        : nodeBorderBaseColor;
    };

    setTheme('edgeColor', colorEdge);
    setTheme('nodeBorderColor', colorNodeBorder);
  };

  const activate = () => {
    animateInterval.value = setInterval(animate, 25);
  };

  const deactivate = () => {
    pulsingShapes.value.clear();
    removeAllThemes();
    if (animateInterval.value !== null) {
      clearInterval(animateInterval.value);
    }
  };

  onUnmounted(() => {
    deactivate();
  });

  activate();

  return {
    activate,
    deactivate,

    pulsingShapes,
    pulseColor,
    pulseDuration,
  };
};
