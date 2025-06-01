import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { createDocComponent, DEFAULT_STORIES, DOC_MARKING_DEFAULTS } from '@shape/docs';
import { image, IMAGE_SCHEMA_DEFAULTS, type ImageSchema } from '.';

const Image = createDocComponent<ImageSchema>(image)

const meta: Meta<typeof Image> = {
  title: 'Shapes/Image',
  component: Image,
  args: {
    ...IMAGE_SCHEMA_DEFAULTS,
    width: 100,
    height: 100,
    src: '/favicon.ico',
    at: { x: 10, y: 10 },
    ...DOC_MARKING_DEFAULTS,
  },
};

export default meta;

type Story = StoryObj<typeof Image>;

const { basic, markings, text } = DEFAULT_STORIES;

export const Basic: Story = basic;
export const Markings: Story = markings;
export const WithText: Story = text;

export const Rotation: Story = {
  args: {
    rotation: Math.PI * 1.5
  }
}