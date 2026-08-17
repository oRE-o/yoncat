import { useEffect, useState } from 'react';

/** Current viewport width in px, updated on resize. */
export const useViewportWidth = () => {
  const [width, setWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1440,
  );

  useEffect(() => {
    const sync = () => setWidth(window.innerWidth);
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  return width;
};
