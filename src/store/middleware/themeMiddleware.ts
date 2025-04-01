import { Middleware, AnyAction } from '@reduxjs/toolkit';

// Using a simpler type approach to avoid circular references
 
export const themeMiddleware: Middleware = () => next => (action: AnyAction) => {
  // First, process the action normally
  const result = next(action);

  // Handle theme changes
  if (action.type === 'ui/setTheme') {
    const theme = action.payload;
    
    // Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
    
    // Update document class for Tailwind dark mode
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  return result;
}; 