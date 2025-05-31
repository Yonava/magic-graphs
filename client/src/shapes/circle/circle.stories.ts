import type { Meta, StoryObj } from "@storybook/vue3-vite";
import CirclePreview from "./CirclePreview.vue";

const meta: Meta<typeof CirclePreview> = {
  title: 'Shapes/Circle',
  component: CirclePreview,
  args: {
    radius: 50,
    at: { x: 60, y: 60 }
  }
}

export default meta

type Story = StoryObj<typeof CirclePreview>

export const Basic: Story = {};

export const WithTextArea: Story = {
  args: {
    textArea: {
      text: {
        content: 'Hi!',
        color: 'white',
      },
      color: 'blue'
    }
  }
};

export const WithStroke: Story = {
  args: {
    stroke: {
      color: 'blue',
      width: 10,
    }
  }
}