import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { createDocComponent, DEFAULT_STORIES, DOC_MARKING_DEFAULTS } from '@shape/docs';
import { scribble, SCRIBBLE_SCHEMA_DEFAULTS, type ScribbleSchema } from '.';

const Scribble = createDocComponent<ScribbleSchema>(scribble)

const meta: Meta<typeof Scribble> = {
  title: 'Shapes/Scribble',
  component: Scribble,
  args: {
    ...SCRIBBLE_SCHEMA_DEFAULTS,
    type: 'draw',
    points: [
      { x: 20, y: 20 },
      { x: 150, y: 60 },
      { x: 20, y: 100 },
      { x: 150, y: 140 },
      { x: 20, y: 180 },
      { x: 150, y: 220 },
    ],
    ...DOC_MARKING_DEFAULTS,
  },
};

export default meta;

type Story = StoryObj<typeof Scribble>;

const { basic, markings } = DEFAULT_STORIES;

export const Basic: Story = basic;
export const Markings: Story = markings;

export const BrushWeight: Story = {
  args: {
    brushWeight: 10,
  }
}