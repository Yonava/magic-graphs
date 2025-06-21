import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { createDocComponent, DEFAULT_STORIES, DOC_MARKING_DEFAULTS } from '@shape/docs';
import { triangle } from '.';
import type { TriangleSchema } from './types';
import { TRIANGLE_SCHEMA_DEFAULTS } from './defaults';

const Triangle = createDocComponent<TriangleSchema>(triangle)

const meta = {
  title: 'Shapes/Triangle',
  component: Triangle,
  args: {
    ...TRIANGLE_SCHEMA_DEFAULTS,
    pointA: { x: 90, y: 20 },
    pointB: { x: 20, y: 100 },
    pointC: { x: 160, y: 100 },
    ...DOC_MARKING_DEFAULTS,
  },
} satisfies Meta<typeof Triangle>

export default meta;

type Story = StoryObj<typeof meta>;

const { basic, markings, text, stroke, colorGradient } = DEFAULT_STORIES;

export const Basic: Story = basic;
export const Markings: Story = markings;
export const WithText: Story = text;
export const WithStroke: Story = stroke;
export const ColorGradient: Story = colorGradient