import { useCallback, useEffect, useState } from 'react';

import { getThemeScheme, type AppTheme } from '../design/themeSchemes';

const STORAGE_KEY = 'yoncat-theme';

const readStoredTheme = (): AppTheme | null => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
};

const getInitialTheme = (): AppTheme => {
  if (typeof window === 'undefined') return 'dark';
  // index.html applies the stored (or default dark) theme before first paint;
  // trust that attribute first so React and the pre-paint script agree.
  const preset = document.documentElement.dataset.theme;
  if (preset === 'light' || preset === 'dark') return preset;
  return readStoredTheme() ?? 'dark';
};

/**
 * Site theme state. Dark is the default; an explicit user choice is
 * persisted and wins on the next visit.
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<AppTheme>(getInitialTheme);

  useEffect(() => {
    const scheme = getThemeScheme(theme);
    document.body.style.background = scheme.bg;
    document.body.style.color = scheme.text;
    document.documentElement.style.colorScheme = theme;
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: AppTheme = prev === 'light' ? 'dark' : 'light';
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Storage can be unavailable (private mode); the toggle still works for this visit.
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
};
