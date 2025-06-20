import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { createDocComponent, DEFAULT_STORIES, DOC_MARKING_DEFAULTS } from '@shape/docs';
import { circle } from '.';
import type { CircleSchema } from './types';
import { CIRCLE_SCHEMA_DEFAULTS } from './defaults';

const Circle = createDocComponent<CircleSchema>(circle)

const meta = {
  title: 'Shapes/Circle',
  component: Circle,
  args: {
    ...CIRCLE_SCHEMA_DEFAULTS,
    radius: 50,
    at: { x: 60, y: 60 },
    ...DOC_MARKING_DEFAULTS,
  },
} satisfies Meta<typeof Circle>

export default meta;

type Story = StoryObj<typeof meta>;

const { basic, markings, text, stroke } = DEFAULT_STORIES;

export const Basic: Story = basic;
export const Markings: Story = markings;
export const WithText: Story = text;
export const WithStroke: Story = stroke;
