import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'applyone-theme',
}: ThemeProviderProps) {
  const location = useLocation();
  // Landing page and public marketing pages are strictly light themed across all devices
  const isMarketingPage =
    location.pathname === '/' ||
    location.pathname === '/privacy' ||
    location.pathname === '/terms';

  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    // Marketing & landing pages will always be strictly in light theme mode
    if (isMarketingPage) {
      root.classList.add('light');
      root.style.colorScheme = 'light';
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      setIsDark(false);
      return;
    }

    let activeTheme = theme;
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      activeTheme = systemTheme;
    }

    root.classList.add(activeTheme);
    root.style.colorScheme = activeTheme;
    setIsDark(activeTheme === 'dark');

    // Sync body class for global transitions
    if (activeTheme === 'dark') {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [theme, isMarketingPage]);

  // Listen to system changes if theme is system and not on marketing page
  useEffect(() => {
    if (theme !== 'system' || isMarketingPage) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      const activeTheme = mediaQuery.matches ? 'dark' : 'light';
      root.classList.add(activeTheme);
      root.style.colorScheme = activeTheme;
      setIsDark(activeTheme === 'dark');
      if (activeTheme === 'dark') {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
      } else {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, isMarketingPage]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark: isMarketingPage ? false : isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

