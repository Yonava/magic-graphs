import type { Meta, StoryObj } from '@storybook/vue3-vite';
import StoryCanvas from './StoryCanvas.vue';

const meta = {
  title: 'Canvas/MagicCanvas',
  component: StoryCanvas,
} satisfies Meta<typeof StoryCanvas>

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};