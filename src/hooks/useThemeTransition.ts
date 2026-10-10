import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const tokens = ['--paper', '--ink', '--blue', '--line', '--soft-line', '--accent-fill', '--on-accent', '--scene', '--nav-surface'];

const clearPalette = (root: HTMLElement) => tokens.forEach(token => root.style.removeProperty(token));

export function useThemeTransition(theme: 'light' | 'dark') {
  const initialized = useRef(false);
  useLayoutEffect(() => () => {
    const root = document.documentElement;
    clearPalette(root);
    delete root.dataset.themeTransitioning;
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const palette = () => {
      const style = getComputedStyle(root);
      return Object.fromEntries(tokens.map(token => [token, style.getPropertyValue(token).trim()]));
    };
    // Capture an interrupted fade before clearing overrides to read the destination.
    const before = palette();
    root.dataset.themeTransitioning = 'true';
    clearPalette(root);
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#202126' : '#eeede7');
    const target = palette();
    if (!initialized.current || tokens.every(token => before[token] === target[token])) {
      initialized.current = true;
      delete root.dataset.themeTransitioning;
      return;
    }
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    // One inherited palette gives every surface exactly the same timing.
    const tween = gsap.fromTo(root, before, {
      ...target,
      duration: reduced ? .2 : .65,
      ease: 'sine.inOut',
      onComplete: () => {
        clearPalette(root);
        delete root.dataset.themeTransitioning;
      },
    });
    // Keep intermediate colors available to the next toggle; unmount cleans them up.
    return () => { tween.kill(); };
  }, [theme]);
}
