import type { Preview } from '@storybook/react'
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#F5F7FA', // neutral-gray in our design system
        },
        {
          name: 'dark',
          value: '#333333', // dark-gray in our design system
        },
      ],
    },
    themes: {
      default: 'light',
      list: [
        { name: 'light', class: '', color: '#F5F7FA' },
        { name: 'dark', class: 'dark', color: '#333333' },
      ],
    },
  },
};

export default preview;