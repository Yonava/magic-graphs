import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { createDocComponent, DEFAULT_STORIES, DOC_MARKING_DEFAULTS } from '@shape/docs';
import { rect, RECT_SCHEMA_DEFAULTS, type RectSchema } from '.';

const Rect = createDocComponent<RectSchema>(rect)

const meta: Meta<typeof Rect> = {
  title: 'Shapes/Rect',
  component: Rect,
  args: {
    ...RECT_SCHEMA_DEFAULTS,
    width: 200,
    height: 100,
    at: { x: 20, y: 20 },
    ...DOC_MARKING_DEFAULTS,
  },
};

export default meta;

type Story = StoryObj<typeof Rect>;

const { basic, markings, text, stroke, rotation } = DEFAULT_STORIES;

export const Basic: Story = basic;
export const Markings: Story = markings;
export const WithText: Story = text;
export const WithStroke: Story = stroke;
export const Rotation: Story = rotation;