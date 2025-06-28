import type { DefineTimeline, Timeline } from "@shape/animation/timeline/defineTimeline";
import tinycolor from "tinycolor2";

const arrowEdgeAdded: Timeline<'arrow'> = {
  forShapes: ['arrow'],
  durationMs: 400,
  easing: {
    lineWidth: 'in-out',
    textArea: 'in-out',
  },
  keyframes: [
    {
      progress: 0,
      properties: {
        lineWidth: 0,
        end: (_, { start }) => start,
        textArea: (ta) => ({
          color: tinycolor(ta.color).setAlpha(0).toRgbString(),
          textBlock: {
            color: 'transparent',
          },
        }),
      },
    },
    {
      progress: 0.33,
      properties: {
        textArea: (ta) => ({
          color: tinycolor(ta.color).setAlpha(0).toRgbString(),
          textBlock: {
            color: 'transparent',
          },
        }),
      },
    },
    {
      progress: 0.9,
      properties: {
        end: (end) => end,
        lineWidth: (lw) => lw,
      },
    },
  ],
};

const lineOrUTurnEdgeAdded: Timeline<'line' | 'uturn'> = {
  forShapes: ['line', 'uturn'],
  durationMs: 400,
  easing: {
    lineWidth: 'in-out',
    textArea: 'in-out',
  },
  keyframes: [
    {
      progress: 0,
      properties: {
        lineWidth: 0,
        textArea: (ta) => ({
          color: tinycolor(ta.color).setAlpha(0).toRgbString(),
          textBlock: {
            color: 'transparent',
          },
        }),
      },
    },
  ],
};

const circleNodeAdded: Timeline<'circle'> = {
  forShapes: ['circle'],
  durationMs: 500,
  easing: { radius: 'in-out' },
  keyframes: [
    {
      progress: 0,
      properties: {
        radius: 0,
      }
    }
  ]
}

export const getGraphAnimations = (defineTimeline: DefineTimeline) => ({
  arrow: {
    edgeAdded: defineTimeline(arrowEdgeAdded),
  },
  line: {
    edgeAdded: defineTimeline(lineOrUTurnEdgeAdded),
  },
  uturn: {
    edgeAdded: defineTimeline(lineOrUTurnEdgeAdded),
  },
  circle: {
    nodeAdded: defineTimeline(circleNodeAdded),
  }
})

export type GraphAnimations = ReturnType<typeof getGraphAnimations>