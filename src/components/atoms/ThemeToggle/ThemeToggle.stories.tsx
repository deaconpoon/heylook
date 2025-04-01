import type { Meta, StoryObj } from "@storybook/react";
import ThemeToggle from "./ThemeToggle";
import ThemeProvider from "../../providers/ThemeProvider";

// Meta data for the component
const meta: Meta<typeof ThemeToggle> = {
  title: "Atoms/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

// Default story
export const Default: Story = {};

// Light theme story
export const LightTheme: Story = {
  parameters: {
    backgrounds: { default: "light" },
  },
};

// Dark theme story
export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
};
