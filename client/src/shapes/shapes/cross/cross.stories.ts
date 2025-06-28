import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { createDocComponent, DEFAULT_STORIES, DOC_MARKING_DEFAULTS } from '@shape/docs';
import { cross } from '.';
import type { CrossSchema } from './types';
import { CROSS_SCHEMA_DEFAULTS } from './defaults';

const Cross = createDocComponent<CrossSchema>(cross)

const meta = {
  title: 'Shapes/Cross',
  component: Cross,
  args: {
    ...CROSS_SCHEMA_DEFAULTS,
    size: 100,
    at: { x: 60, y: 60 },
    ...DOC_MARKING_DEFAULTS,
  },
} satisfies Meta<typeof Cross>;

export default meta;

type Story = StoryObj<typeof meta>;

const { basic, markings, rotation, text } = DEFAULT_STORIES;

export const Basic: Story = basic;
export const Markings: Story = markings;
export const WithText: Story = text;
export const Rotation: Story = rotation;

export const LineWidth: Story = {
  args: {
    lineWidth: 20,
  }
}