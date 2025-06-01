import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { createDocComponent, DEFAULT_STORIES, DOC_MARKING_DEFAULTS } from '@shape/docs';
import { ellipse, ELLIPSE_SCHEMA_DEFAULTS, type EllipseSchema } from '.';

const Ellipse = createDocComponent<EllipseSchema>(ellipse)

const meta: Meta<typeof Ellipse> = {
  title: 'Shapes/Ellipse',
  component: Ellipse,
  args: {
    ...ELLIPSE_SCHEMA_DEFAULTS,
    radiusX: 50,
    radiusY: 50,
    at: { x: 60, y: 60 },
    ...DOC_MARKING_DEFAULTS,
  },
};

export default meta;

type Story = StoryObj<typeof Ellipse>;

const { basic, markings, text, stroke } = DEFAULT_STORIES;

export const Basic: Story = basic;

export const RadiusX: Story = {
  args: {
    radiusX: 100,
    at: { x: 110, y: 60 },
  }
}

export const RadiusY: Story = {
  args: {
    radiusY: 100,
    at: { x: 60, y: 110 },
  }
}

export const Markings: Story = markings;
export const WithText: Story = text;
export const WithStroke: Story = stroke;
