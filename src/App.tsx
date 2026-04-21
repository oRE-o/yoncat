// src/App.tsx
import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import GrainOverlay from './components/GrainOverlay';
import HeroPoster from './components/HeroPoster';
import IntroSection from './components/IntroSection';
import AboutStrip from './components/AboutStrip';
import ProjectShowcase from './components/ProjectShowcase';
import ContactFooter from './components/ContactFooter';
import FloatingDock from './components/FloatingDock';
import { supportedLanguages } from './data/introData';
import { type LanguageCode } from './data/i18n';
import { getThemeScheme, type AppTheme } from './design/themeSchemes';

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS = [
  'intro-section',
  'about-strip',
  'project-showcase',
  'contact-footer',
];

function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [theme, setTheme] = useState<AppTheme>(() => {
    if (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark') {
      return 'dark';
    }
    return 'light';
  });
  const [language, setLanguage] = useState<LanguageCode>('kr');
  const [activeSection, setActiveSection] = useState<string>('intro-section');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

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

  // Track active section for dock highlight
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
      { threshold: [0.25, 0.5, 0.75] }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scheme = getThemeScheme(theme);
    document.body.style.background = scheme.bg;
    document.body.style.color = scheme.text;
    document.documentElement.style.colorScheme = theme;
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const handleSectionSelect = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleLanguageCycle = useCallback(() => {
    setLanguage((prev) => {
      const idx = supportedLanguages.findIndex((entry) => entry.code === prev);
      const next = supportedLanguages[(idx + 1) % supportedLanguages.length];
      return next.code;
    });
  }, []);

  const handleThemeToggle = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <>
      <GrainOverlay />
      <main>
        <HeroPoster theme={theme} />
        <IntroSection
          language={language}
          theme={theme}
          onSectionSelect={handleSectionSelect}
        />
        <AboutStrip theme={theme} language={language} />
        <ProjectShowcase theme={theme} language={language} />
        <ContactFooter theme={theme} language={language} />
      </main>
      <FloatingDock
        activeSection={activeSection}
        language={language}
        theme={theme}
        onLanguageCycle={handleLanguageCycle}
        onSectionSelect={handleSectionSelect}
        onThemeToggle={handleThemeToggle}
      />
    </>
  );
}

export default App;
