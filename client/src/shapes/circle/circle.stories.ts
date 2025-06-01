import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { createDocComponent, DEFAULT_STORIES } from '@shape/docs';
import { circle, CIRCLE_SCHEMA_DEFAULTS, type CircleSchema } from '.';

const Circle = createDocComponent<CircleSchema>(circle)

const meta: Meta<typeof Circle> = {
  title: 'Shapes/Circle',
  component: Circle,
  args: {
    ...CIRCLE_SCHEMA_DEFAULTS,
    radius: 50,
    at: { x: 60, y: 60 },
  },
};

export default meta;

type Story = StoryObj<typeof Circle>;

const { basic, markings, text, stroke } = DEFAULT_STORIES;

export const Basic: Story = basic;
export const Markings: Story = markings;
export const WithText: Story = text;
export const WithStroke: Story = stroke;
