import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ThemeToggle from "./ThemeToggle";
import uiReducer, { Theme } from "@/store/slices/uiSlice";

// Create a mock store for Storybook
const mockStore = configureStore({
  reducer: {
    ui: uiReducer,
    // Add other reducers as needed for the component
    session: (state = {}) => state,
    user: (state = {}) => state,
  },
  preloadedState: {
    ui: {
      theme: "light" as Theme,
      sidebarOpen: true,
      activeToolId: null,
      modals: {},
    },
    // Add other initial states as needed
  },
});

// Meta data for the component
const meta: Meta<typeof ThemeToggle> = {
  title: "Atoms/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <div className="p-4">
          <Story />
        </div>
      </Provider>
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
