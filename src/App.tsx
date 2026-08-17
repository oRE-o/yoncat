import { useCallback, useState } from 'react';

import FloatingDock from './components/FloatingDock';
import GrainOverlay from './components/GrainOverlay';
import HeroPoster from './components/hero/HeroPoster';
import ContactFooter from './components/sections/ContactFooter';
import ExperienceSection from './components/sections/ExperienceSection';
import IntroSection from './components/sections/IntroSection';
import ProjectShowcase from './components/sections/ProjectShowcase';
import { type LanguageCode } from './data/i18n';
import { supportedLanguages } from './data/introData';
import { SECTION_IDS } from './data/sections';
import { useActiveSection } from './hooks/useActiveSection';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState<LanguageCode>('kr');
  const scrollToSection = useSmoothScroll();
  const activeSection = useActiveSection(SECTION_IDS);

  const handleLanguageCycle = useCallback(() => {
    setLanguage((prev) => {
      const idx = supportedLanguages.findIndex((entry) => entry.code === prev);
      return supportedLanguages[(idx + 1) % supportedLanguages.length].code;
    });
  }, []);

  return (
    <>
      <GrainOverlay />
      <main>
        <HeroPoster theme={theme} />
        <IntroSection language={language} theme={theme} onSectionSelect={scrollToSection} />
        <ExperienceSection theme={theme} language={language} />
        <ProjectShowcase theme={theme} language={language} />
        <ContactFooter theme={theme} />
      </main>
      <FloatingDock
        activeSection={activeSection}
        language={language}
        theme={theme}
        onLanguageCycle={handleLanguageCycle}
        onSectionSelect={scrollToSection}
        onThemeToggle={toggleTheme}
      />
    </>
  );
}

export default App;
