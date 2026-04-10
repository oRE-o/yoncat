// src/App.tsx
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import GrainOverlay from './components/GrainOverlay';
import HeroPoster from './components/HeroPoster';

import AboutStrip from './components/AboutStrip';
import ProjectShowcase from './components/ProjectShowcase';
import ContactFooter from './components/ContactFooter';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <>
      <GrainOverlay />
      <main>
        <HeroPoster />

        <AboutStrip />
        <ProjectShowcase />
        <ContactFooter />
      </main>
    </>
  );
}

export default App;
