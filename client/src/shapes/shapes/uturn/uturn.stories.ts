import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { createDocComponent, DEFAULT_STORIES, DOC_MARKING_DEFAULTS } from '@shape/docs';
import { uturn, UTURN_SCHEMA_DEFAULTS, type UTurnSchema } from '.';

const UTurn = createDocComponent<UTurnSchema>(uturn)

const meta: Meta<typeof UTurn> = {
  title: 'Shapes/UTurn',
  component: UTurn,
  args: {
    ...UTURN_SCHEMA_DEFAULTS,
    at: { x: 20, y: 60 },
    spacing: 15,
    upDistance: 70,
    downDistance: 70,
    rotation: 0,
    lineWidth: 10,
    ...DOC_MARKING_DEFAULTS,
  },
};

export default meta;

type Story = StoryObj<typeof UTurn>;

const { basic, markings, text, rotation, colorGradient } = DEFAULT_STORIES;

export const Basic: Story = basic;
export const Markings: Story = markings;
export const WithText: Story = text;
export const Rotation: Story = rotation;
export const ColorGradient: Story = colorGradient;

export const Spacing: Story = {
  args: {
    spacing: 10,
  }
}

export const LineWidth: Story = {
  args: {
    lineWidth: 15,
    spacing: 20,
  }
}