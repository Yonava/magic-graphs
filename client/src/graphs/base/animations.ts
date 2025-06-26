import type { DefineTimeline, Timeline } from "@shape/animation/timeline/defineTimeline";

const arrowIn: Timeline<'arrow'> = {
  forShapes: ['arrow'],
  durationMs: 4000,
  easing: {
    lineWidth: 'in-out',
    textArea: 'in-out',
  },
  keyframes: [
    {
      progress: 0,
      properties: {
        end: (_, { start }) => start,
        lineWidth: () => 0,
        textArea: (ta) => ({
          color: ta.color,
          textBlock: {
            fontSize: 3,
            color: 'transparent',
          },
        }),
      },
    },
    {
      progress: 0.5,
      properties: {
        textArea: (ta) => ({
          color: ta.color,
          textBlock: {
            fontSize: 3,
            color: 'transparent',
          },
        }),
      },
    },
    {
      progress: 0.75,
      properties: {
        end: (end) => end,
        lineWidth: (lw) => lw,
      },
    },
  ],
};

export const getGraphAnimations = (defineTimeline: DefineTimeline) => ({
  arrow: {
    edgeAdded: defineTimeline(arrowIn),
  }
})

export type GraphAnimations = ReturnType<typeof getGraphAnimations>