import type { StorybookConfig } from "@storybook/experimental-nextjs-vite";

/**
 * The order here determines the order in the sidebar
 */
const storybookOrder = [
  "../src/components/atoms/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  "../src/components/molecules/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  "../src/components/organisms/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  "../src/components/templates/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  "../src/components/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
];

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    ...storybookOrder,
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  "framework": {
    "name": "@storybook/experimental-nextjs-vite",
    "options": {}
  },
  "staticDirs": [
    "../public"
  ],
  "typescript": {
    "reactDocgen": "react-docgen-typescript",
    "reactDocgenTypescriptOptions": {
      "propFilter": {
        "skipPropsWithoutDoc": false,
      }
    }
  }
};
export default config;