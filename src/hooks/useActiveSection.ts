import { useEffect, useState } from 'react';

/**
 * Tracks which of the given sections is most visible in the viewport.
 * Pass a stable (module-level) array so the observer isn't rebuilt each render.
 */
export const useActiveSection = (sectionIds: readonly string[]) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.25, 0.5, 0.75] },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
};
