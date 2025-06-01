import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { createDocComponent, DEFAULT_STORIES, DOC_MARKING_DEFAULTS } from '@shape/docs';
import { line, LINE_SCHEMA_DEFAULTS, type LineSchema } from '.';

const Line = createDocComponent<LineSchema>(line)

const meta: Meta<typeof Line> = {
  title: 'Shapes/Line',
  component: Line,
  args: {
    ...LINE_SCHEMA_DEFAULTS,
    start: { x: 30, y: 60 },
    end: { x: 200, y: 60 },
    ...DOC_MARKING_DEFAULTS,
  },
};

export default meta;

type Story = StoryObj<typeof Line>;

const { basic, markings, text } = DEFAULT_STORIES;

export const Basic: Story = basic;
export const Markings: Story = markings;
export const WithText: Story = text;

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
    width: 20,
  }
}

export const ColorGradient: Story = {
  args: {
    gradientStops: [
      {
        color: 'red',
        offset: 0
      },
      {
        color: 'blue',
        offset: 1
      }
    ]
  }
}