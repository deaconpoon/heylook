export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-8">
      <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
        <h1 className="text-display font-bold text-gradient mb-6">HeyLook</h1>
        <p className="text-body text-center mb-8">
          A collaborative tool designed to streamline the QA process and design
          feedback workflow between designers, developers, and QA teams.
        </p>

        <div className="glass-panel p-6 w-full mb-8">
          <h2 className="text-h2 font-display font-semibold mb-4">
            Design System
          </h2>
          <p className="mb-4">
            The HeyLook design system is implemented with Tailwind CSS and
            documented through Storybook. View our component library, color
            palette, typography, and design guidelines.
          </p>
          <div className="flex justify-center">
            <a
              href="/storybook/"
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore Design System
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="glass-panel p-6">
            <h2 className="text-h2 font-display font-semibold mb-4">
              Features
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Real-time collaboration with multiple users</li>
              <li>Visual annotations and comments</li>
              <li>Compare website with design mockups</li>
              <li>Record and share feedback</li>
              <li>Responsive testing tools</li>
            </ul>
          </div>

          <div className="glass-panel p-6">
            <h2 className="text-h2 font-display font-semibold mb-4">
              Getting Started
            </h2>
            <p className="mb-4">
              Clone the repository, install dependencies, and run the
              development server:
            </p>
            <pre className="bg-dark-gray/10 p-3 rounded-md text-tiny font-mono overflow-auto dark:bg-white/10">
              <code>npm install npm run dev</code>
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
