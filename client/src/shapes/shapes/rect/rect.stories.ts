import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { createDocComponent, DEFAULT_STORIES, DOC_MARKING_DEFAULTS } from '@shape/docs';
import { rect } from '.';
import type { RectSchema } from './types';
import { RECT_SCHEMA_DEFAULTS } from './defaults';

const Rect = createDocComponent<RectSchema>(rect)

const meta = {
  title: 'Shapes/Rect',
  component: Rect,
  args: {
    ...RECT_SCHEMA_DEFAULTS,
    width: 200,
    height: 100,
    at: { x: 20, y: 20 },
    ...DOC_MARKING_DEFAULTS,
  },
} satisfies Meta<typeof Rect>

export default meta;

type Story = StoryObj<typeof meta>;

const { basic, markings, text, stroke, rotation } = DEFAULT_STORIES;

export const Basic: Story = basic;
export const Markings: Story = markings;
export const WithText: Story = text;
export const WithStroke: Story = stroke;
export const Rotation: Story = rotation;