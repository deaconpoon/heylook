import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

interface TypeSpecProps {
  variant: string;
  className: string;
  size: string;
  weight: string;
  lineHeight?: string;
  children: React.ReactNode;
}

const TypeSpec = ({
  variant,
  className,
  size,
  weight,
  lineHeight,
  children,
}: TypeSpecProps) => (
  <div className="mb-8 border-b pb-6">
    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
      <div className="text-sm font-semibold mb-2 md:mb-0">{variant}</div>
      <div className="text-xs text-gray-600 dark:text-gray-400 grid grid-cols-2 gap-x-8 gap-y-1">
        <span>Size: {size}</span>
        <span>Weight: {weight}</span>
        {lineHeight && <span>Line height: {lineHeight}</span>}
      </div>
    </div>
    <div className={className}>{children}</div>
  </div>
);

const TypographyShowcase = () => {
  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Typography System</h1>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Headings</h2>

        <TypeSpec
          variant="h1"
          className="text-4xl font-bold"
          size="36px / 2.25rem"
          weight="700"
          lineHeight="1.2"
        >
          Heading 1
        </TypeSpec>

        <TypeSpec
          variant="h2"
          className="text-3xl font-bold"
          size="30px / 1.875rem"
          weight="700"
          lineHeight="1.2"
        >
          Heading 2
        </TypeSpec>

        <TypeSpec
          variant="h3"
          className="text-2xl font-semibold"
          size="24px / 1.5rem"
          weight="600"
          lineHeight="1.3"
        >
          Heading 3
        </TypeSpec>

        <TypeSpec
          variant="h4"
          className="text-xl font-semibold"
          size="20px / 1.25rem"
          weight="600"
          lineHeight="1.4"
        >
          Heading 4
        </TypeSpec>

        <TypeSpec
          variant="h5"
          className="text-lg font-medium"
          size="18px / 1.125rem"
          weight="500"
          lineHeight="1.4"
        >
          Heading 5
        </TypeSpec>

        <TypeSpec
          variant="h6"
          className="text-base font-medium"
          size="16px / 1rem"
          weight="500"
          lineHeight="1.5"
        >
          Heading 6
        </TypeSpec>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Body Text</h2>

        <TypeSpec
          variant="body-large"
          className="text-lg"
          size="18px / 1.125rem"
          weight="400"
          lineHeight="1.6"
        >
          Body Large. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Ut in viverra nisi. Vivamus sed nisi sodales, condimentum nunc at,
          lobortis mauris.
        </TypeSpec>

        <TypeSpec
          variant="body"
          className="text-base"
          size="16px / 1rem"
          weight="400"
          lineHeight="1.6"
        >
          Body. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in
          viverra nisi. Vivamus sed nisi sodales, condimentum nunc at, lobortis
          mauris. In hac habitasse platea dictumst. Nullam lacinia nulla sit
          amet diam semper dignissim.
        </TypeSpec>

        <TypeSpec
          variant="body-small"
          className="text-sm"
          size="14px / 0.875rem"
          weight="400"
          lineHeight="1.5"
        >
          Body Small. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Ut in viverra nisi. Vivamus sed nisi sodales, condimentum nunc at,
          lobortis mauris.
        </TypeSpec>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Utility</h2>

        <TypeSpec
          variant="caption"
          className="text-xs"
          size="12px / 0.75rem"
          weight="400"
          lineHeight="1.5"
        >
          Caption text used for descriptions and supplementary information
        </TypeSpec>

        <TypeSpec
          variant="button"
          className="text-sm font-medium"
          size="14px / 0.875rem"
          weight="500"
        >
          Button Text
        </TypeSpec>

        <TypeSpec
          variant="label"
          className="text-sm font-medium"
          size="14px / 0.875rem"
          weight="500"
        >
          Form Label
        </TypeSpec>
      </div>
    </div>
  );
};

const meta: Meta = {
  title: "Design System/Typography",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

export const Typography: Story = {
  render: () => <TypographyShowcase />,
};
