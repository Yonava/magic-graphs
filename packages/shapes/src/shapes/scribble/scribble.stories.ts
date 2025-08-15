import {
  DEFAULT_STORIES,
  DOC_MARKING_DEFAULTS,
  createDocComponent,
} from '../../docs';
import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { scribble } from '.';
import { SCRIBBLE_SCHEMA_DEFAULTS } from './defaults';
import type { ScribbleSchema } from './types';

const Scribble = createDocComponent<ScribbleSchema>(scribble);

const meta = {
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
} satisfies Meta<typeof Scribble>;

export default meta;

type Story = StoryObj<typeof meta>;

const { basic, markings, text } = DEFAULT_STORIES;

export const Basic: Story = basic;
export const Markings: Story = markings;
export const WithText: Story = text;

export const BrushWeight: Story = {
  args: {
    brushWeight: 10,
  },
};
