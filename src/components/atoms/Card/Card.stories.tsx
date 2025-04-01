import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";
import Button from "../Button";

const meta: Meta<typeof Card> = {
  title: "Atoms/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  args: {
    children: (
      <p>This is a basic card with the glassmorphism effect applied to it.</p>
    ),
  },
};

export const WithTitle: Story = {
  args: {
    title: "Card Title",
    children: <p>This card has a title section above the content area.</p>,
  },
};

export const WithFooter: Story = {
  args: {
    title: "Card with Footer",
    children: <p>This card has both a title and a footer section.</p>,
    footer: (
      <div className="flex justify-end">
        <Button variant="secondary" size="sm" className="mr-2">
          Cancel
        </Button>
        <Button variant="primary" size="sm">
          Submit
        </Button>
      </div>
    ),
  },
};

export const LongContent: Story = {
  args: {
    title: "Card with Long Content",
    children: (
      <>
        <p className="mb-4">
          This card contains longer content to demonstrate scrolling behavior.
        </p>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget
          felis eget urna ultricies aliquet. Donec semper justo vel ante
          facilisis, vel tincidunt libero lacinia.
        </p>
        <p className="mb-4">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia Curae; Donec vel eros eget mauris faucibus volutpat.
        </p>
        <p className="mb-4">
          Nullam finibus, nisi vel tincidunt facilisis, mauris magna facilisis
          magna, eget ultricies magna magna eget magna.
        </p>
      </>
    ),
    footer: (
      <div className="flex justify-end">
        <Button variant="primary" size="sm">
          Read More
        </Button>
      </div>
    ),
  },
};
