import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const tokens = ['--paper', '--ink', '--blue', '--line', '--soft-line', '--accent-fill', '--on-accent', '--scene', '--nav-surface'];
const regions = '.masthead, .cover, .cover-index, .about-spread, .experience-block, .work-board-row, .project-archive, .project-detail, .contact';

export function useThemeTransition(theme: 'light' | 'dark') {
  const initialized = useRef(false);
  useLayoutEffect(() => {
    const root = document.documentElement;
    const areas = Array.from(document.querySelectorAll<HTMLElement>(regions));
    const palette = (element: HTMLElement) => {
      const style = getComputedStyle(element);
      return Object.fromEntries(tokens.map(token => [token, style.getPropertyValue(token).trim()]));
    };
    const before = [root, ...areas].map(palette);
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#202126' : '#eeede7');
    const target = palette(root);
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    const visible = areas.filter(area => {
      const bounds = area.getBoundingClientRect();
      return bounds.bottom > 0 && bounds.top < window.innerHeight;
    }).sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timeline = gsap.timeline({ defaults: { duration: reduced ? .4 : 1.05, ease: 'sine.inOut' } });
    [root, ...areas].forEach((area, index) => {
      gsap.set(area, before[index]);
      const order = visible.indexOf(area);
      timeline.to(area, { ...target }, area === root ? 0 : order >= 0 ? .1 + order * (reduced ? .06 : .14) : .12);
    });
    const clear = () => [root, ...areas].forEach(area => tokens.forEach(token => area.style.removeProperty(token)));
    timeline.eventCallback('onComplete', clear);
    return () => { timeline.kill(); clear(); };
  }, [theme]);
}
