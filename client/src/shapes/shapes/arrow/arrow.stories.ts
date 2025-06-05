import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { createDocComponent, DEFAULT_STORIES, DOC_MARKING_DEFAULTS } from '@shape/docs';
import { arrow, ARROW_SCHEMA_DEFAULTS, type ArrowSchema } from '.';

const Arrow = createDocComponent<ArrowSchema>(arrow)

const meta = {
  title: 'Shapes/Arrow',
  component: Arrow,
  args: {
    ...ARROW_SCHEMA_DEFAULTS,
    start: { x: 30, y: 60 },
    end: { x: 200, y: 60 },
    ...DOC_MARKING_DEFAULTS,
  },
} satisfies Meta<typeof Arrow>

export default meta;

type Story = StoryObj<typeof meta>;

const { basic, markings, text, colorGradient } = DEFAULT_STORIES;

export const Basic: Story = basic;
export const Markings: Story = markings;
export const WithText: Story = text;
export const ColorGradient: Story = colorGradient

export const TextOffset: Story = {
  args: {
    textOffsetFromCenter: -50,
    ...WithText.args,
  }
}

export const Dashed: Story = {
  args: {
    dash: [30, 30]
  }
}

export const Width: Story = {
  args: {
    lineWidth: 20,
  }
}