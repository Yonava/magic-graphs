import type { Meta, StoryObj } from '@storybook/vue3-vite';
import TestCanvas from './StoryCanvas.vue';

const meta = {
  title: 'Canvas/MagicCanvas',
  component: TestCanvas,
} satisfies Meta<typeof TestCanvas>

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};