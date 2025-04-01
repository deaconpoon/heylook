import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const ComponentSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-12">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="border rounded-lg p-6 bg-white dark:bg-gray-900">
      {children}
    </div>
  </div>
);

const ComponentShowcase = () => {
  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">UI Components</h1>

      <ComponentSection title="Buttons">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-base font-medium mb-4">Primary Variants</h3>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">
                Primary
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium opacity-50"
                disabled
              >
                Disabled
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm">
                Small
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md font-medium">
                Large
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-base font-medium mb-4">Secondary Variants</h3>
            <div className="flex flex-wrap gap-4">
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium">
                Secondary
              </button>
              <button
                className="border border-gray-300 text-gray-400 px-4 py-2 rounded-md font-medium"
                disabled
              >
                Disabled
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium text-sm">
                Small
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-5 py-3 rounded-md font-medium">
                Large
              </button>
            </div>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Form Elements">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="example-input"
              >
                Text Input
              </label>
              <input
                id="example-input"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter some text"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="example-select"
              >
                Select
              </label>
              <select
                id="example-select"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="example-textarea"
              >
                Textarea
              </label>
              <textarea
                id="example-textarea"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Enter multiple lines of text"
              />
            </div>

            <div>
              <div className="flex items-center mb-2">
                <input
                  id="example-checkbox"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="example-checkbox"
                  className="ml-2 block text-sm"
                >
                  Checkbox example
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="example-radio"
                  type="radio"
                  name="radio-group"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="example-radio" className="ml-2 block text-sm">
                  Radio example
                </label>
              </div>
            </div>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Cards">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="h-40 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-4">
              <h3 className="font-medium text-lg mb-2">Card Title</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                This is a basic card with an image, title, text and action
                button.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md">
                Action
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-lg mb-2">Simple Card</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              This is a simpler card layout without an image, useful for
              text-based content.
            </p>
            <div className="flex justify-between">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Learn More
              </button>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Alert & Notifications">
        <div className="space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 dark:bg-blue-900/30 dark:border-blue-400">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-9a1 1 0 11-2 0 1 1 0 012 0zm-1 3a1 1 0 00-1 1v2a1 1 0 002 0v-2a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  This is an informational message. Read it carefully.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 dark:bg-green-900/30 dark:border-green-400">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700 dark:text-green-200">
                  Success! Your changes have been saved successfully.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 dark:bg-red-900/30 dark:border-red-400">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414L11.414 10l1.293 1.293a1 1 0 01-1.414 1.414L10 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L8.586 10 7.293 8.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-200">
                  Error! There was a problem processing your request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ComponentSection>
    </div>
  );
};

const meta: Meta = {
  title: "Design System/Components",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

export const Components: Story = {
  render: () => <ComponentShowcase />,
};
