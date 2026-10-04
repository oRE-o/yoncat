import { useCallback, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives Lenis smooth scrolling through the GSAP ticker and returns a
 * scroll-to-section callback that falls back to native smooth scrolling.
 */
export const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -80, duration: 1.35 },
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
      lenisRef.current = null;
    };
  }, []);

  const scrollToSection = useCallback((id: string, immediate = false) => {
    const el = id ? document.getElementById(id) : null;
    if (id && !el) return;
    if (lenisRef.current) {
      lenisRef.current.resize();
      lenisRef.current.scrollTo(el ?? 0, { offset: el ? -80 : 0, immediate, duration: 1.35 });
    } else {
      if (el) el.scrollIntoView({ behavior: immediate ? 'instant' : 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  return scrollToSection;
};
