import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { createDocComponent, DEFAULT_STORIES } from '@shape/docs';
import { cross, CROSS_SCHEMA_DEFAULTS, type CrossSchema } from '.';

const Cross = createDocComponent<CrossSchema>(cross)

const meta: Meta<typeof Cross> = {
  title: 'Shapes/Cross',
  component: Cross,
  args: {
    ...CROSS_SCHEMA_DEFAULTS,
    size: 100,
    at: { x: 60, y: 60 }
  },
};

export default meta;

type Story = StoryObj<typeof Cross>;

const { basic, markings } = DEFAULT_STORIES;

export const Basic: Story = basic;
export const Markings: Story = markings;

export const LineWidth: Story = {
  args: {
    lineWidth: 20,
  }
}