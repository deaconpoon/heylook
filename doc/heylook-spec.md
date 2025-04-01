# HeyLook Technical Specification

## 1. Project Overview

**HeyLook** is a collaborative tool designed to streamline the QA process and design feedback workflow between designers, developers, and QA teams. The application enables users to collaborate on a URL in real-time, providing tools for annotation, comparison with design specifications, and seamless feedback sharing.

### 1.1 Problem Statement

Current QA and design feedback processes are inefficient, requiring manual cross-checking, recording videos, or taking screenshots to communicate visual bugs or design mismatches. These methods often fail to fully capture intent and create friction in the development cycle.

### 1.2 Target Users

- **Primary Users:** QA Testers, UX Designers
- **Secondary Users:** Developers, Product Managers

### 1.3 Project Goals

- Create a frictionless collaboration environment for QA and design feedback
- Reduce the time spent documenting and communicating visual issues
- Improve the accuracy and clarity of visual bug reports
- Enable side-by-side comparison of design files and live implementations
- Foster a more enjoyable and efficient QA process

## 2. MVP Requirements and Features

The initial release of HeyLook will focus on these core capabilities:

### 2.1 Website Rendering & Interaction

- **Proxy-based rendering** of target websites to bypass X-Frame-Options restrictions
- Ability to view and interact with live websites within the application
- Support for basic responsive testing (desktop, tablet, mobile viewports)
- Single-user interaction with the website while others can observe

### 2.2 Annotation Tools

- **Drawing tools:** Arrows, circles, rectangles, free-form drawing
- **Measurement tools:** Pixel distances, element dimensions
- **Comment system:** Sticky notes tied to specific elements
- **Screenshot capture:** Region-specific or full-page
- Annotation color options with default meaning (red = critical, yellow = moderate, blue = minor)

### 2.3 Design Comparison

- Support for loading Figma frames via Figma's embed API
- Side-by-side viewing of design files and live website
- Toggle for overlay comparison
- Basic measurement tools for manual comparison

### 2.4 Collaboration Features

- Session creation and sharing via unique URLs
- Real-time cursor tracking of all participants
- Visual presence indicators showing who's viewing the session
- Basic permission system (creator can interact with website, others observe by default)

### 2.5 Issue Documentation

- Create and manage a list of identified issues
- Categorize issues by severity and type
- One-click sharing to Slack for team communication
- Export options for documentation (PDF, CSV)

## 3. Technical Architecture

### 3.1 Technology Stack

- **Frontend:**

  - Next.js for the React framework
  - TypeScript for type safety
  - Redux Toolkit for state management
  - Tailwind CSS for styling
  - shadcn/ui for UI components

- **Backend:**

  - Next.js API routes for server functionality
  - Supabase for authentication and database

- **Infrastructure:**
  - Vercel for hosting and deployment
  - Supabase for backend services

### 3.2 Core Components

#### 3.2.1 Proxy Rendering Service

- Server-side proxy that fetches and renders target websites
- Modification of response headers to allow embedding
- Injection of data attributes for targetable DOM elements
- Implemented using Next.js API routes

```typescript
// Example proxy endpoint
export default async function handler(req, res) {
  const { url } = req.query;

  try {
    const response = await fetch(url);
    const html = await response.text();

    // Modify HTML to add necessary attributes and scripts
    const modifiedHtml = addTracking(html);

    // Set appropriate headers
    res.setHeader("Content-Type", "text/html");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");

    return res.send(modifiedHtml);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch website" });
  }
}
```

#### 3.2.2 Annotation Layer

- Transparent overlay that sits on top of the rendered website
- Handles drawing, measurement, and comment tools
- Stores positional data relative to the DOM

#### 3.2.3 Collaboration Engine

- WebSocket connection for real-time updates
- Broadcast events for cursor movements, annotations, and comments
- Session management and permissions system

#### 3.2.4 Figma Integration

- Integration with Figma's embed API
- Extraction of design tokens when available
- Framework for future advanced comparison features

### 3.3 Data Flow

```
┌───────────┐     ┌───────────┐     ┌───────────┐
│  Client   │◄───►│  Next.js  │◄───►│ Supabase  │
│  Browser  │     │   Server  │     │  Database │
└───────────┘     └───────────┘     └───────────┘
      ▲                 │
      │                 ▼
      │           ┌───────────┐
      └───────────┤  Target   │
                  │  Website  │
                  └───────────┘
```

## 4. Database Design

### 4.1 Core Tables

#### users

- id (primary key, provided by Supabase Auth)
- email
- display_name
- avatar_url
- created_at
- last_active_at

#### projects

- id (primary key)
- name
- description
- created_by (foreign key to users)
- created_at
- updated_at
- target_url
- figma_file_url (optional)
- is_archived (boolean)

#### sessions

- id (primary key)
- project_id (foreign key to projects)
- started_by (foreign key to users)
- started_at
- ended_at (nullable)
- session_data (JSONB - for configuration settings)

#### annotations

- id (primary key)
- session_id (foreign key to sessions)
- created_by (foreign key to users)
- created_at
- position_data (JSONB - x, y coordinates)
- target_element_selector (CSS selector path)
- annotation_type (enum: 'highlight', 'note', 'drawing', etc.)
- content (JSONB - specific to annotation type)
- resolved (boolean)
- resolved_by (nullable foreign key to users)
- resolved_at (timestamp, nullable)

#### issue_reports

- id (primary key)
- session_id (foreign key to sessions)
- reported_by (foreign key to users)
- created_at
- title
- description
- severity (enum: 'critical', 'major', 'minor')
- status (enum: 'open', 'in-progress', 'resolved')
- associated_annotations (array of annotation IDs)
- metadata (JSONB - for storing things like browser info)

### 4.2 Retention Policy

- Data retained for 90 days by default
- Soft-delete approach for user-deleted content
- Hard-delete of data older than 1 year via scheduled function

## 5. Project Structure

### 5.1 Atomic Design Structure

HeyLook will follow atomic design methodology to ensure components are modular, reusable, and maintainable:

#### 5.1.1 Atoms

Fundamental building blocks that can't be broken down further:

- Buttons
- Inputs
- Icons
- Typography elements
- Color palette tokens

#### 5.1.2 Molecules

Simple groups of UI elements functioning together:

- Form fields (label + input + validation)
- Search bars
- Tool buttons with tooltips
- Comment cards
- Navigation items

#### 5.1.3 Organisms

Complex UI components composed of molecules and atoms:

- Toolbars
- Navigation bars
- Comment threads
- Issue detail panels
- User presence indicators
- Annotation overlays

#### 5.1.4 Templates

Page-level objects that arrange organisms into layouts:

- Project dashboard layout
- Collaboration canvas layout
- Settings page layout
- User administration layout

#### 5.1.5 Pages

Specific instances of templates with real content:

- Home page
- Project page
- Session collaboration page
- User profile page

### 5.2 File Structure

```
src/
├── app/                         # Next.js app router
│   ├── api/                     # API routes
│   │   ├── auth/                # Authentication endpoints
│   │   ├── projects/            # Project management endpoints
│   │   ├── sessions/            # Session management endpoints
│   │   └── proxy/               # Website proxy service
│   ├── (auth)/                  # Authentication pages
│   ├── (dashboard)/             # Dashboard pages
│   ├── (collaboration)/         # Collaboration pages
│   └── layout.tsx               # Root layout
├── lib/                         # Shared utilities
│   ├── supabase/                # Supabase client and utilities
│   ├── figma/                   # Figma API utilities
│   ├── proxy/                   # Proxy service utilities
│   └── utils/                   # General utilities
├── components/                  # Component library (atomic design)
│   ├── ui/                      # UI component library (shadcn)
│   ├── atoms/                   # Atomic components
│   │   ├── Button/
│   │   ├── Input/
│   │   └── ...
│   ├── molecules/               # Molecular components
│   │   ├── CommentCard/
│   │   ├── FormField/
│   │   └── ...
│   ├── organisms/               # Organism components
│   │   ├── Toolbar/
│   │   ├── CommentThread/
│   │   └── ...
│   ├── templates/               # Template components
│   │   ├── DashboardLayout/
│   │   ├── CollaborationLayout/
│   │   └── ...
│   └── providers/               # Context providers
│       ├── SessionProvider/
│       ├── CollaborationProvider/
│       └── ...
├── stories/                     # Storybook stories
│   ├── design-system/           # Design system documentation
│   │   ├── Colors.stories.tsx   # Color palette documentation
│   │   ├── Typography.stories.tsx # Typography system documentation
│   │   └── Components.stories.tsx # UI components documentation
│   └── Introduction.mdx         # Storybook introduction
├── hooks/                       # Custom React hooks
│   ├── useAnnotation.ts
│   ├── useCollaboration.ts
│   └── ...
├── types/                       # TypeScript type definitions
│   ├── annotation.types.ts
│   ├── project.types.ts
│   └── ...
├── store/                       # Redux Toolkit store
│   ├── slices/                  # Redux slices
│   │   ├── annotationSlice.ts
│   │   ├── sessionSlice.ts
│   │   └── ...
│   ├── selectors/               # Redux selectors
│   └── store.ts                 # Store configuration
├── styles/                      # Global styles
│   ├── globals.css              # Global CSS
│   └── themes/                  # Theme variations
└── public/                      # Static assets
    ├── icons/
    ├── images/
    └── ...
```

### 5.2.1 Storybook Configuration

```
.storybook/                      # Storybook configuration
├── main.ts                      # Main Storybook configuration
│   └── storybookOrder           # Custom order for story organization
├── preview.ts                   # Preview configuration for themes and viewport
├── manager.ts                   # Storybook manager UI customization
└── theme.ts                     # Custom Storybook theme
```

The Storybook configuration is set up to organize components according to the atomic design methodology. The `main.ts` file includes a custom `storybookOrder` that ensures stories appear in the sidebar in the correct hierarchical order:

1. Atoms
2. Molecules
3. Organisms
4. Templates
5. Design System documentation

The design system documentation in Storybook serves as the definitive source of truth for the UI components, showing both the implementation and usage guidelines. Each component includes:

- Interactive examples
- PropTypes documentation
- Usage guidelines
- Accessibility considerations
- Code examples

This ensures consistency across the application and provides a living reference for designers and developers.

### 5.3 Component Architecture

Each component will follow a consistent structure:

```
ComponentName/
├── index.ts                    # Re-export for clean imports
├── ComponentName.tsx           # Component implementation
├── ComponentName.test.tsx      # Component tests
├── ComponentName.stories.tsx   # Storybook stories (optional)
└── ComponentName.module.css    # Component-specific styles (if needed)
```

### 5.4 State Management Organization

HeyLook uses Redux Toolkit for centralized state management, providing a predictable and maintainable approach to handling application state. The Redux store is organized by domain:

- **UI State:** Theme, sidebar visibility, active tools, modal states
- **Session State:** Active session, participants, collaboration data, viewport size
- **User State:** Current user, authentication status, user preferences
- **Entities:** Projects, annotations, issues, comments

Each domain is implemented as a separate slice with the following structure:

```typescript
// Example slice structure (uiSlice.ts)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UiState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  activeToolId: string | null;
  modals: Record<string, boolean>;
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: { ... },
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    // Other reducers...
  },
});

// Actions
export const { setTheme, ... } = uiSlice.actions;

// Selectors
export const selectTheme = (state) => state.ui.theme;
```

The Redux store follows these principles:

1. **Clear Separation of Concerns:**

   - State definition via TypeScript interfaces
   - Actions and reducers for state updates
   - Selectors for accessing state
   - Thunks for async operations

2. **Middleware for Side Effects:**

   - Theme changes trigger DOM and localStorage updates
   - Authentication events handle tokens and sessions
   - Real-time updates synchronize with WebSocket events

3. **Normalized State Structure:**

   - Entities stored by ID in lookup objects
   - Relationships maintained through IDs rather than nesting
   - Denormalized views created through selectors

4. **Performance Optimizations:**
   - Memoized selectors for derived data
   - Component-level re-render optimization
   - Selective subscription to state changes

The central Redux provider wraps the application at the root level, making the store available throughout the component tree, while maintaining strong typing with TypeScript for type safety and developer experience.

## 6. User Interface Design

### 6.1 Application Layout

- **Header:** Navigation, project selection, user account
- **Sidebar:** Tool selection, issue list, collaboration panel
- **Main Canvas:** Rendered website with annotation overlay
- **Comparison Panel:** Side or overlay view of Figma designs

### 6.2 Tool Palette

- Drawing tools (pencil, arrow, rectangle, circle)
- Comment tool
- Measurement tool
- Screenshot tool
- Screen size toggle (responsive testing)

### 6.3 Collaboration UI

- User avatars showing current participants
- Colored cursors for each participant
- Activity feed showing recent actions
- Permission controls for session owner

### 6.4 Issue Management UI

- Issue creation form
- Filterable/sortable issue list
- Issue detail view with associated annotations
- Export and share controls

### 6.5 Visual Design System

#### 6.5.1 Design Inspiration and Direction

HeyLook's visual design draws inspiration from modern, vibrant applications like Aimee, with influences from Apple's iOS design language, Airbnb's friendly approachability, and Figma's color palette. The design system emphasizes:

- **Glassmorphism UI** - Translucent, frosted glass-like components with subtle blur effects
- **Vibrant color palette** - Bold, accessible colors with strategic use of gradients
- **Friendly typography** - Clean, readable fonts with personality
- **Playful micro-interactions** - Subtle animations that enhance the experience
- **3D elements and depth** - Strategic use of shadows and floating elements
- **Emoji-centric interface** - Using the 👀 motif throughout the application

#### 6.5.2 Color Palette

**Primary Colors:**

- **Look Blue:** `#3D7AFF` - Main brand color, used for primary actions and brand elements
- **Look Pink:** `#FF5C87` - Accent color for highlights and important elements
- **Look Purple:** `#7B61FF` - Secondary accent for visual interest

**Secondary Colors:**

- **Soft Cream:** `#FFF3E0` - Background color for content areas
- **Neutral Gray:** `#F5F7FA` - Background for UI components
- **Dark Gray:** `#333333` - Text and icons

**Gradients:**

- **Primary Gradient:** Linear from `#3D7AFF` to `#7B61FF`
- **Accent Gradient:** Linear from `#FF5C87` to `#FFAA5C`
- **Background Gradient:** Soft blue sky gradient similar to Aimee app

**Semantic Colors:**

- **Success:** `#4CD964` - For successful actions and positive states
- **Warning:** `#FF9500` - For warnings and attention-needed states
- **Error:** `#FF3B30` - For errors and critical states
- **Info:** `#5AC8FA` - For informational elements

#### 6.5.3 Typography

**Font Families:**

- **Primary Font:** Inter - Clean, modern sans-serif for general UI
- **Display Font:** Montserrat - For headings and larger display text
- **Monospace:** SF Mono - For code and technical elements

**Font Sizes:**

- **Display:** 32px / 2rem - Page titles
- **Heading 1:** 24px / 1.5rem - Section headings
- **Heading 2:** 20px / 1.25rem - Subsection headings
- **Body:** 16px / 1rem - Main text
- **Small:** 14px / 0.875rem - Secondary text
- **Tiny:** 12px / 0.75rem - Labels and annotations

**Font Weights:**

- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

#### 6.5.4 UI Components

**Cards and Panels:**

- Glassmorphism effect with `backdrop-filter: blur(10px)`
- Semi-transparent backgrounds (80-90% opacity)
- Subtle border with 1px stroke
- Border radius: 16px for larger cards, 8px for smaller elements
- Light drop shadow: `0 8px 32px rgba(0, 0, 0, 0.1)`

**Buttons:**

- Primary: Filled with gradient background
- Secondary: Outlined with transparency
- Tertiary: Text-only with hover effect
- All buttons have 8px border radius
- Consistent padding: 12px 24px for standard size
- Subtle hover and press animations

**Input Fields:**

- Consistent with card styling (glassmorphism)
- Clear focus states with brand color highlight
- Floating labels that animate on focus
- Helper text for additional context

**Iconography:**

- Rounded, friendly icon style
- Two weights: regular and bold
- Primary brand icons incorporate the 👀 motif
- Consistent 24px sizing for standard UI
- Custom emoji set for reactions and statuses

#### 6.5.5 Animation Principles

**Micro-interactions:**

- Subtle scale effects on hover (1.02-1.05x)
- Smooth transitions between states (200-300ms)
- Easing functions: ease-in-out for most transitions
- Playful bounce effects for important actions

**Page Transitions:**

- Fade and slight slide for page changes
- Content elements enter with staggered timing
- Card elements have subtle floating animation

**Loading States:**

- Branded loading spinner incorporating the 👀 icon
- Skeleton states for content loading
- Progress indicators for longer operations

#### 6.5.6 Layout Principles

**Grid System:**

- 12-column grid for desktop layouts
- 8px base unit for spacing system
- Responsive breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

**Whitespace:**

- Generous whitespace for content breathing room
- Consistent spacing scale: 8px, 16px, 24px, 32px, 48px, 64px
- Increased spacing around important elements

**Responsive Behavior:**

- Mobile-first approach
- Stacking of elements on smaller screens
- Collapsible panels for complex tools
- Touch-friendly target sizes (minimum 44px)

#### 6.5.7 Accessibility Considerations

- Minimum contrast ratio of 4.5:1 for all text
- Alternative text for all visual elements
- Keyboard navigable interface
- Support for screen readers
- Color not used as the sole means of conveying information

#### 6.5.8 Design System Documentation

HeyLook's design system is documented and showcased through Storybook to provide a comprehensive reference for developers and designers. The documentation is organized into the following sections:

**Colors:**

- Primary color palette with main, dark, and light variants
- Secondary color palette with main, dark, and light variants
- Neutral color scale from white to black
- Semantic colors for feedback and status indications
- Each color is displayed with its name and hex value for easy reference

**Typography:**

- Heading styles (h1-h6) with size, weight, and line height specifications
- Body text variations (large, regular, small) with complete styling details
- Utility text styles (captions, button text, form labels)
- Each typography style includes visual examples and detailed specifications

**Components:**

- Button variants including primary and secondary styles with states (default, hover, disabled)
- Form elements including inputs, selects, textareas, checkboxes, and radio buttons
- Card layouts with various content arrangements
- Alert and notification components with semantic color indicators

The Storybook documentation serves as a living style guide that evolves alongside the application. It ensures consistency in implementation and provides a central reference for the HeyLook design language.

## 7. Authentication and Authorization

### 7.1 User Authentication

- Supabase Auth for user authentication
- Email/password and Google OAuth options
- Persistent sessions for convenience

### 7.2 Permission System

- Project-level permissions (owner, editor, viewer)
- Session-level temporary permissions
- Website interaction permissions (who can click/navigate)

## 8. Integration Requirements

### 8.1 Figma Integration

- Support for Figma file and frame URLs
- Embed Figma designs directly in the comparison view
- Future: deeper integration with Figma's API for component and style extraction

### 8.2 Slack Integration

- Simple webhook integration for sharing issues
- Custom message formatting with issue details and screenshots
- Deep linking back to the HeyLook session

## 9. Error Handling

### 9.1 Website Rendering Errors

- Graceful fallback for sites that block proxying
- Clear error messages with troubleshooting steps
- Alternative screenshot mode for problematic sites

### 9.2 Collaboration Errors

- Offline mode with local saving when connection is lost
- Automatic reconnection and state synchronization
- Conflict resolution for simultaneous edits

### 9.3 General Error Strategy

- Detailed logging for debugging
- User-friendly error messages
- Non-blocking error handling where possible

## 10. Performance Considerations

### 10.1 Rendering Performance

- Optimization of proxy rendering process
- Caching of static assets where appropriate
- Lazy loading of off-screen content

### 10.2 Real-time Performance

- Throttling of high-frequency events (cursor movement)
- Efficient state synchronization
- Optimistic UI updates

## 11. Implementation Timeline

### 11.1 Phase 1: MVP (1 Month)

#### Week 1:

- Set up project structure and core architecture
- Implement basic proxy rendering
- Create user authentication system

#### Week 2:

- Develop annotation layer and basic tools
- Implement session sharing and collaboration foundations
- Create database structure and API endpoints

#### Week 3:

- Build Figma embedding and basic comparison view
- Implement issue tracking system
- Develop UI and styling

#### Week 4:

- Integrate with Slack for sharing
- Implement export functionality
- Testing, bug fixing, and polish

### 11.2 Phase 2: Enhanced Features (Future)

- Basic computer vision comparison between designs and websites
- Improved collaboration features with chat and video
- Enhanced Figma integration with better component mapping

### 11.3 Phase 3: Advanced AI Features (Future)

- Multi-modal AI for automated visual testing
- Machine learning for discrepancy detection
- Self-improving system based on user feedback

## 12. Testing Strategy

### 12.1 Unit Testing

- Test core utility functions and components
- Mock external services for isolated testing
- Achieve 70%+ code coverage for critical paths

### 12.2 Integration Testing

- Test proxy rendering with various websites
- Verify real-time collaboration functionality
- Test Figma embedding and comparison features

### 12.3 User Acceptance Testing

- Internal testing with developers and designers
- Limited beta with friendly QA teams
- Iterative refinement based on feedback

## 13. Deployment Strategy

### 13.1 Development Environment

- Local development setup with mocks for external services
- Shared development environment on Vercel
- Supabase project for development

### 13.2 Production Deployment

- Vercel for hosting the Next.js application
- Production Supabase instance
- Automated CI/CD pipeline for testing and deployment

### 13.3 Monitoring

- Error tracking with Sentry
- Performance monitoring with Vercel Analytics
- User analytics for feature usage

## 14. Future Considerations

- Mobile support for on-the-go reviewing
- Browser extension for enhanced capabilities
- AI-powered suggestion system for fixing common issues
- Integration with additional design tools beyond Figma

## 15. Appendix

### 15.1 Glossary

- **Canvas:** The main area displaying the rendered website
- **Annotation:** Any mark, comment, or measurement added to the canvas
- **Session:** A collaborative instance of a project with one or more participants
- **Issue:** A documented problem or discrepancy between design and implementation

### 15.2 References

- Figma API Documentation: https://www.figma.com/developers/api
- Next.js Documentation: https://nextjs.org/docs
- Supabase Documentation: https://supabase.io/docs
