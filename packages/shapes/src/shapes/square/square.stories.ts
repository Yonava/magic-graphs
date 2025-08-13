import {
  DEFAULT_STORIES,
  DOC_MARKING_DEFAULTS,
  createDocComponent,
} from '@shape/docs';
import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { square } from '.';
import { SQUARE_SCHEMA_DEFAULTS } from './defaults';
import type { SquareSchema } from './types';

const Square = createDocComponent<SquareSchema>(square);

const meta = {
  title: 'Shapes/Square',
  component: Square,
  args: {
    ...SQUARE_SCHEMA_DEFAULTS,
    size: 100,
    at: { x: 20, y: 20 },
    ...DOC_MARKING_DEFAULTS,
  },
} satisfies Meta<typeof Square>;

export default meta;

type Story = StoryObj<typeof meta>;

const { basic, markings, text, stroke, rotation } = DEFAULT_STORIES;

export const Basic: Story = basic;
export const Markings: Story = markings;
export const WithText: Story = text;
export const WithStroke: Story = stroke;
export const Rotation: Story = rotation;
