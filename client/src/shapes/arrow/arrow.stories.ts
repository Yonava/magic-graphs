import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { createDocComponent, DEFAULT_STORIES, DOC_MARKING_DEFAULTS } from '@shape/docs';
import { arrow, ARROW_SCHEMA_DEFAULTS, type ArrowSchema } from '.';

const Arrow = createDocComponent<ArrowSchema>(arrow)

const meta: Meta<typeof Arrow> = {
  title: 'Shapes/Arrow',
  component: Arrow,
  args: {
    ...ARROW_SCHEMA_DEFAULTS,
    ...DOC_MARKING_DEFAULTS,
  },
};

export default meta;

type Story = StoryObj<typeof Arrow>;

const { basic, markings, text } = DEFAULT_STORIES;

export const Basic: Story = basic;
export const Markings: Story = markings;
export const WithText: Story = text;
