import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

interface ColorSwatchProps {
  color: string;
  name: string;
  hex: string;
}

// Simple inline color swatch component for documentation purposes
const ColorSwatch = ({ color, name, hex }: ColorSwatchProps) => (
  <div className="flex flex-col mb-6">
    <div
      className="w-full h-24 rounded-md mb-2"
      style={{ backgroundColor: color }}
    />
    <div className="font-medium">{name}</div>
    <div className="text-sm text-gray-600 dark:text-gray-400">{hex}</div>
  </div>
);

const ColorPalette = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Color System</h1>

      <h2 className="text-xl font-semibold mb-4">Primary Colors</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ColorSwatch color="#0066FF" name="Primary" hex="#0066FF" />
        <ColorSwatch color="#004DC2" name="Primary Dark" hex="#004DC2" />
        <ColorSwatch color="#E5F0FF" name="Primary Light" hex="#E5F0FF" />
      </div>

      <h2 className="text-xl font-semibold mb-4">Secondary Colors</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ColorSwatch color="#FF6B00" name="Secondary" hex="#FF6B00" />
        <ColorSwatch color="#CC5500" name="Secondary Dark" hex="#CC5500" />
        <ColorSwatch color="#FFEDE5" name="Secondary Light" hex="#FFEDE5" />
      </div>

      <h2 className="text-xl font-semibold mb-4">Neutrals</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <ColorSwatch color="#1A1A1A" name="Gray 900" hex="#1A1A1A" />
        <ColorSwatch color="#404040" name="Gray 800" hex="#404040" />
        <ColorSwatch color="#737373" name="Gray 600" hex="#737373" />
        <ColorSwatch color="#A3A3A3" name="Gray 400" hex="#A3A3A3" />
        <ColorSwatch color="#D4D4D4" name="Gray 300" hex="#D4D4D4" />
        <ColorSwatch color="#E5E5E5" name="Gray 200" hex="#E5E5E5" />
        <ColorSwatch color="#F5F5F5" name="Gray 100" hex="#F5F5F5" />
        <ColorSwatch color="#FFFFFF" name="White" hex="#FFFFFF" />
      </div>

      <h2 className="text-xl font-semibold mb-4">Feedback Colors</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <ColorSwatch color="#10B981" name="Success" hex="#10B981" />
        <ColorSwatch color="#F59E0B" name="Warning" hex="#F59E0B" />
        <ColorSwatch color="#EF4444" name="Error" hex="#EF4444" />
        <ColorSwatch color="#3B82F6" name="Info" hex="#3B82F6" />
      </div>
    </div>
  );
};

const meta: Meta = {
  title: "Design System/Colors",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

export const Colors: Story = {
  render: () => <ColorPalette />,
};
