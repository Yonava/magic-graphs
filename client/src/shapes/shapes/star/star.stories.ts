import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { createDocComponent, DEFAULT_STORIES, DOC_MARKING_DEFAULTS } from '@shape/docs';
import { STAR_SCHEMA_DEFAULTS } from './defaults';
import type { StarSchema } from './types';
import { star } from '.';

const Star = createDocComponent<StarSchema>(star)

const meta = {
  title: 'Shapes/Star',
  component: Star,
  args: {
    ...STAR_SCHEMA_DEFAULTS,
    innerRadius: 25,
    outerRadius: 50,
    at: { x: 60, y: 60 },
    ...DOC_MARKING_DEFAULTS,
  },
} satisfies Meta<typeof Star>

export default meta;

type Story = StoryObj<typeof meta>;

const { basic, markings, rotation, text } = DEFAULT_STORIES;

export const Basic: Story = basic;
export const Markings: Story = markings;
export const Rotation: Story = rotation;
export const WithText: Story = text;

export const Points: Story = {
  args: {
    points: 9
  }
}