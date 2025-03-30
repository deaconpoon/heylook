# HeyLook

A collaborative tool designed to streamline the QA process and design feedback workflow between designers, developers, and QA teams.

## Features

- **Website Rendering & Interaction**: View and interact with live websites within the application
- **Annotation Tools**: Draw, measure, comment, and capture screenshots
- **Design Comparison**: Side-by-side viewing of Figma designs and live websites
- **Collaboration**: Real-time cursor tracking and visual presence indicators
- **Issue Documentation**: Create, manage, and export identified issues

## Tech Stack

- **Frontend**: Next.js, TypeScript, React 19, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes, Supabase
- **Infrastructure**: Vercel, Supabase

## Development

### Prerequisites

- Node.js 18 or higher
- npm 8 or higher

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## Deployment

### Troubleshooting

If you encounter build issues with PostCSS configuration, ensure that:

1. Only one PostCSS configuration file exists (postcss.config.js)
2. No references to non-existent packages like @tailwindcss/postcss
3. The Next.js configuration properly supports the src/app directory structure

## CI/CD

This project uses GitHub Actions for continuous integration and deployment:

- **CI**: Linting, type-checking, and testing on push/PR to main branch
- **CD**: Automated deployment to Vercel on push to main branch

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Commit with conventional commits: `feat: add new feature`
4. Ensure commits are signed for verification
5. Push to your branch: `git push origin feature/my-feature`
6. Open a Pull Request

## License

MIT
