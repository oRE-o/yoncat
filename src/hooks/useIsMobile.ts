import { useEffect, useState } from 'react';

const MOBILE_QUERY = '(max-width: 768px)';

/** True below the mobile breakpoint; stays in sync with viewport changes. */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const sync = () => setIsMobile(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener('change', sync);

    return () => mediaQuery.removeEventListener('change', sync);
  }, []);

  return isMobile;
};
