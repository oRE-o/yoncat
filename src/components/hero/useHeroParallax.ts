import { useEffect, type RefObject } from 'react';

type HeroParallaxRefs = {
  /** The character image — drifts gently with the pointer. */
  charRef: RefObject<HTMLImageElement | null>;
  /** The title block — drifts opposite the pointer for depth. */
  titleBlockRef: RefObject<HTMLDivElement | null>;
  /** Floating decorations; each element carries data-depth / data-center-shift. */
  floatersRef: RefObject<(HTMLDivElement | null)[]>;
};

/**
 * Pointer-follow parallax for the hero poster. Runs a single rAF loop that
 * eases toward the pointer, translating each layer by its depth and blurring
 * decorations by their distance to the pointer (depth-of-field feel).
 * On mobile the pointer input is ignored and only a fixed depth blur applies.
 */
export const useHeroParallax = ({ charRef, titleBlockRef, floatersRef }: HeroParallaxRefs) => {
  useEffect(() => {
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let rafId = 0;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (window.matchMedia('(max-width: 768px)').matches) return;
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;
      target.x = (x - window.innerWidth / 2) / (window.innerWidth / 2);
      target.y = (y - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });

    const tick = () => {
      const isMob = window.matchMedia('(max-width: 768px)').matches;
      mouse.x += (target.x - mouse.x) * 0.08;
      mouse.y += (target.y - mouse.y) * 0.08;

      const mousePX = window.innerWidth / 2 + mouse.x * (window.innerWidth / 2);
      const mousePY = window.innerHeight / 2 + mouse.y * (window.innerHeight / 2);

      if (charRef.current) {
        charRef.current.style.transform = isMob
          ? 'translate(0, 0)'
          : `translate(${mouse.x * 12}px, ${mouse.y * 8}px)`;
      }
      if (titleBlockRef.current) {
        titleBlockRef.current.style.transform = `translate(${mouse.x * -10}px, ${mouse.y * -8}px)`;
      }

      floatersRef.current?.forEach((el) => {
        if (!el) return;
        const depth = parseFloat(el.dataset.depth || '1');
        const centerShift = parseFloat(el.dataset.centerShift || '0');
        const trX = mouse.x * depth * (isMob ? 8 : 25);
        const trY = mouse.y * depth * (isMob ? 5 : 18);

        let blurAmount = 0;
        if (!isMob) {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dist = Math.hypot(mousePX - cx, mousePY - cy);
          blurAmount = Math.max(0, Math.min((dist - 150) / 100, Math.abs(depth) * 2.5 + 4));
        } else {
          blurAmount = Math.abs(depth) * 0.5;
        }

        // Horizontal anchor offset (calc(50% + Npx)) is folded into the transform so
        // parallax translation composes cleanly with the pixel-fixed offset.
        el.style.transform = `translate(calc(-50% + ${centerShift + trX}px), ${trY}px)`;
        el.style.filter = `blur(${blurAmount}px)`;
      });

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      cancelAnimationFrame(rafId);
    };
  }, [charRef, titleBlockRef, floatersRef]);
};
