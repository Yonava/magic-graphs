import {
  DEFAULT_STORIES,
  DOC_MARKING_DEFAULTS,
  createDocComponent,
} from '../../docs';
import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { arrow } from '.';
import { ARROW_SCHEMA_DEFAULTS } from './defaults';
import type { ArrowSchema } from './types';

const Arrow = createDocComponent<ArrowSchema>(arrow);

const meta = {
  title: 'Shapes/Arrow',
  component: Arrow,
  args: {
    ...ARROW_SCHEMA_DEFAULTS,
    start: { x: 30, y: 60 },
    end: { x: 200, y: 60 },
    ...DOC_MARKING_DEFAULTS,
  },
} satisfies Meta<typeof Arrow>;

export default meta;

type Story = StoryObj<typeof meta>;

const { basic, markings, text, colorGradient } = DEFAULT_STORIES;

export const Basic: Story = basic;
export const Markings: Story = markings;
export const WithText: Story = text;
export const ColorGradient: Story = colorGradient;

export const TextOffset: Story = {
  args: {
    textOffsetFromCenter: -50,
    ...text.args,
  },
};

export const Dashed: Story = {
  args: {
    dash: [30, 30],
  },
};

export const Width: Story = {
  args: {
    lineWidth: 20,
  },
};
